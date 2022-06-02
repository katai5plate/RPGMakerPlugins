/*:ja
 * @plugindesc 画面をタイルサイズに合わせて拡大します
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @help
 * 1.5.0 から、タイルサイズを変更できるようになりましたが、
 * 画面のズーム率までは変わらないため、
 * そのままだと広大なマップにポツンと小さいマップが存在するような見た目になってしまい、
 * なんかコレジャナイ感があります。それを解決するプラグインです。
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.0.0
 * RPG Maker MZ Version: v1.5.0
 */

(() => {
  /*========== ../../../_templates/pluginName.js ==========*/
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

  /*========== ../../../_templates/overwrite.js ==========*/
  /**
   * @template T
   * @template {keyof T} K
   * @param {T} parent
   * @param {K} overwriteMethod
   * @param {(origin: T[K]) => function (): any} fn
   * ```js
   * overwrite(Object, "keys", (origin) => function(){
   *   return origin.apply(this, arguments)
   * })
   * ```
   */
  const overwrite = (parent, overwriteMethod, fn) => {
    parent[overwriteMethod] = fn(parent[overwriteMethod]);
  };

  /*========== ./main.js ==========*/

  overwrite(
    Scene_Map.prototype,
    "onMapLoaded",
    (origin) =>
      function () {
        $gameScreen.setZoom(Graphics.width / 2, Graphics.height / 2, 1);
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
})();
