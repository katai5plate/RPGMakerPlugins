/*:
 * @plugindesc 顔グラフィック付き文章にキャラ名を自動挿入します。
 *
 * @target MV
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @param Face Template
 * @type struct<ft>[]
 * @desc 顔グラフィックの関連付け
 *
 * @param Indent
 * @type struct<ind>
 * @desc 頭につける半角スペースの数
 *
 * @help
 * パラメータに登録された顔グラフィックを使用して文章の表示を行うと、
 * １行目にキャラクターの名前が表示されるようになります。
 *
 * 最初の１行を占領し、４行目を非表示にするため、
 * これを使用した文章は３行までにしてください。
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.0
 *
 */
/*~struct~ft:
 * @param actor
 * @desc キャラ表示名（数字入力でアクターID指定）
 * @type string
 * @default 1
 *
 * @param face
 * @desc 顔グラフィック名
 * @type string
 *
 * @param style_color
 * @desc キャラ表示の色番号[ヘッダ,フッタ]
 * @type number[]
 * @default [6,0]
 *
 * @param style_size
 * @desc キャラ表示のサイズ増減[ヘッダ,フッタ]
 * @type number[]
 * @default [0,0]
 *
 */
/*~struct~ind:
 * @param template
 * @desc テンプレートのインデント数
 * @type number
 * @default 0
 *
 * @param text
 * @desc メッセージのインデント数
 * @type number
 * @default 2
 *
 */
window.H2A_FaceTemplate = H2A_FaceTemplate || {};
(function () {
  /*========== ./main.js ==========*/

  var param = PluginManager.parameters("H2A_FaceTemplate");
  var pser = function (name) {
    return JSON.parse(
      param[name]
        .replace(/\\/g, "")
        .replace(/\"{/g, "{")
        .replace(/}\"/g, "}")
        .replace(/\"\[/g, "[")
        .replace(/\]\"/g, "]")
    );
  };
  var ft = pser("Face Template");
  var indent = pser("Indent");

  Window_Message.prototype.startMessage = function () {
    var t = $gameMessage._texts;
    var n = "";
    var v = null;

    if (
      (function () {
        for (var i = 0; i < ft.length; i++) {
          v = ft[i];
          if (v.face == $gameMessage._faceName) {
            if (!isNaN(v.actor)) {
              n = $dataActors[Math.floor(v.actor)].name;
            } else {
              n = v.actor;
            }
            return true;
          }
        }
        return false;
      })()
    ) {
      var sc = v.style_color.map(function (v) {
        return `\\c[${v}]`;
      });
      var ss = v.style_size.map(function (v) {
        var vv = Math.abs(v);
        return v > 0 ? "\\{".repeat(vv) : v < 0 ? "\\}".repeat(vv) : "";
      });
      t.unshift(sc[0] + ss[0] + n + ss[1] + sc[1]);
      t = t.slice(0, 4);
      t.forEach(function (a, b) {
        if (b == 0) {
          t[b] = " ".repeat(indent.template) + a;
        } else {
          t[b] = " ".repeat(indent.text) + a;
        }
      });
    }

    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters(t.join("\n"));
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
  };
})();
