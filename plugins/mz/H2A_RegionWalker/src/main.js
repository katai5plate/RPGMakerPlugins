const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const { isStrict, enableRandomWalk, addOneStep } =
  PluginManager.parameters(pluginName);

const isStrictMode = isStrict === "true";
const isRandomWalk = enableRandomWalk === "true";
const isOneStep = addOneStep === "true";

/** 任意のコマンドをねじ込んだ list を取得 */
const getInjectedListCommands = (list, index, commands = []) => {
  return [
    ...list.slice(0, index + 1),
    ...commands.map(({ indent, ...c }) => ({
      indent: list[index].indent + indent,
      ...c,
    })),
    ...list.slice(index + 1),
  ];
};
/** @returns {{dir:number,after:{x:number,y:number}}|null|never} */
const getRegionSearchTarget = ({ regionId, target, oneWay }) => {
  const candidates = [{ y: 1 }, { x: -1 }, { x: 1 }, { y: -1 }]
    .map(({ x, y }, i) => ({
      x: target.x + (x || 0),
      y: target.y + (y || 0),
      d: +"2468"[i], // 正面
      r: +"8642"[i], // 背後
    }))
    .filter(({ d, r }) =>
      oneWay ? d === target.direction : r !== target.direction
    )
    .reduce((p, { x, y, d }) => {
      const id = $gameMap.regionId(x, y);
      if (id === regionId) return [...p, { dir: d, after: { x, y } }];
      return p;
    }, []);
  if (candidates.length === 1) {
    const result = candidates[0];
    if (!$gameMap.isPassable(result.after.x, result.after.y) && isStrictMode)
      console.warn("厳格モード: 移動不可能な道が含まれています。");
    return candidates[0];
  }
  if (candidates.length > 1) {
    if (isRandomWalk)
      return candidates[Math.floor(Math.random() * candidates.length)];
    if (isStrictMode)
      throw new Error("厳格モード: 移動候補が 2 件以上あります。");
    return null;
  }
  return null;
};
const routeCode = (code, ...parameters) => ({
  code,
  parameters,
  index: null,
});

/**
 * @param {boolean} cond
 * @param {() => []} fn
 * @returns {[]}
 */
const addWhen = (cond, fn) => (cond ? fn() : []);
/**
 * @param {boolean} cond
 * @param {() => {before:[],list:[],after:[]}} fn3
 * @returns {[]}
 */
const addAroundThen = (cond, fn3) => {
  const { before, list, after } = fn3();
  return cond ? [...before, ...list, ...after] : list;
};

const mainProcess = function ({
  _noSearch,
  regionId,
  characterId,
  initDirection,
  walkSpeed,
  wait,
  through,
  endSwitch,
  beforeScripts,
  afterScripts,
}) {
  const speed = +walkSpeed;
  const isThrough = through === "true";
  const endSwitchId = +endSwitch;
  const enableScripts = beforeScripts.length > 2 || afterScripts.length > 2;
  const { x, y, _direction } =
    Game_Interpreter.prototype.character(characterId);
  let virtualTarget = {
    x,
    y,
    direction: +initDirection ? +initDirection : _direction,
  };
  const gc = Game_Character;
  const routeList = [
    // 移動完了スイッチ
    ...addAroundThen(endSwitchId, () => ({
      before: [routeCode(gc.ROUTE_SWITCH_OFF, endSwitchId)],
      list: [
        // すり抜け
        ...addAroundThen(isThrough, () => ({
          before: [routeCode(gc.ROUTE_THROUGH_ON)],
          list: [
            // スクリプト
            ...addAroundThen(enableScripts, () => {
              let [before, after] = [[], []];
              try {
                [before, after] = [beforeScripts, afterScripts].map((scripts) =>
                  JSON.parse(scripts === "" ? "[]" : scripts).map((x) => {
                    const [method, ...args] = x.split(" ");
                    const code =
                      gc[/^ROUTE_/.test(method) ? method : `ROUTE_${method}`];
                    if (!code) throw "不正な ROUTE 名";
                    return {
                      code,
                      parameters: args.map((p) => JSON.parse(p)),
                      index: null,
                    };
                  })
                );
              } catch (error) {
                if (isStrictMode)
                  throw new Error(
                    "厳格モード: スクリプト構文エラー -> " + error
                  );
              }
              return {
                before,
                list: [
                  // 移動速度
                  ...addWhen(speed, () => [
                    routeCode(gc.ROUTE_CHANGE_SPEED, speed),
                  ]),
                  // 経路探索
                  ...addWhen(!_noSearch, () => {
                    let loopIndex = 0;
                    const loopMax = 100000;
                    let list = [];
                    for (loopIndex = 0; loopIndex < loopMax; loopIndex++) {
                      const result = getRegionSearchTarget({
                        oneWay: +initDirection ? loopIndex === 0 : undefined,
                        regionId: +regionId,
                        target: virtualTarget,
                      });
                      if (result === null) break;
                      const { dir, after } = result;
                      virtualTarget = {
                        x: after.x,
                        y: after.y,
                        direction: dir,
                      };
                      list = [
                        ...list,
                        routeCode(
                          {
                            2: gc.ROUTE_MOVE_DOWN,
                            4: gc.ROUTE_MOVE_LEFT,
                            6: gc.ROUTE_MOVE_RIGHT,
                            8: gc.ROUTE_MOVE_UP,
                          }[dir]
                        ),
                      ];
                    }
                    if (loopIndex === loopMax)
                      throw new Error(
                        "経路探索数が " + loopMax + "を超えました。"
                      );
                    return list;
                  }),
                  // 一歩前進
                  ...addWhen(isOneStep, () => [
                    routeCode(gc.ROUTE_MOVE_FORWARD),
                  ]),
                ],
                after,
              };
            }),
          ],
          after: [routeCode(gc.ROUTE_THROUGH_OFF)],
        })),
      ],
      after: [routeCode(gc.ROUTE_SWITCH_ON, endSwitchId)],
    })),
    routeCode(0),
  ];
  this._list = getInjectedListCommands(this._list, this._index, [
    {
      code: 205,
      indent: 0,
      parameters: [
        characterId,
        {
          list: routeList,
          repeat: false,
          skippable: false,
          wait: wait === "true",
        },
      ],
    },
  ]);
};
