//-----------------------------------------------------//
/* プラグイン名 */
var PluginName = "H2A_UserPerspMes";
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
