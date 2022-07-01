/*:ja
 * @plugindesc スクリプトで Top-Level Await を使用可能にします
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @help
 * スクリプト内で await を使用できるようになります。
 * 完了するまでウェイト状態になるので、
 * イベントコマンドで非同期処理を組み込みやすくなります。
 * 歩行ルートの指定でも使用可能です。
 *
 * たとえばこんなふうに書けます。
 *
 * const request = await fetch("./index.html");
 * const data = await request.text();
 * $gameVariables.setValue(1, data.match(/title>(.+)</)[1]);
 *
 * Copyright (c) 2022 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.0.0
 * RPG Maker MZ Version: v1.5.0
 */

(() => {
  /*========== ./main.js ==========*/
  const makeAsyncScript = (script) => `
  this._waitCount = Number.MAX_SAFE_INTEGER;
  (async () => {
    ${script}
  })().then(() => {
    this._waitCount = 0;
  });
`;

  Game_Interpreter.prototype.command355 = function () {
    let script = this.currentCommand().parameters[0] + "\n";
    while (this.nextEventCode() === 655) {
      this._index++;
      script += this.currentCommand().parameters[0] + "\n";
    }
    eval(makeAsyncScript(script));
    return true;
  };

  const processMoveCommand = Game_Character.prototype.processMoveCommand;
  Game_Character.prototype.processMoveCommand = function (command) {
    if (command.code === Game_Character.ROUTE_SCRIPT) {
      eval(makeAsyncScript(command.parameters[0]));
    } else {
      processMoveCommand.apply(this, arguments);
    }
  };
})();
