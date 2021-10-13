//@ts-check

//: types ://
import * as PIXI from "pixi.js"; /***__HIDDEN__***/
import * as MZ from "../../../_types/mz/index.js"; /***__HIDDEN__***/
import "./type.ts"; /***__HIDDEN__***/

//: templates ://
import "../../../_templates/utils.js"; /***__HIDDEN__***/
import "../../../_templates/debug.js"; /***__HIDDEN__***/

//: required ://
import "./extension.js"; /***__HIDDEN__***/
import "./calc.js"; /***__HIDDEN__***/

class UIPicture {
  /** convertEscapeCharacters 呼び出し用
   *  @return {MZ.Window_Base} */
  static get baseWindow() {
    const win = RT.as(
      /** @param {MZ.Window_Base | null} _ */ (_) => _,
      SceneManager._scene._windowLayer?.children.find(
        (x) => x instanceof Window_Base
      )
    );
    return win;
  }
}

/** Resolve Types */
class RT {
  /**
   * @template T
   * @param {(type:T)=>any} typeFn
   * @param {unknown} target
   * @returns {T}
   */
  // 使い方: RT.convert(/** @param {Type} _ */ (_) => _, sprite)
  static as(typeFn, target) {
    //@ts-expect-error
    return target;
  }
}

class CanvasSprite extends PIXI.Sprite {
  #context;
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width = 1, height = 1) {
    super();
    this.width = width;
    this.height = height;
    this.createCanvas();
  }
  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.texture = new PIXI.Texture(PIXI.BaseTexture.from(canvas));
    this.#context = canvas.getContext("2d");
  }
  get ctx() {
    return this.#context;
  }
  flip() {
    this.texture.update();
  }
  update() {
    //
  }
}
globalThis.CanvasSprite = CanvasSprite;

class Sprite_ButtonPictureLabel extends CanvasSprite {
  /** @type {number} */
  pictureId;
  /** @type {string} */
  text = "";
  /** @param {number} pictureId */
  constructor(pictureId) {
    super();
    this.pictureId = pictureId;
    this.width = this.picture._width;
    this.height = this.picture._height;
    this.text = this.picture._labelText;
    this.createCanvas();
    console.log(this, this.text);
  }
  get picture() {
    return RT.as(
      /** @param {Game_UIPicture} _ */ (_) => _,
      $gameScreen.picture(this.pictureId)
    );
  }
  updateText() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const x = this.width / 2;
    const y = this.height / 2;
    const text = `${this.text}`;
    const t = UIPicture.baseWindow?.convertEscapeCharacters(text) || text;
    this.ctx.textAlign = "center";
    this.ctx.font = `${$gameSystem.mainFontSize()}px ${$gameSystem.mainFontFace()}`;
    this.ctx.textBaseline = "middle";
    // outline
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.lineJoin = "round";
    this.ctx.strokeText(t, x, y);
    // body
    this.ctx.fillStyle = "white";
    this.ctx.fillText(t, x, y);
    this.flip();
  }
  update() {
    this.updateText();
    if (this.picture.origin() === 0) {
      this.anchor.set(0, 0);
    } else {
      this.anchor.set(0.5, 0.5);
    }
  }
}

class Game_UIPicture extends Game_Picture {
  /** @type {number} */
  _pictureId;
  /** @type {R} */
  _collision = new R(48, 24, 192, 72);
  /** @type {R} */
  _draggableArea = new R(96, 96, 480, 480);
  /** @type {string} */
  _labelText = "";
  /** @type {number} */
  _width;
  /** @type {number} */
  _height;
  /** @param {number} pictureId */
  constructor(pictureId) {
    super();
    this._pictureId = pictureId;
    console.log(this);
  }
  get collision() {
    const anchor = this.origin() === 0 ? 0 : 0.5;
    const sx = this._scaleX / 100;
    const sy = this._scaleY / 100;
    const px = -anchor * this._width;
    const py = -anchor * this._height;
    return new R(
      (px + this._collision.x) * sx,
      (py + this._collision.y) * sy,
      this._collision.width * sx,
      this._collision.height * sy
    );
  }
}

