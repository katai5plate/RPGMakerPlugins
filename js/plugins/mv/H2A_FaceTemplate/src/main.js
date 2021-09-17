//: 実装予定 ://
//: @param index ://
//: @desc 顔グラフィック番号指定 ://
//: @string number[] ://
//: @default [0,1,2,3,4,5,6,7] ://

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
