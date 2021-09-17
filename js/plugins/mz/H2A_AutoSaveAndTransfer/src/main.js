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
