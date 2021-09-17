/*:
 * @target MZ
 * @plugindesc ピクチャ以外の画像をピクチャとして使用する
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMZ-Plugins
 *
 * @command change
 * @text ピクチャ変更
 * @desc ピクチャ以外の画像をピクチャとして表示
 * @arg _id
 *  @text 番号
 *  @desc ピクチャ ID
 *  @type number
 *  @min 1
 *  @default 1
 * @arg _name
 *  @text 画像
 *  @desc 画像名
 *  @type file
 *  @dir img
 * @arg _index
 *  @text インデックス
 *  @desc 分割番号
 *  @type number
 *  @min 0
 *  @default 0
 * @arg _splitCountX
 *  @text 横分割
 *  @desc 幅方向に分割する数 (1: 分割しない)
 *  @type number
 *  @min 1
 *  @default 1
 * @arg _splitCountY
 *  @text 縦分割
 *  @desc 高さ方向に分割する数 (1: 分割しない)
 *  @type number
 *  @min 1
 *  @default 1
 *
 * @help
 * [使い方]
 * 1. 画像を設定せずに「ピクチャの表示」を設定する
 * 2. その処理の直後にプラグインコマンド「ピクチャ変更」を実行
 * 3. 指定した画像がピクチャとして変更される
 *
 * [顔グラフィックを使用する例]
 * ◆ピクチャの表示：#1, なし, 左上 (0,0), (100%,100%), 255, 通常
 * ◆プラグインコマンド：H2A_ImageToPicture, ピクチャ変更
 * ：　　　　　　　　　：番号 = 1
 * ：　　　　　　　　　：画像 = faces/Nature
 * ：　　　　　　　　　：インデックス = 4
 * ：　　　　　　　　　：横分割 = 4
 * ：　　　　　　　　　：縦分割 = 2
 *
 * [Tips]
 * ・すでに表示中のピクチャであっても変更可能です。
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * 動作確認済コアバージョン: v1.1.1
 * プラグインバージョン: v1.0.0
 *
 */
(() => {
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const {} = PluginManager.parameters(pluginName);

  const bitmapAsyncLoad = (url) => {
    const bitmap = Bitmap.load(url);
    return new Promise((resolve, reject) => {
      const isOk = () => bitmap._loadingState === "loaded";
      const isNg = () => bitmap._loadingState === "error";
      const i = setInterval(() => {
        if (isOk()) {
          clearInterval(i);
          resolve(bitmap);
        }
        if (isNg()) {
          clearInterval(i);
          reject(new Error("存在しない画像: " + url));
        }
      }, 1);
    });
  };
  window.bitmapAsyncLoad = bitmapAsyncLoad;
  const getPicture = (pictureId) =>
    SceneManager._scene.children.find(
      (c) => c.constructor.name === "Spriteset_Map"
    )._pictureContainer.children[pictureId - 1];

  PluginManager.registerCommand(
    pluginName,
    "change",
    ({ _id, _name, _index, _splitCountX, _splitCountY }) => {
      const [id, name, index, splitCountX, splitCountY] = [
        Number(_id),
        _name,
        Number(_index),
        Number(_splitCountX),
        Number(_splitCountY),
      ];
      const picture = getPicture(id);
      bitmapAsyncLoad("img/" + name + ".png").then((loadedBitmap) => {
        const paper = new Bitmap(
          loadedBitmap.width / splitCountX,
          loadedBitmap.height / splitCountY
        );
        const [pw, ph] = [paper.width, paper.height];
        paper.context.drawImage(
          loadedBitmap.context.canvas,
          Math.floor((index % splitCountX) * pw),
          Math.floor(Math.floor(index / splitCountX) * ph),
          ...[pw, ph, 0, 0, pw, ph]
        );
        paper.context.canvas.toBlob(
          (blob) => (picture.bitmap = Bitmap.load(URL.createObjectURL(blob)))
        );
      });
    }
  );
})();
