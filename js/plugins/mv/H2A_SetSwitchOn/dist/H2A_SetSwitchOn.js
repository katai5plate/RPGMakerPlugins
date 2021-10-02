/*:ja
 * @plugindesc ゲーム開始時に指定のスイッチをONにし、タイトルをスキップします。
 *
 * @target MV
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param Switch ID
 * @type switch
 * @desc ゲーム開始時にONにするスイッチのID。
 * @default 1
 *
 * @param Skip Title
 * @type boolean
 * @on タイトルスキップ
 * @off なにもしない
 * @desc タイトルをスキップする？
 * @default false
 *
 * @param Load Save
 * @type boolean
 * @on ロードする
 * @off なにもしない
 * @desc タイトルスキップ後、セーブデータをロードする？
 * @default false
 *
 * @param Load Save ID
 * @type number
 * @desc タイトルスキップ後、セーブデータをロードする場合のセーブデータID。
 * @min 1
 * @default 1
 *
 * @help
 * Load Save IDに存在しないセーブデータIDを入力しないこと。
 *
 * また、通常のロード時にスイッチはONになりません。
 *
 * このプラグインはニューゲーム時にスイッチを切り替える時のために作ったプラグインのため、
 * もしタイトルスキップ関連でもっと高機能なプラグインが必要なら、
 * トリアコンタン氏の AutoLoad.js を使ったほうがいいかもしれません。
 *
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v2.0.3
 * RPG Maker MV Version: v1.6.2
 */

var H2APG = H2APG || {};
(function () {
  /*========== ./main.js ==========*/
  //-----------------------------------------------------//
  /* プラグイン名 */
  var PluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  /* 固有オブジェクト名 */
  H2APG.SetSwitchOn = {};
  //-----------------------------------------------------//

  var getParam = function (names, type) {
    for (var i = 0; i < names.length; i++) {
      var n = PluginManager.parameters(PluginName)[names[i]];
      if (n) {
        if (type == "number") return Number(n);
        if (type == "string") return String(n);
        if (type == "boolean") return n == "true" ? true : false;
        return n;
      }
    }
    return null;
  };

  //-----------------------------------------------------//
  /* パラメーター取得 */
  var WakeUpSwitchID = getParam(["Switch ID"], "number");
  var SkipTitleFlug = getParam(["Skip Title"], "boolean");
  var LoadSaveFlug = getParam(["Load Save"], "boolean");
  var LoadSaveID = getParam(["Load Save ID"], "number");
  //-----------------------------------------------------//

  DataManager.setupNewGame = function () {
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(
      $dataSystem.startMapId,
      $dataSystem.startX,
      $dataSystem.startY
    );
    Graphics.frameCount = 0;
    $gameSwitches.setValue(WakeUpSwitchID, true);
  };

  Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
      DataManager.setupBattleTest();
      SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
      DataManager.setupEventTest();
      SceneManager.goto(Scene_Map);
    } else {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      if (SkipTitleFlug) {
        if (LoadSaveFlug) {
          DataManager.loadGame(LoadSaveID);
          Scene_Load.prototype.reloadMapIfUpdated();
          SceneManager.goto(Scene_Map);
          $gameSystem.onAfterLoad();
        } else {
          SceneManager.goto(Scene_Map);
        }
        $gameSwitches.setValue(WakeUpSwitchID, true);
      } else {
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
      }
    }
    this.updateDocumentTitle();
  };
})();
