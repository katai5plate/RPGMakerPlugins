/*:
 * @target MZ
 * @plugindesc 低速回線のプレイを遮断
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMZ-Plugins
 * @help
 * ゲーム起動～タイトル画面までの読み込みが指定の時間を越えると、
 * エラーメッセージを表示してゲームを中断します。
 * プラグインコマンドから、
 * 読み込みにかかった時間を変数に代入することもできます。
 *
 * 注意:
 * ブラウザにゲームデータのキャッシュが残っている状態で、
 * ゲームを起動すると、回線の速さに関係なくロード時間が短縮します。
 * そのため、リロードするとエラーが表示されなくなることがあります。
 *
 * 参考:
 * 基本的に 1 秒程度でタイトルまで読み込む事ができれば、
 * 特に大きな問題なく快適にプレイすることができるはずです。
 * 光ファイバー等の高速回線であれば 500 ミリ秒も可能だと思います。
 *
 * Copyright (c) 2020 Had2Apps
 * This software is released under the MIT License.
 *
 * 動作確認済コアバージョン: v1.3.2
 * プラグインバージョン: v3.0.0
 *
 * @param timeout
 * @text タイムアウト
 * @desc 許容する読み込み時間(1秒=1000)
 * @type number
 * @default 5000
 *
 * @param message
 * @text エラー時
 * @desc タイムアウト時間を過ぎたときに表示するエラーメッセージ
 * @type multiline_string
 * @default 快適にプレイしていただくのに必要な
 * 通信速度を下回っています。
 * より高速なインターネット環境でお楽しみください。
 *
 * @command getInitLoadTime
 * @text 初回ロード時間を変数に代入
 * @desc ゲーム開始からタイトル画面までにかかった時間を変数に代入します。代入値は 1秒=1000 です。
 *
 * @arg id
 * @type variable
 * @text 代入する変数
 */

(() => {
  const __DEBUG = false;

  /**
   * ロード開始 -> PIXI 起動 -> タイトル で初めて成功扱い。
   * その間にエラーがあれば失敗。
   * this._timeout がタイトル表示までの時間を上回っていた場合、
   * タイトル遷移時に有効化した成功フラグが立ってなければ失敗扱い
   */
  class ErrorWhenSlowNet {
    constructor(params) {
      /** タイムアウトを迎えたか */
      this._isFailed = false;
      /** タイムアウトする前にタイトルに遷移したか */
      this._isSuccess = false;
      this._timeout = Number(params.timeout);
      this._message = String(params.message);
      this._startDate = null;
      this._initLoadTime = null;
      // プラグインは Main.prototype.run() 後に呼び出される
      this.setWatch();
    }
    /** タイムアウトをセットする */
    setWatch() {
      __DEBUG && console.time("timeout");
      __DEBUG && console.time("init");
      this._startDate = new Date().valueOf();
      setTimeout(this.onTimeover.bind(this), this._timeout);
    }
    /** タイムアウトしたとき */
    onTimeover() {
      __DEBUG && console.log("onTimeover");
      __DEBUG && console.timeEnd("timeout");
      // すでにタイトルに遷移していたら成功
      if (this._isSuccess) return;
      // いずれも該当しなければ失敗
      this.onFailed();
    }
    /** タイトルに遷移したとき */
    onTitle() {
      __DEBUG && console.timeEnd("init");
      this._isSuccess = true;
      this._initLoadTime = new Date().valueOf() - this._startDate;
    }
    getInitLoadTime() {
      return this._initLoadTime;
    }
    /** タイムアウトを迎えたとき */
    onFailed() {
      this._isFailed = true;
      // エラー表示
      Graphics.printError("Network Speed Error", "");
      Graphics._errorPrinter.querySelector("#errorMessage").innerText =
        this._message;
      // シーンの停止
      SceneManager.stop();
      AudioManager.stopAll();
      // スピナーの削除
      const spinner = document.getElementById("loadingSpinner");
      if (spinner) spinner.remove();
    }
  }

  // プラグイン設定
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const { timeout, message } = PluginManager.parameters(pluginName);
  const errorWhenSlowNet = new ErrorWhenSlowNet({ timeout, message });
  PluginManager.registerCommand(pluginName, "getInitLoadTime", ({ id }) => {
    if (id) $gameVariables.setValue(Number(id), errorWhenSlowNet._initLoadTime);
  });

  /** 関数を実行する直前に回線エラーが発生していたなら実行しない */
  const preApply = (apply, that, args) => {
    if (errorWhenSlowNet._isFailed) return;
    return apply(that, args);
  };

  // タイトル画面に遷移したとき
  Scene_Boot = class extends Scene_Boot {
    start(...args) {
      errorWhenSlowNet.onTitle();
      return super.start(...args);
    }
  };

  // 回線エラーがあったら重複して表示されないようにする
  SceneManager = class extends SceneManager {
    initGraphics() {
      return preApply(super.initGraphics, this, arguments);
    }
  };

  Graphics = class extends Graphics {
    // PIXI を開始するまでに回線エラーがあったらゲームを開始しない
    _createPixiApp() {
      return preApply(super._createPixiApp, this, arguments);
    }
    // 回線エラーがあったら通常のスピナー消去を行わないようにする
    endLoading() {
      return preApply(super.endLoading, this, arguments);
    }
  };
})();
