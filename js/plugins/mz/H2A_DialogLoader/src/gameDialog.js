/// <reference path="../../../_templates/pluginName.js"/>

//: 開発メモ ://
//: source -> midCode -> commandList ://

class Game_Dialog {
  constructor() {
    this.loadingFiles = [];
    this.initialConfig = {
      face: ["", 0],
      name: "",
      background: 0,
      position: 2,
      choicePosition: 2,
      choiceDefault: -1,
      wrapLength: 60,
      _defined: {},
      bgmDefault: { volume: 100, pitch: 100, pan: 0 },
      bgsDefault: { volume: 100, pitch: 100, pan: 0 },
      meDefault: { volume: 100, pitch: 100, pan: 0 },
      seDefault: { volume: 100, pitch: 100, pan: 0 },
    };
    JSON.parse(PluginManager.parameters(pluginName).defaultDefine)
      .map(JSON.parse)
      .forEach(({ name, path }) => {
        this.open(path, (res) => {
          this.config._defined = { ...this.config._defined, [name]: res };
        });
      });
    this.config = this.initialConfig;
  }
  open(path, onLoad) {
    this.loadingFiles.push(path);
    fetch(`/dialogs/${path}.txt`)
      .then((x) => x.text())
      .then((res) => {
        console.log({ res });
        onLoad(res);
        this.loadingFiles = this.loadingFiles.reduce(
          (p, c) => (c === path ? p : [...p, c]),
          []
        );
      });
  }
  load(interpreter, path, resetConfig) {
    console.log(interpreter);
    this.open(path, (res) => {
      interpreter._list = [
        ...(interpreter._list || []).slice(0, interpreter._index + 1),
        ...this.sourceToCommandList(res, resetConfig),
        ...(interpreter._list || []).slice(interpreter._index + 1),
      ];
    });
  }
  /** 未登録のキーを登録できないようにチェック */
  validate(oldState, newState) {
    if (!Object.keys(newState).every((k) => Object.keys(oldState).includes(k)))
      throw new Error("Contains an invalid key: " + JSON.stringify(newState));
  }
  /** CONFIG の変更 */
  setConfig(newState) {
    this.validate(this.config, newState);
    this.config = { ...this.config, ...newState };
  }
  /** 中間コードの要素をコマンドリストに変換 */
  midCodeElementToCommandList(type, param) {
    console.log("midCodeElementToCommandList", { type, param });
    return {
      /** 関数 */
      METHOD: () => {
        let { name, arg } = param;
        return this.methodToCommandList(name, arg);
      },
      /** 文章の表示 */
      MESSAGE: () => {
        /** 文章の表示用ヘッダ */
        const header = {
          code: 101,
          parameters: [
            $gameDialog.config.face[0],
            $gameDialog.config.face[1],
            $gameDialog.config.background,
            $gameDialog.config.position,
            $gameDialog.config.name,
          ],
        };
        if (param.length !== 1) {
          // 複数文字の場合
          const [first, ...rest] = param;
          return [
            header,
            { code: 401, parameters: [first] },
            ...rest.slice(0, 3).map((r) => ({ code: 401, parameters: [r] })),
          ];
        }
        // 1 行の場合
        const [line] = param;
        let cursor = 0;
        let docs = "";
        // 1 文字づつ折返し処理(一時的に改行で分割)
        for (let char of [...line]) {
          if (cursor >= $gameDialog.config.wrapLength) {
            cursor = 0;
            docs += "\n";
          }
          // 全角なら 2 半角なら 1 足す
          cursor += char.match(/^[^\x01-\x7E\xA1-\xDF]+$/) ? 2 : 1;
          docs += char;
        }
        return [
          header,
          ...docs.split("\n").map((r) => ({ code: 401, parameters: [r] })),
        ];
      },
    }[type]();
  }
  /** `#` で始まるメソッド行を処理してコマンドリストに変換 */
  methodToCommandList(name, arg) {
    console.log("methodToCommandList", { name, arg });
    return {
      /** 設定をマージ */
      CONFIG: () => {
        $gameDialog.setConfig(JSON.parse(arg));
        return [];
      },
      /** スクリプトコマンドとして挿入 */
      EXEC: () => [
        {
          code: 355,
          parameters: [arg],
        },
      ],
      /** コマンドとして挿入 */
      INSERT: () => {
        let [code, parameters] = JSON.parse(arg);
        return [
          {
            code,
            parameters,
          },
        ];
      },
      /** マクロを定義 */
      DEF: () => {
        const [, defineName, content] = arg.match(/^(\S+) (.*?)$/);
        $gameDialog.setConfig({
          _defined: {
            ...$gameDialog.config._defined,
            [defineName]: content,
          },
        });
        return [];
      },
      /** マクロを呼ぶ */
      CALL: () => {
        if (!$gameDialog.config._defined[arg])
          throw new Error("Undefined: " + arg);
        return this.sourceToCommandList(
          $gameDialog.config._defined[arg],
          false
        );
      },
      /** ウェイトを挟む */
      WAIT: () => {
        const frame = Number(arg);
        if (Number.isNaN(frame) || !Number.isSafeInteger(frame))
          throw new Error("Invalid value: " + arg + " -> " + frame);
        return [
          {
            code: 230,
            parameters: [Number(arg)],
          },
        ];
      },
      /** コモンイベントを名前指定して呼ぶ */
      COMMON_EVENT: () => {
        const commonEvent = $dataCommonEvents
          .slice(1)
          .find((x) => x.name === arg);
        if (!commonEvent) throw new Error("Undefined CommonEvent name: " + arg);
        return [
          {
            code: 117,
            parameters: [commonEvent.id],
          },
        ];
      },
      /** BGMの再生/停止 */
      BGM: () => [
        arg === "STOP"
          ? {
              code: 355,
              parameters: ["AudioManager.stopBgm()"],
            }
          : {
              code: 241,
              parameters: [
                {
                  ...this.config.bgmDefault,
                  ...JSON.parse(arg),
                },
              ],
            },
      ],
      /** BGSの再生/停止 */
      BGS: () => [
        arg === "STOP"
          ? {
              code: 355,
              parameters: ["AudioManager.stopBgs()"],
            }
          : {
              code: 245,
              parameters: [
                {
                  ...this.config.bgsDefault,
                  ...JSON.parse(arg),
                },
              ],
            },
      ],
      /** MEの再生/停止 */
      ME: () => [
        arg === "STOP"
          ? {
              code: 355,
              parameters: ["AudioManager.stopMe()"],
            }
          : {
              code: 249,
              parameters: [
                {
                  ...this.config.meDefault,
                  ...JSON.parse(arg),
                },
              ],
            },
      ],
      /** SEの再生/停止 */
      SE: () => [
        arg === "STOP"
          ? {
              code: 355,
              parameters: ["AudioManager.stopSe()"],
            }
          : {
              code: 250,
              parameters: [
                {
                  ...this.config.seDefault,
                  ...JSON.parse(arg),
                },
              ],
            },
      ],
      /** ラベルの指定 */
      LABEL: () => [
        {
          code: 118,
          parameters: [arg],
        },
      ],
      /** 指定ラベルに飛ぶ */
      GOTO: () => [
        {
          code: 119,
          parameters: [arg],
        },
      ],
      /** アクターに登録されてるキャラ名と顔グラに設定する */
      ACTOR: () => {
        let actor;
        if (Number.isSafeInteger(Number(arg))) {
          actor = $dataActors.slice(1).find((x) => x.id === Number(arg));
        } else {
          actor = $dataActors.slice(1).find((x) => x.name === arg);
        }
        console.log(Number.isSafeInteger(Number(arg)), { actor, arg });
        $gameDialog.setConfig({
          face: [actor.faceName, actor.faceIndex],
          name: actor.name,
        });
        return [];
      },
      /** JS の返り値と一致するラベルに飛ぶ */
      GOTO_IF: () => [
        {
          code: 355,
          parameters: [`this.command119([${arg}])`],
        },
      ],
    }[name]();
  }
  /**
   * スクリプトファイルを中間コードに変換
   * @returns {
   *   | {type: "METHOD", param: {name: string, arg: string}}
   *   | {type: "MESSAGE", param:string[]}
   * }
   */
  sourceToMidCode(source) {
    return source
      .split("\n")
      .reduce((pMidCode, sourceLine) => {
        const prevMidCode = pMidCode.slice(-1)?.[0];
        // コメント(無視される)
        if (/^---/.test(sourceLine)) return pMidCode;
        // メソッド
        if (/^#/.test(sourceLine)) {
          const [, name, arg] = sourceLine.match(/^# (\S+) (\S.*?)$/) || [];
          return [...pMidCode, { type: "METHOD", param: { name, arg } }];
        }
        // 空行
        if (sourceLine === "") {
          // 2 行以上ある場合は統一
          if (prevMidCode?.type === "EMPTY") return pMidCode;
          return [...pMidCode, { type: "EMPTY" }];
        }
        // それ以外はすべて文章扱い
        if (prevMidCode?.type === "MESSAGE") {
          // 直前が文章だった場合、行を追加
          prevMidCode.param.push(sourceLine);
          return pMidCode;
        }
        return [...pMidCode, { type: "MESSAGE", param: [sourceLine] }];
      }, [])
      .filter((x) => x.type !== "EMPTY");
  }
  /** 中間コードをコマンドリストに変換 */
  midCodeToCommandList(midCode) {
    return midCode.reduce((pCommandList, { type, param }) => {
      return [
        ...pCommandList,
        ...this.midCodeElementToCommandList(type, param),
      ];
    }, []);
  }
  /** ソースコードをコマンドリストに変換 */
  sourceToCommandList(source, resetConfig) {
    if (resetConfig) this.config = this.initialConfig;
    const midCode = this.sourceToMidCode(
      `${PluginManager.parameters(pluginName).beforeEach || ""}\n\n${source}`
    );
    // 中間コードをイベントコマンドに変換
    const list = this.midCodeToCommandList(midCode);
    console.log(
      list.map((x) => `${x.code} ${JSON.stringify(x.parameters)}`).join("\n")
    );
    return list;
  }
}
window.$gameDialog = new Game_Dialog();