class Sprite_UIPicture extends Sprite_Picture {
  /** @type {boolean} */
  _isDragging = false;
  /** @type {P} */
  _dragPosition = new P();
  /** @type {boolean} */
  _isDraggable = true;
  /** @type {Sprite_ButtonPictureLabel} */
  _labelSprite;
  constructor(pictureId) {
    super(pictureId);
  }
  get isForeground() {
    return (
      Math.max(
        ...RT.as(
          /** @param {Sprite_UIPicture[]} _ */ (_) => _,
          SceneManager._scene?._spriteset?._pictureContainer?.children || []
        )
          ?.filter((x) => x.isBeingTouched())
          .map((x) => x._pictureId)
      ) === this._pictureId
    );
  }
  /** @param {MZ.Bitmap} bitmapLoaded */
  _onBitmapLoad(bitmapLoaded) {
    const picture = RT.as(
      /** @param {Game_UIPicture} _ */ (_) => _,
      this.picture()
    );
    picture._width = bitmapLoaded.width;
    picture._height = bitmapLoaded.height;
    picture._labelText = `picId: ${this._pictureId}`;
    this._labelSprite = new Sprite_ButtonPictureLabel(this._pictureId);
    this.addChild(this._labelSprite);
    return super._onBitmapLoad(bitmapLoaded);
  }
  isBeingTouched() {
    const picture = RT.as(
      /** @param {Game_UIPicture} _ */ (_) => _,
      this.picture()
    );
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
    if (!this._isDraggable || !this._isDragging) return;
    if (!TouchInput.isPressed() || (this._isHovered && !this._isPressed)) {
      this._isDragging = false;
      this.onDragEnd();
    }
    const picture = RT.as(
      /** @param {Game_UIPicture} _ */ (_) => _,
      this.picture()
    );
    const z = new P(
      TouchInput.x - this._dragPosition.x,
      TouchInput.y - this._dragPosition.y
    );
    const area = picture._draggableArea;
    /** @type {R} */
    const col = picture.collision;
    if (z.x + col.left <= area.left) {
      picture._x = area.left - col.left;
    } else if (area.right <= z.x + col.right) {
      picture._x = area.right - col.right;
    } else {
      picture._x = z.x;
    }
    if (z.y + col.top <= area.top) {
      picture._y = area.top - col.top;
    } else if (area.bottom <= z.y + col.bottom) {
      picture._y = area.bottom - col.bottom;
    } else {
      picture._y = z.y;
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
  update() {
    super.update();
    this.updateTouch();
    this.updateDrag();
    this.updateColor();
  }
  onMouseOver() {
    console.log("-[->]");
  }
  onMouseOut() {
    console.log("OUT");
  }
  onMousePress() {
    const picture = RT.as(
      /** @param {Game_UIPicture} _ */ (_) => _,
      this.picture()
    );
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

// PluginManager.registerCommand(pluginName, "setup", (params) => {
//   const data = parse(params);
//   const {
//     _pictureName,
//     _aliasName,
//     _labelText,
//     _position,
//     _collision,
//     _dragConfig,
//   } = data;
//   new Button({
//     pictureName: _pictureName,
//     aliasName: _aliasName || _pictureName,
//     labelText: _labelText || "",
//     position: new P(_position._x, _position._y),
//     collision:
//       _collision &&
//       new R(
//         _collision._x,
//         _collision._y,
//         _collision._width,
//         _collision._height
//       ),
//     dragConfig: {
//       isEnable: !!_dragConfig?._isEnable,
//       draggableArea: _dragConfig._draggableArea
//         ? new R(
//             _dragConfig._draggableArea._x,
//             _dragConfig._draggableArea._y,
//             _dragConfig._draggableArea._width,
//             _dragConfig._draggableArea._height
//           )
//         : new R(0, 0, Graphics.boxWidth, Graphics.boxHeight),
//     },
//   });
// });

const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function () {
  const children = RT.as(
    /** @param {Sprite_UIPicture[] | null} _ */ (_) => _,
    SceneManager._scene?._spriteset?._pictureContainer?.children
  );
  return (
    isMapTouchOk.apply(this, arguments) &&
    !children.find((b) => b.isBeingTouched())
  );
};

Spriteset_Base.prototype.createPictures = function () {
  const rect = this.pictureContainerRect();
  this._pictureContainer = new Sprite();
  this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
  for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
    this._pictureContainer.addChild(new Sprite_UIPicture(i));
  }
  this.addChild(this._pictureContainer);
};

Game_Screen.prototype.showPicture = function (
  pictureId,
  name,
  origin,
  x,
  y,
  scaleX,
  scaleY,
  opacity,
  blendMode
) {
  const realPictureId = this.realPictureId(pictureId);
  const picture = new Game_UIPicture(pictureId);
  picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
  this._pictures[realPictureId] = picture;
};
