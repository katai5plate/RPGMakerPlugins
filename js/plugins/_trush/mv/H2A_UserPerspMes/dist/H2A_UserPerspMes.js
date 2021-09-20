/*:
 * @plugindesc メッセージウィンドウの操作や文章表示を改善します。
 *
 * @target MV
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param OPERABILITY
 *
 * @param Fast Type
 * @parent OPERABILITY
 * @type select
 *
 *   @option 通常通り
 *   @value 0
 *
 *   @option トリガー入力でページ送り
 *   @value 1
 *
 *   @option 瞬間表示無効
 *   @value 2
 *
 *   @option 瞬間表示無効・トリガー入力でページ送り
 *   @value 3
 *
 * @desc メッセージウィンドウの文章の瞬間表示・ページ送りの挙動。
 * @default 0
 *
 * @param Fast Type Value ID
 * @parent OPERABILITY
 * @type variable
 * @desc ここで指定した変数IDに設定番号を代入すると反映されます。
 * @default 0
 *
 * @param Pause Speed
 * @parent OPERABILITY
 * @type number
 * @desc ページの文章を表示し切ってから操作を受け付けるまでの時間。
 * @min 0
 * @default 10
 *
 * @param Fast Key
 * @parent OPERABILITY
 * @type select
 *
 *   @option なし
 *   @value null
 *
 *   @option 決定
 *   @value ok
 *
 *   @option キャンセル
 *   @value cancel
 *
 *   @option シフト
 *   @value shift
 *
 *   @option 下
 *   @value down
 *
 *   @option 左
 *   @value left
 *
 *   @option 右
 *   @value right
 *
 *   @option 上
 *   @value up
 *
 *   @option PageUp
 *   @value pageup
 *
 *   @option PageDown
 *   @value pagedown
 *
 *   @option コントロール
 *   @value control
 *
 *   @option タブ
 *   @value tab
 *
 * @desc 自動ページ送りを設定したキーを押しっぱなしで出来るようにします。
 * @default null
 *
 * @param MESSAGE DECORATOR
 *
 * @param Enable Mes Decorator
 * @parent MESSAGE DECORATOR
 * @type boolean
 * @on 有効にする
 * @off 無効にする
 * @desc メッセージデコレーター機能
 * @default false
 *
 * @param MD Editor
 * @parent MESSAGE DECORATOR
 * @type string[]
 * @desc 各行に任意の文字を入れる。8つまで。変更しないなら「null」
 * （1行目の頭,後, 2行目の頭,後, 3行目の頭,後, 4行目の頭,後）
 * @default ["\\c[6]＊","\\c[0]","...","null","...","null","\\c[23]\\{>>\\|","_","（------↑↑↑ここまで↑↑↑------）","空欄にしたい場合は null と書こう"]
 *
 * @help
 * 主にメッセージウィンドウの読み易さを改善するプラグインです。
 *
 * ----------------------------------------------------------------
 * ■ OPERABILITY
 * 主に読み飛ばし防止のための操作性改善を行います。
 * 通常の「文章の表示」コマンドを対象としています。
 *
 * ・Fast Type
 * メッセージウィンドウの連打や長押しによる早送りの挙動を変更します。
 *
 * 通常通り
 * 　→デフォルトです。
 * トリガー入力でページ送り
 * 　→キーを押しっぱなしで次のページに飛ばないようにします。
 * 瞬間表示無効
 * 　→文章を表示し切る前にキーを押しても一気に表示されないようにします。
 * 瞬間表示無効・トリガーでページ送り
 * 　→1と2を同時に設定します。一番読み飛ばしの心配がない設定です。
 *
 * ・Fast Type Value ID
 * 途中でFast Typeを変更したい場合は、
 * ここで変数を設定して、設定番号を代入してください。
 * （注意：これを設定すると、「Fast Type」は機能しなくなります。）
 *
 * 0：通常通り
 * 1：トリガー入力でページ送り
 * 2：瞬間表示無効
 * 3：瞬間表示無効・トリガーでページ送り
 *
 * ・Pause Speed
 * 文章が完全に表示し終わった際に、
 * 次のページを見たり、閉じるなどの操作を受け付けるまでの時間を指定します。
 *
 * ・Fast Key
 * 他のキー操作によって通常の早送りができるようにします。
 * （テキスト欄にリスト外の使用可能なキーコードを入力して使うこともできます。）
 *
 * ----------------------------------------------------------------
 * ■ MESSAGE DECORATOR
 * 各行の先頭と最後に、任意の文字列を入れることができます。
 * 例えば必ず最初の行にキャラクター名を書く場合などに便利です。
 *
 * ・Enable Mes Decorator
 * 有効にするとこの機能を使う事が出来ます。
 *
 * ・MD Editor
 * 各行の先頭と最後に、どんな文字列を入れるかを設定します。特殊文字も使用できます。
 * 1： 1 行目の 先頭
 * 2： 1 行目の 最後
 * 3： 2 行目の 先頭
 * 4： 2 行目の 最後
 * 5： 3 行目の 先頭
 * 6： 3 行目の 最後
 * 7： 4 行目の 先頭
 * 8： 5 行目の 最後
 * 「null」とだけ書くことで、空欄として設定することができます。
 * 要素数が8個以下の場合、他の部分は空欄として処理されます。
 * 9以降の要素は使われませんので、メモなどに活用するのもOKです。
 *
 * ・上級者向けの使い方
 * MD Editorで設定した内容は「H2APG.UserPerspMes.setMesDec」関数で変更できます。
 * なので途中で変更したい場合は、
 * スクリプトコマンドで以下のように設定することで実現することができます。
 * ただし、セーブデータには変更が記録されませんのでご注意ください。
 * ////////////////////////////////
 * H2APG.UserPerspMes.setMesDec([
 *   "", // 1 行目の 先頭
 *   "", // 1 行目の 最後
 *   "", // 2 行目の 先頭
 *   "", // 2 行目の 最後
 *   "", // 3 行目の 先頭
 *   "", // 3 行目の 最後
 *   "", // 4 行目の 先頭
 *   ""  // 4 行目の 最後
 * ]);
 * ////////////////////////////////
 *
 * プラグインのパラメータ設定画面での設定に戻したい場合は
 * ////////////////////////////////
 * H2APG.UserPerspMes.defMesDec();
 * ////////////////////////////////
 * を実行してください。
 *
 * また、配列「H2APG.UserPerspMes.mesDecorator」に直接書き込むこともできますが、
 * あまり推奨しません。
 *
 * 使い方の例としては、
 * 台詞用・立て看板用・イベント用など用途別に設定したスクリプトコマンドを
 * コモンイベントにそれぞれ登録しておき、
 * 必要なシーンで会話等が始まる直前に呼び出すといった方法がお勧めです。
 *
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.2
 * RPG Maker MV Version: v1.5.0
 */

