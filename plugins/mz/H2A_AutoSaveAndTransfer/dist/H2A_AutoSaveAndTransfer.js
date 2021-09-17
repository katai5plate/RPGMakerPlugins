/*:
 * @target MZ
 * @plugindesc オートセーブと場所移動の挙動を変更
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMZ-Plugins
 * @help
 * 同一マップ間移動時に、
 * データのロードが発生しないようにします。
 *
 * また、パラメーターで
 * オートセーブに関する挙動を設定できます。
 * その場合、「システム1」のオプションで
 * 「オートセーブを有効化」する必要があります。
 *
 * またプラグインコマンドを使用することで、
 * オートセーブを呼び出すことができます。
 *
 * 注意:
 * 設定の優先度は以下のようになっています。
 * コモンイベントのオートセーブ ＞ 禁止スイッチ ＞ オートセーブ設定
 * 禁止スイッチが ON の状態でもコモンイベントからオートセーブが可能で、
 * 禁止スイッチが ON だとオートセーブ設定が all でもセーブされません。
 *
 * Copyright (c) 2020 Had2Apps
 * This software is released under the MIT License.
 *
 * 動作確認済コアバージョン: v1.3.2
 * プラグインバージョン: v3.0.0
 *
 * @param autoSaveMode
 * @text オートセーブ設定
 * @desc 場所移動時のオートセーブの挙動を設定します。
 * @type select
 * @option いかなる場所移動であっても許可する
 * @value all
 * @option 同一マップ間移動では禁止する
 * @value nosame
 * @option 場所移動でのオートセーブを禁止する
 * @value disable
 * @default all
 *
 * @param enableAutoSaveAfterBattle
 * @text 戦闘終了後のオートセーブ
 * @desc 戦闘終了後のオートセーブを許可するかどうかを設定します。
 * @type boolean
 * @default true
 *
 * @param disableAutoSaveFlag
 * @text オートセーブ禁止スイッチ
 * @desc ON にしている間、オートセーブを禁止するスイッチを設定します。
 * @type switch
 * @default 0
 *
 * @command autosave
 * @text オートセーブ
 * @desc オートセーブを行います。
 *
 */
(() => {
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const { autoSaveMode, enableAutoSaveAfterBattle, disableAutoSaveFlag } =
    PluginManager.parameters(pluginName);

  let prevMapId = 0;

  PluginManager.registerCommand(pluginName, "autosave", () => {
    Scene_Map.prototype.requestAutosave();
  });

  Scene_Map.prototype.create = function () {
    Scene_Message.prototype.create.call(this);
    this._transfer = $gamePlayer.isTransferring();
    this._lastMapWasNull = !$dataMap;
    // 移動前のマップID
    prevMapId = $gameMap.mapId();
    if (this._transfer) {
      // 同一マップ内での移動の場合
      if ($gameMap.mapId() !== $gamePlayer.newMapId()) {
        DataManager.loadMapData($gamePlayer.newMapId());
        this.onTransfer();
      }
    }
    if (!$dataMap || $dataMap.id !== $gameMap.mapId()) {
      DataManager.loadMapData($gameMap.mapId());
    }
  };
  Scene_Map.prototype.start = function () {
    Scene_Message.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._transfer) {
      this.fadeInForTransfer();
      this.onTransferEnd();
    } else if (this.needsFadeIn()) {
      this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
  };

  Scene_Map.prototype.onTransferEnd = function () {
    const isDifferent = $gameMap.mapId() !== prevMapId;
    // 異なるマップへの場所移動
    if (isDifferent) {
      this._mapNameWindow.open();
      $gameMap.autoplay();
    }
    // オートセーブ
    if (this.shouldAutosave()) {
      this.requestAutosave();
    }
  };

  const shouldAutosave = (defaultFlag, mode) => {
    const switchId = Number(disableAutoSaveFlag);
    const flagIsOff = !switchId || !$gameSwitches.value(switchId);
    // デフォルトのオートセーブ判定に加え、無効スイッチがオフ
    if (defaultFlag && flagIsOff) {
      // 場所移動の場合
      if (mode === "transfer") {
        const isSame = $gameMap.mapId() === prevMapId;
        switch (autoSaveMode) {
          case "all":
            return true;
          case "nosame":
            return !isSame;
          case "disable":
            return false;
          default:
            throw new Error("無効なパラメーター: autoSaveMode");
        }
      }
      // 戦闘終了後の場合
      if (mode === "battle") {
        return enableAutoSaveAfterBattle === "true";
      }
      // どれにも当てはまらないモードの場合
      throw new Error("無効なモード");
    }
    return false;
  };

  Scene_Map = class extends Scene_Map {
    shouldAutosave() {
      return shouldAutosave(super.shouldAutosave(...arguments), "transfer");
    }
  };
  Scene_Battle = class extends Scene_Battle {
    shouldAutosave() {
      return shouldAutosave(super.shouldAutosave(...arguments), "battle");
    }
  };
})();
