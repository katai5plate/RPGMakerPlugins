/*:ja
 * @plugindesc [開発中] 画面をタイルサイズに合わせて拡大します
 * @base DP_MapZoom
 * @orderAfter DP_MapZoom
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
 * 【使い方】
 * 1. 以下 URL から DP_MapZoom.js をダウンロードする
 * https://raw.githubusercontent.com/drowsepost/rpgmaker-mv-plugins/488e875ff8ea3e515f3a043c395c2895e3b6786e/DP_MapZoom.js
 *
 * 2. 落としてきた DP_MapZoom.js の 20 行目に以下を追加し「＠」を半角にする
 *  * ＠target MZ
 *
 * 3. プラグイン設定でこのプラグインの上に DP_MapZoom が来るように配置する
 * 設定はデフォルトのままでOK
 *
 * 【代わりに MNKR_DP_MapZoomMZ を使いたい場合】
 * 1. このプラグインのソースコードから以下の内容が書かれた行を削除する
 *  * @base DP_MapZoom
 *  * @orderAfter DP_MapZoom
 *
 * 2. プラグイン設定でこのプラグインの上に MNKR_DP_MapZoomMZ が来るように配置する
 * 設定はデフォルトのままでOK
 *
 * Copyright (c) 2022 Had2Apps
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
})();
