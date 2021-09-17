//-----------------------------------------------------//
/* プラグイン名 */
var PluginName = "H2A_SetSwitchOn";
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