var H2APG = H2APG || {};
(function () {
  /*========== ./main.js ==========*/
  //-----------------------------------------------------//
  /* プラグイン名 */
  var PluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  /* 固有オブジェクト名 */
  H2APG.UserPerspMes = {};
  //-----------------------------------------------------//

  //-----------------------------------------------------//
  /* パラメーター取得 */
  var getParam = function (names, type) {
    for (var i = 0; i < names.length; i++) {
      var n = PluginManager.parameters(PluginName)[names[i]];
      if (n) {
        if (type == "number") return Number(n);
        if (type == "string") return String(n);
        if (type == "boolean") return n == "true" ? true : false;
        if (type == "array") return JSON.parse(n);
        if (type == "object") return new Function("return " + n)();
        if (type == "function") return new Function(n);
        return n;
      }
    }
    return null;
  };
  //-----------------------------------------------------//

  H2APG.UserPerspMes.setMesDec = function (a) {
    if (enableMA) {
      b = a;
      if (b.length > 8) b.splice(8);
    } else {
      b = new Array(8);
    }
    for (var i = 0; i < 8; i++) {
      if (b[i] == "null" || b[i] == null) {
        b[i] = "";
      }
    }
    H2APG.UserPerspMes.mesDecorator = b;
  };

  H2APG.UserPerspMes.defMesDec = function () {
    H2APG.UserPerspMes.mesDecorator = H2APG.UserPerspMes.mesDecDef;
  };

  //-----------------------------------------------------//
  /* パラメーター取得 */
  var fastType = getParam(["Fast Type"], "number");
  var ftValue = getParam(["Fast Type Value ID"], "number");
  var pauseSpeed = getParam(["Pause Speed"], "number");
  var fastKey = getParam(["Fast Key"], "string");
  var enableMA = getParam(["Enable Mes Decorator"], "boolean");
  H2APG.UserPerspMes.setMesDec(getParam(["MD Editor"], "array"));
  H2APG.UserPerspMes.mesDecDef = H2APG.UserPerspMes.mesDecorator;
  //-----------------------------------------------------//

  Window_Message.prototype.updateShowFast = function () {
    if (this.isTriggered()) {
      if (ftValue == 0 ? fastType <= 1 : $gameVariables.value(ftValue) <= 1) {
        this._showFast = true;
      }
    }
  };

  Window_Message.prototype.isTriggered = function () {
    if (fastKey != "null" && Input.isPressed(fastKey)) {
      return true;
    }
    if (
      this.pause &&
      (ftValue == 0
        ? fastType == 1 || fastType == 3
        : $gameVariables.value(ftValue) == 1 ||
          $gameVariables.value(ftValue) == 3)
    ) {
      return (
        Input.isTriggered("ok") ||
        Input.isTriggered("cancel") ||
        TouchInput.isTriggered()
      );
    } else {
      return (
        Input.isRepeated("ok") ||
        Input.isRepeated("cancel") ||
        TouchInput.isRepeated()
      );
    }
  };

  Window_Message.prototype.startPause = function () {
    this.startWait(pauseSpeed);
    this.pause = true;
  };

  Window_Message.prototype.startMessage = function () {
    var t = $gameMessage._texts;
    var a = H2APG.UserPerspMes.mesDecorator;
    var c = "";
    for (var i = 0; i < 4; i++) {
      c += a[i * 2] + t[i] + a[i * 2 + 1] + "\n";
    }
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters(c);
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
  };
})();
