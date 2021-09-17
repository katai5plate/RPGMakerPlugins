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
