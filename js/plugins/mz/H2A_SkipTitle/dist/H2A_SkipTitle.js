/*:ja
 * @plugindesc タイトルをスキップします
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param mode
 * @text モード
 * @desc タイトルスキップ時の挙動
 * @type select
 *
 *   @option オートセーブ含む直前のセーブ ＞ ニューゲーム
 *   @value newlast
 *
 *   @option 直前の手動セーブ ＞ オートセーブ ＞ ニューゲーム
 *   @value newmanual
 *
 *   @option オートセーブ ＞ 直前の手動セーブ ＞ ニューゲーム
 *   @value newauto
 *
 *   @option オートセーブ ＞ ニューゲーム
 *   @value newautoonly
 *
 *   @option ニューゲーム
 *   @value new
 *
 *   @option 直前のセーブ
 *   @value last
 *
 *   @option 直前の手動セーブ
 *   @value manual
 *
 *   @option オートセーブ
 *   @value auto
 *
 * @default new
 *
 * @help
 * タイトルをスキップし、
 * ニューゲームかコンティニューします。
 *
 * モード説明:
 *
 * - オートセーブ含む直前のセーブ ＞ ニューゲーム
 * オートセーブ含む全セーブデータのうち最新のものがロードされます。
 * セーブデータが見つからない場合はニューゲームになります。
 *
 * - 直前の手動セーブ ＞ オートセーブ ＞ ニューゲーム
 * 直前にユーザー操作によりセーブしたデータが見つかればそれがロードされます。
 * 見つからない場合、オートセーブがロードされ、
 * それもなければニューゲームになります。
 *
 * - オートセーブ ＞ 直前の手動セーブ ＞ ニューゲーム
 * オートセーブされたデータがあればそれがロードされます。
 * なければ、直前にユーザー操作によりセーブしたデータをロードします。
 * それもなければニューゲームになります
 *
 * - オートセーブ ＞ ニューゲーム
 * オートセーブされたデータがあればそれがロードされます。
 * なければニューゲームになります。
 *
 * - ニューゲーム
 * 単純にニューゲームになります。
 *
 * - 直前のセーブ
 * オートセーブ含む全セーブデータのうち最新のものがロードされます。
 * セーブデータが存在しない場合、エラーになります。
 *
 * - 直前の手動セーブ
 * ユーザー操作によりセーブしたデータが見つかればそれがロードされます。
 * 存在しない場合、エラーになります。
 *
 * - オートセーブ
 * オートセーブされたデータがあればそれがロードされます。
 * 存在しない場合、エラーになります。
 *
 * Copyright (c) 2022 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v2.0.0
 * RPG Maker MZ Version: v1.3.2
 */

(() => {
  /*========== ./main.js ==========*/
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
})();
