/// <reference path="../../../_templates/overwrite.js"/>

import overwrite from "~templates/overwrite"; /***__HIDDEN__***/

// 拡大率
const getTileScale = () => 48 / $dataSystem.tileSize;

// 640px 以下になるとウィンドウがバグるので修正
Graphics._updateErrorPrinter = function () {
  const width = this.width * this._realScale;
  const height = 100 * this._realScale;
  this._errorPrinter.style.width = width + "px";
  this._errorPrinter.style.height = height + "px";
};

// 1.5.0 より前の状態に戻す
Game_Map.prototype.tileWidth = () => 48;
Game_Map.prototype.tileHeight = () => 48;

// タイル画像を順次拡大する
Tilemap.Layer.prototype.setBitmaps = function (bitmaps) {
  (async () => {
    const results = await Promise.all(
      bitmaps.map(
        (b) =>
          new Promise((r) => {
            if (!b.image) r(["canvas", b, null]);
            const img = new Image();
            img.src = b.image.src;
            img.onload = () => r(["image", b, img]);
          })
      )
    );
    this._images = results.map(([type, bitmap, img]) => {
      if (type === "canvas") {
        return bitmap.canvas;
      }
      const canvas = document.createElement("canvas");
      canvas.style.imageRendering = "pixelated";
      canvas.width = bitmap.width * getTileScale();
      canvas.height = bitmap.height * getTileScale();
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas;
    });
    this._needsTexturesUpdate = true;
  })();
};

// 上層タイルイベントを描画できるようにする
Sprite_Character.prototype.patternWidth = function () {
  if (this._tileId > 0) {
    return $gameMap.tileWidth() / getTileScale(); // 変更
  } else if (this._isBigCharacter) {
    return this.bitmap.width / 3;
  } else {
    return this.bitmap.width / 12;
  }
};
Sprite_Character.prototype.patternHeight = function () {
  if (this._tileId > 0) {
    return $gameMap.tileHeight() / getTileScale(); // 変更
  } else if (this._isBigCharacter) {
    return this.bitmap.height / 4;
  } else {
    return this.bitmap.height / 8;
  }
};

// 歩行グラを拡大する
overwrite(
  Sprite_Character.prototype,
  "initialize",
  (origin) =>
    function () {
      origin.apply(this, arguments);
      this.scale.set(getTileScale(), getTileScale());
    }
);

// ドットがぼやけないようにする
overwrite(
  Scene_Boot.prototype,
  "resizeScreen",
  (origin) =>
    function () {
      origin.apply(this);
      Graphics.app.view.style.imageRendering = "pixelated";
    }
);
overwrite(
  Sprite.prototype,
  "_refresh",
  (origin) =>
    function () {
      origin.apply(this);
      this.texture.baseTexture.scaleMode = 0;
      this.texture.baseTexture.update();
    }
);
