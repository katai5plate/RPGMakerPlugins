//@ts-check
/***__HIDDEN-BEGIN__***/
import * as PIXI from "pixi.js";

import { Bitmap, Sprite_Picture } from "~types/mz";
import resolveTypeAs from "~templates/resolveTypeAs";

import { P, R } from "../calc";

import Sprite_UIPictureLabel from "./Sprite_UIPictureLabel";
import Game_UIPicture from "./Game_UIPicture";
/***__HIDDEN-END__***/

class Sprite_UIPicture extends Sprite_Picture {
  /** @type {boolean} */
  _isDragging = false;
  /** @type {P} */
  _dragPosition = new P();
  /** @type {boolean} */
  _isDraggable = true;
  /** @type {Sprite_UIPictureLabel} */
  _labelSprite;
  constructor(pictureId) {
    super(pictureId);
  }
  /** @override @returns {Game_UIPicture} */
  picture() {
    return resolveTypeAs(
      /** @param {Game_UIPicture} _ */ (_) => _,
      super.picture()
    );
  }
  get isForeground() {
    return (
      Math.max(
        ...resolveTypeAs(
          /** @param {Sprite_UIPicture[]} _ */ (_) => _,
          SceneManager._scene?._spriteset?._pictureContainer?.children || []
        )
          ?.filter((x) => x.isBeingTouched())
          .map((x) => x._pictureId)
      ) === this._pictureId
    );
  }
  /** @param {Bitmap} bitmapLoaded */
  _onBitmapLoad(bitmapLoaded) {
    const picture = this.picture();
    picture._width = bitmapLoaded.width;
    picture._height = bitmapLoaded.height;
    this._labelSprite = new Sprite_UIPictureLabel(this._pictureId);
    this.addChild(
      resolveTypeAs(
        /** @param {PIXI.DisplayObject} _ */ (_) => _,
        this._labelSprite
      )
    );
    return super._onBitmapLoad(bitmapLoaded);
  }
  isBeingTouched() {
    const picture = this.picture();
    if (!picture) return super.isBeingTouched();
    return new R(
      this.x + picture.collision.x,
      this.y + picture.collision.y,
      picture.collision.width,
      picture.collision.height
    ).hit(new P(TouchInput.x, TouchInput.y));
  }
  updateTouch() {
    if (this.worldVisible) {
      // 画面上
      if (this.isBeingTouched() && this.isForeground) {
        // 判定内
        if (!this._isHovered && TouchInput.isHovered()) {
          this._isHovered = true;
          this.onMouseOver();
        }
        if (TouchInput.isTriggered()) {
          this._isPressed = true;
          this.onMousePress();
        }
      } else {
        // 判定外
        if (this._isHovered) this.onMouseOut();
        (this._isPressed = false), (this._isHovered = false);
      }
      if (this._isPressed && TouchInput.isReleased()) {
        this._isPressed = false;
        this.onMouseRelease();
      }
    } else {
      // 画面外
      (this._isPressed = false), (this._isHovered = false);
    }
  }
  onDragEnd() {
    //
  }
  updateDrag() {
    const picture = this.picture();
    if (!picture) return;
    if (!this._isDraggable || !this._isDragging) return;
    if (!TouchInput.isPressed() || (this._isHovered && !this._isPressed)) {
      this._isDragging = false;
      this.onDragEnd();
    }
    const z = new P(
      TouchInput.x - this._dragPosition.x,
      TouchInput.y - this._dragPosition.y
    );
    const area = picture._dragRange;
    /** @type {R} */
    const col = picture.collision;
    if (picture.enableDrag) {
      if (picture._movableDirection.x > 0) {
        if (z.x + col.left <= area.left) {
          picture._x = area.left - col.left;
        } else if (area.right <= z.x + col.right) {
          picture._x = area.right - col.right;
        } else {
          picture._x = z.x;
        }
      }
      if (picture._movableDirection.y > 0) {
        if (z.y + col.top <= area.top) {
          picture._y = area.top - col.top;
        } else if (area.bottom <= z.y + col.bottom) {
          picture._y = area.bottom - col.bottom;
        } else {
          picture._y = z.y;
        }
      }
    }
  }
  updateColor() {
    if (this._isDragging || this._isPressed) {
      this.setBlendColor([0, 0, 0, 63]);
    } else if (this._isHovered) {
      this.setBlendColor([255, 255, 255, 63]);
    } else {
      this.setBlendColor([0, 0, 0, 0]);
    }
  }
  updateVariables() {
    const picture = this.picture();
    if (!picture || !picture?._variableIds || !picture?._variableType) return;
    const { x: idx, y: idy } = picture._variableIds;
    if (picture._variableType) {
      const pos = new P(
        picture._x - picture._dragRange.x + picture.collision.x,
        picture._y - picture._dragRange.y + picture.collision.y
      );
      const max = new P(
        picture._dragRange.right +
          (picture.collision.x - picture.collision.width) -
          (picture._dragRange.x + picture.collision.x),
        picture._dragRange.bottom +
          (picture.collision.y - picture.collision.height) -
          (picture._dragRange.y + picture.collision.y)
      );
      const per = new P(pos.x / max.x, pos.y / max.y).mapping(0, 1, 0, 1);
      switch (picture._variableType) {
        case "perint":
          per.calc("mul", 100);
          idx > 0 && $gameVariables.setValue(idx, per.x);
          idy > 0 && $gameVariables.setValue(idy, per.y);
          break;
        case "perflo":
          idx > 0 && ($gameVariables._data[idx] = per.x);
          idy > 0 && ($gameVariables._data[idy] = per.y);
          break;
        case "local":
          idx > 0 && $gameVariables.setValue(idx, pos.x);
          idy > 0 && $gameVariables.setValue(idy, pos.y);
          break;
        case "global":
          idx > 0 && $gameVariables.setValue(idx, picture._x);
          idy > 0 && $gameVariables.setValue(idy, picture._y);
          break;
      }
    }
  }
  update() {
    super.update();
    this.updateTouch();
    this.updateDrag();
    this.updateColor();
    this.updateVariables();
  }
  onMouseOver() {
    console.log("-[->]");
  }
  onMouseOut() {
    console.log("OUT");
  }
  onMousePress() {
    if (this._isDraggable) {
      this._isDragging = true;
      this._dragPosition = new P(TouchInput.x - this.x, TouchInput.y - this.y);
    }
    console.log("press");
  }
  onMouseRelease() {
    console.log("release");
    if (this._isDraggable) {
      this._isDragging = false;
      this.onDragEnd();
    }
  }
}

export default Sprite_UIPicture; /***__HIDDEN__***/
