/*:ja
 * @plugindesc キャラにリージョンを辿って歩かせる
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param isStrict
 * @text 厳格モード
 * @desc エラーによる強制終了と警告を有効にします。
 * @type boolean
 * @default true
 *
 * @param enableRandomWalk
 * @text ランダム歩行
 * @desc 移動経路が 2 方向以上ある場合、ランダムに決定します。
 * @type boolean
 * @default false
 *
 * @param addOneStep
 * @text 到着したら一歩前進
 * @desc 終端に辿り着いたら、一歩前進します。
 * @type boolean
 * @default false
 *
 * @command run
 * @text 実行
 * @desc リージョン ID の道が途切れるまで移動し続けます。
 *
 *   @arg regionId
 *   @text リージョン ID
 *   @desc ルート指定に使用するリージョン ID
 *   @type number
 *   @min 1
 *   @default 1
 *
 *   @arg characterId
 *   @text イベント ID
 *   @desc 移動する マップイベント ID (主人公: -1)
 *   @type number
 *   @min -1
 *   @default -1
 *
 *   @arg initDirection
 *   @text 歩き始める方角
 *   @desc どの方角を正面として歩き始めるかを設定します。
 *   @type select
 *
 *     @option 現在の向き
 *     @value -1
 *
 *     @option 下
 *     @value 2
 *
 *     @option 左
 *     @value 4
 *
 *     @option 右
 *     @value 6
 *
 *     @option 上
 *     @value 8
 *
 *   @default -1
 *
 *   @arg walkSpeed
 *   @text 移動速度
 *   @desc 歩くスピード
 *   @type select
 *
 *     @option 指定しない
 *     @value 0
 *
 *     @option 1: 1/8倍速
 *     @value 1
 *
 *     @option 2: 1/4倍速
 *     @value 2
 *
 *     @option 3: 1/2倍速
 *     @value 3
 *
 *     @option 4: 標準速
 *     @value 4
 *
 *     @option 5: 2倍速
 *     @value 5
 *
 *     @option 6: 4倍速
 *     @value 6
 *
 *   @default 0
 *
 *   @arg wait
 *   @text 完了までウェイト
 *   @desc 終端に辿りつくまでウェイトします。
 *   @type boolean
 *   @default true
 *
 *   @arg through
 *   @text すり抜ける
 *   @desc すり抜けを ON にします
 *   @type boolean
 *   @default false
 *
 *   @arg endSwitch
 *   @text 移動完了スイッチ
 *   @desc スイッチを指定すると、移動が終わったら自動で ON になります。
 *   @type switch
 *   @default 0
 *
 *   @arg beforeScripts
 *   @text スクリプト(初動)
 *   @desc (上級者向け機能) 任意の移動スクリプトを実行ルートの始めに追加します
 *   @type string[]
 *   @default []
 *
 *   @arg afterScripts
 *   @text スクリプト(末尾)
 *   @desc (上級者向け機能) 任意の移動スクリプトを実行ルートの末尾に追加します
 *   @type string[]
 *   @default []
 *
 * @command script
 * @text 移動スクリプト
 * @desc (上級者向け機能) 移動スクリプトを入力します。
 *
 *   @arg characterId
 *   @text イベント ID
 *   @desc 移動する マップイベント ID (主人公: -1)
 *   @type number
 *   @min -1
 *   @default -1
 *
 *   @arg walkSpeed
 *   @text 移動速度
 *   @desc 歩くスピード
 *   @type select
 *
 *     @option 指定しない
 *     @value 0
 *
 *     @option 1: 1/8倍速
 *     @value 1
 *
 *     @option 2: 1/4倍速
 *     @value 2
 *
 *     @option 3: 1/2倍速
 *     @value 3
 *
 *     @option 4: 標準速
 *     @value 4
 *
 *     @option 5: 2倍速
 *     @value 5
 *
 *     @option 6: 4倍速
 *     @value 6
 *
 *   @default 0
 *
 *   @arg wait
 *   @text 完了までウェイト
 *   @desc 終端に辿りつくまでウェイトします。
 *   @type boolean
 *   @default true
 *
 *   @arg through
 *   @text すり抜ける
 *   @desc すり抜けを ON にします
 *   @type boolean
 *   @default false
 *
 *   @arg endSwitch
 *   @text 移動完了スイッチ
 *   @desc スイッチを指定すると、移動が終わったら自動で ON になります。
 *   @type switch
 *   @default 0
 *
 *   @arg scripts
 *   @text スクリプト
 *   @desc 任意の移動スクリプト
 *   @type string[]
 *   @default []
 *
 * @command wait
 * @text 移動完了まで待つ
 * @desc スイッチが ON になるまでウェイトします。
 *
 *   @arg endSwitch
 *   @text 移動完了スイッチ
 *   @desc 「実行」で指定したスイッチ
 *   @type switch
 *   @default 1
 *
 * @help
 * キャラクターがリージョンに沿って移動します。
 * 真後ろには移動せず、前方から見て前・左・右にのみ動きます。
 *
 * ・「厳格モード」では、通行を妨げるタイルがあったり、
 * 　ランダム歩行が無効なのに一本道ではない場合に、
 * 　コンソールに警告を出したり、エラーでゲームを強制終了します。
 * ・「ランダム歩行」では、一本道でない道に来た時、
 * 　ランダムで方角を決定します。
 * ・通常、行き止まりに到達して立ち止まった時は、
 * 　終端のリージョンを踏んでいる状態になります。
 * 　そのため、到達時にリージョンの外まで歩かせたい場合は
 * 　「到着したら一歩前進」を有効化してください。
 * ・プラグインコマンドの「スクリプト」は、上級者向け機能です。
 *   `ROUTE_MOVE_DOWN` `ROUTE_WAIT 60`
 *   `ROUTE_CHANGE_IMAGE "Actor1" 3`
 *   `ROUTE_PLAY_SE {"name":"Dog","pan":0,"pitch":100,"volume":90}`
 *   のように記述します。 (ROUTE_? arg1 arg2)
 *   ROUTE_ で始まる文は、rmmz_objects.js の
 *   processMoveCommand の定義を参照してください。
 *   ROUTE_ は省略しても構いません。 例: `WAIT 60`
 *   スペースで区切り、2 塊目からは JSON で値が評価されます。
 *   ROUTE_PLAY_SE のように JSON を引数に渡す場合はスペースを省いてください。
 *
 * [注意]
 * ・「移動完了まで待つ」場合、
 * 　経路の途中に通行を妨げるキャライベント等があると、
 * 　そのままゲームが先に進まなくなる可能性があります。
 *
 * Copyright (c) 2022 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.3.3
 * RPG Maker MZ Version: v1.1.1
 */

