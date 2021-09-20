/*:
 * @plugindesc マップ上のイベントのセルフスイッチをリモコン操作します。
 *
 * @target MV
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @help
 * H2APG.SSRemote(イベントID,"A/B/C/D",true/false/null);
 * H2APG.SSRemote("文字列が含まれるイベント名のイベント","A/B/C/D",true/false/null);
 *
 * 第3引数がnullの場合は反転します。
 *
 * このようにすると自分のセルフスイッチを操作できます。
 * H2APG.SSRemote(this._eventId,"A/B/C/D",true/false/null);
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.2.0
 * RPG Maker MV Version: v1.6.2
 */

var H2APG = H2APG || {};
(function () {
  /*========== ./main.js ==========*/
  H2APG.SSRemote = function (a, b, c) {
    var k, x;
    a = a == null ? undefined : a;
    switch (typeof a) {
      case "number":
        k = [$gameMap.mapId(), a, b];
        x = $gameSelfSwitches.value(k);
        $gameSelfSwitches.setValue(k, c == null ? !x : c);
        break;
      case "string":
        var events = $gameMap.events().filter(function (v) {
          return $dataMap.events[v._eventId].name.indexOf(a) > -1;
        });
        events.forEach(function (v) {
          k = [$gameMap.mapId(), v._eventId, b];
          x = $gameSelfSwitches.value(k);
          $gameSelfSwitches.setValue(k, c == null ? !x : c);
        });
        break;
      case "undefined":
        //いつかなにか作るかも
        console.error("Invalid argument!");
        break;
      default:
        console.error("Invalid argument!");
        break;
    }
  };
})();
