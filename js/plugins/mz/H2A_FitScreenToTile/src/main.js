/// <reference path="../../../_templates/pluginName.js"/>
/// <reference path="../../../_templates/overwrite.js"/>

import overwrite from "~templates/overwrite"; /***__HIDDEN__***/

overwrite(
  Scene_Map.prototype,
  "onMapLoaded",
  (origin) =>
    function () {
      drowsepost.camera.zoom(1, 1, -1);
      return origin.apply(this, arguments);
    }
);

overwrite(
  Game_Screen.prototype,
  "setZoom",
  (origin) =>
    function (x, y, scale) {
      origin.apply(this, arguments);
      this._zoomScale = (48 / $dataSystem.tileSize) * scale;
    }
);
