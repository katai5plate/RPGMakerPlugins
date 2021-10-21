//@ts-check
/***__HIDDEN-BEGIN__***/
import * as PIXI from "pixi.js";

import { Bitmap, Sprite_Picture } from "~types/mz";
import resolveTypeAs from "~templates/resolveTypeAs";

import Sprite_UIPictureLabel from "./Sprite_UIPictureLabel";
import Game_UIPicture from "./Game_UIPicture";
/***__HIDDEN-END__***/

class Sprite_UIPicture extends Sprite_Picture {
  constructor(pictureId) {
    super(pictureId);
  }
  /** @param {Bitmap} bitmapLoaded */
  _onBitmapLoad(bitmapLoaded) {
    const picture = resolveTypeAs(
      /** @param {Game_UIPicture} _ */ (_) => _,
      this.picture()
    );
    picture._width = bitmapLoaded.width;
    picture._height = bitmapLoaded.height;
    picture._loaded = true;
    console.log("_onBitmapLoad", picture._pictureId, bitmapLoaded);
    this._labelSprite = new Sprite_UIPictureLabel(this._pictureId);
    this.addChild(
      resolveTypeAs(
        /** @param {PIXI.DisplayObject} _ */ (_) => _,
        this._labelSprite
      )
    );
    return super._onBitmapLoad(bitmapLoaded);
  }
  update() {
    super.update();
  }
}

export default Sprite_UIPicture; /***__HIDDEN__***/
