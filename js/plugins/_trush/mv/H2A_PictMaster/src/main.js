var fs = require("fs");
var dir = document.URL.replace("file:///", "").split("index.html")[0];
var pdir = dir + "img/pictures/";
var comm = dir + "data/CommonEvents.json";

H2A_PictMaster = {
  inputCommon: function (id) {
    if (location.href.indexOf("?test") == -1) {
      alert("テストプレイ時に実行してください。");
      window.close();
    }
    if (!id || id < 1 || id > $dataCommonEvents.length - 1) {
      alert("コモンイベントIDが無効です。");
      window.close();
    }
    var res = window.prompt(
      "コモンイベントID（" +
        id +
        "）への挿入を開始する場合は「run」と入力してください\n" +
        "※注意：完了してツクールを再起動すると元には戻せません！\n"
    );
    if (res != "run") {
      alert("キャンセルしました。");
      window.close();
    }

    var picList = fs.readdirSync(pdir);
    var data = JSON.parse(fs.readFileSync(comm, "utf8"));
    var add = picList.map(function (v) {
      return {
        code: 231,
        indent: 0,
        parameters: [1, v.split(".")[0], 0, 0, 0, 0, 100, 100, 0, 0],
      };
    });
    data[id].list = add.concat(data[id].list);
    fs.writeFileSync(comm, JSON.stringify(data));

    alert("JSONへの挿入が完了しました。");
    alert(
      "書き換えたJSONをツクール本体と反映させるため、\n" +
        "「このまま」ツクールを再起動してください。\n" +
        "※プロジェクトの保存をしないでください"
    );
    window.close();
  },
  loadAll: function () {
    var picList = fs.readdirSync(pdir);
    picList.forEach(function (v) {
      var f = v.split(".")[0];
      ImageManager.loadPicture(f);
      Game_Interpreter.prototype.setWaitMode("image");
      console.log("ロードしました:\t" + f);
    });
  },
};
