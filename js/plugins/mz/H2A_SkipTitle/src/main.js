const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const { mode } = PluginManager.parameters(pluginName);

const skipTitle = (mode) => {
  // 戦闘・イベントテスト時は無効
  if (["btest", "etest"].some((x) => Utils.isOptionValid(x))) return;

  const moveToSceneMap = (isContinue = false) => {
    SceneManager.goto(Scene_Map);
    isContinue && $gameSystem.onAfterLoad();
  };
  const noSave = () => !DataManager.isAnySavefileExists();
  const noAutoSave = () => !DataManager.savefileExists(0);
  const noManualSave = () =>
    DataManager._globalInfo.slice(1).filter(Boolean).length === 0;
  const latestSavefileId = (manualPriority) => {
    if (manualPriority) return DataManager.latestSavefileId();
    const { _globalInfo } = DataManager;
    return _globalInfo.findIndex(
      (x) =>
        x &&
        x.timestamp ===
          Math.max(..._globalInfo.filter(Boolean).map((x) => x.timestamp))
    );
  };
  const toNewGame = () => {
    DataManager.setupNewGame();
    moveToSceneMap();
  };
  const toManualSave = () => {
    DataManager.loadGame(latestSavefileId(true)).then(() =>
      moveToSceneMap(true)
    );
  };
  const toAutoSave = () => {
    DataManager.loadGame(0).then(() => moveToSceneMap(true));
  };
  const toLastSave = () => {
    DataManager.loadGame(latestSavefileId()).then(() => moveToSceneMap(true));
  };
  switch (mode) {
    case "newlast":
      if (noSave()) return toNewGame();
      return toLastSave();
    case "newmanual":
      if (noManualSave()) {
        if (noAutoSave()) return toNewGame();
        return toAutoSave();
      }
      return toManualSave();
    case "newauto":
      if (noAutoSave()) {
        if (noManualSave()) return toNewGame();
        return toManualSave();
      }
      return toAutoSave();
    case "newautoonly":
      if (noAutoSave()) return toNewGame();
      return toAutoSave();
    case "new":
      return toNewGame();
    case "last":
      if (noSave()) throw new Error("セーブデータが見つかりません");
      return toLastSave();
    case "manual":
      if (noManualSave()) throw new Error("手動セーブデータが見つかりません");
      return toManualSave();
    case "auto":
      if (noAutoSave()) throw new Error("オートセーブが見つかりません");
      return toAutoSave();
    default:
      throw new Error("無効な設定");
  }
};

Scene_Boot = class extends Scene_Boot {
  start() {
    super.start(arguments);
    skipTitle(mode);
  }
};