(() => {
  /*========== ./main.js ==========*/
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
                  [before, after] = [beforeScripts, afterScripts].map(
                    (scripts) =>
                      JSON.parse(scripts === "" ? "[]" : scripts).map((x) => {
                        const [method, ...args] = x.split(" ");
                        const code =
                          gc[
                            /^ROUTE_/.test(method) ? method : `ROUTE_${method}`
                          ];
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

  /*========== ./commands.js ==========*/

  PluginManager.registerCommand(pluginName, "run", mainProcess);

  PluginManager.registerCommand(
    pluginName,
    "script",
    function ({
      scripts,
      // rest
      characterId,
      walkSpeed,
      wait,
      through,
      endSwitch,
    }) {
      mainProcess.apply(this, [
        {
          beforeScripts: scripts,
          characterId,
          walkSpeed,
          wait,
          through,
          endSwitch,
          _noSearch: true,
          isOneStep: false,
          afterScripts: "",
        },
      ]);
    }
  );

  PluginManager.registerCommand(pluginName, "wait", function ({ endSwitch }) {
    const endSwitchId = +endSwitch;
    this._list = getInjectedListCommands(this._list, this._index, [
      { code: 112, indent: 0, parameters: [] },
      { code: 111, indent: 1, parameters: [0, endSwitchId, 0] },
      { code: 113, indent: 2, parameters: [] },
      { code: 0, indent: 2, parameters: [] },
      { code: 412, indent: 1, parameters: [] },
      { code: 230, indent: 1, parameters: [1] },
      { code: 0, indent: 1, parameters: [] },
      { code: 413, indent: 0, parameters: [] },
    ]);
  });
})();
