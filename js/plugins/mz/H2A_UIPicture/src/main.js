//@ts-check
/***__HIDDEN-BEGIN__***/
// types
import * as PIXI from "pixi.js";
import * as MZ from "../../../_types/mz";
import "./type.ts";

// templates
import "../../../_templates/pluginName";
import "../../../_templates/parsePluginParams";
import "../../../_templates/resolveTypeAs";

// required
import "./extension";
import { P, R, Margin, Color, Sound } from "./calc";
/***__HIDDEN-END__***/

class UIPicture {
  /** convertEscapeCharacters 呼び出し用
   *  @return {MZ.Window_Base} */
  static get baseWindow() {
    return resolveTypeAs(
      /** @param {MZ.Window_Base | null} _ */ (_) => _,
      SceneManager._scene._windowLayer?.children.find(
        (x) => x instanceof Window_Base
      )
    );
  }
  static picture(pictureId) {
    return resolveTypeAs(
      /** @param {Game_UIPicture | null} _ */ (_) => _,
      $gameScreen.picture(pictureId)
    );
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

class Sprite_ButtonPictureLabel extends CanvasSprite {
  /** @type {number} */
  pictureId;
  /** @param {number} pictureId */
  constructor(pictureId) {
    super();
    this.pictureId = pictureId;
    this.width = this.picture._width;
    this.height = this.picture._height;
    this.createCanvas();
    console.log(this);
  }
  get picture() {
    return resolveTypeAs(
      /** @param {Game_UIPicture} _ */ (_) => _,
      $gameScreen.picture(this.pictureId)
    );
  }
  updateText() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (!UIPicture.baseWindow) return;
    const base = UIPicture.baseWindow;
    const text = `${this.picture._labelText}`;
    const convertedText = base.convertEscapeCharacters(text);
    const convertedLines = convertedText.split("\n").map((text, i, s) => ({
      text,
      height:
        base.maxFontSizeInLine(text) +
        (i === s.length - 1
          ? 0
          : base.lineHeight() - $gameSystem.mainFontSize()),
    }));
    const convertedTextHeight = convertedLines.reduce(
      (p, c) => p + c.height,
      0
    );
    const align = this.picture._textAlign;
    const drawPos = new P(
      align === "start" || align === "left"
        ? this.x
        : align === "end" || align === "right"
        ? this.width
        : this.width / 2, // center
      this.height / 2 - convertedTextHeight / 2
    ).calcP("add", this.picture._textOffset);
    this.ctx.textAlign = align;
    this.ctx.font = `${$gameSystem.mainFontSize()}px ${$gameSystem.mainFontFace()}`;
    this.ctx.textBaseline = "top";
    convertedLines.forEach(({ text, height }) => {
      // outline
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 3;
      this.ctx.lineJoin = "round";
      this.ctx.strokeText(text, drawPos.x, drawPos.y);
      // body
      this.ctx.fillStyle = "white";
      this.ctx.fillText(text, drawPos.x, drawPos.y);
      drawPos.calc("add", 0, height);
    });
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
  _collision = new R(NaN, NaN, NaN, NaN);
  /** @type {R} */
  _dragRange = new R(NaN, NaN, NaN, NaN);
  /** @type {P} */
  _movableDirection = new P(1, 1);
  /** @type {null|"perint"|"perflo"|"local"|"global"} */
  _variableType = null;
  /** @type {P} */
  _variableIds = new P(0, 0);
  /** @type {string} */
  _labelText = "";
  /** @type {CanvasTextAlign} */
  _textAlign = "center";
  /** @type {P} */
  _textOffset = new P(0, 0);
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
    // MEMO: anchor が 0.5 の時は xy はマイナスになる
    const anchor = +!!this.origin() * 0.5;
    const sx = this._scaleX / 100;
    const sy = this._scaleY / 100;
    const px = -anchor * this._width;
    const py = -anchor * this._height;
    return new R(
      px + this._collision.x,
      py + this._collision.y,
      this._collision.width,
      this._collision.height
    ).calc("mul", sx, sy);
  }
  set collision({ x, y, width, height }) {
    const isNotNullable = (a) => a !== null && a !== undefined;
    isNotNullable(x) && (this._collision.x = x);
    isNotNullable(y) && (this._collision.y = y);
    isNotNullable(width) && (this._collision.width = width);
    isNotNullable(height) && (this._collision.height = height);
  }
  get enableDrag() {
    return this._dragRange.isSafe;
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
  /** @param {MZ.Bitmap} bitmapLoaded */
  _onBitmapLoad(bitmapLoaded) {
    const picture = this.picture();
    picture._width = bitmapLoaded.width;
    picture._height = bitmapLoaded.height;
    this._labelSprite = new Sprite_ButtonPictureLabel(this._pictureId);
    this.addChild(this._labelSprite);
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

PluginManager.registerCommand(pluginName, "setup", (params) => {
  /**
   * @type {Partial<{
   *  pictureId: number
   *  collision: R
   *  dragConfig: {
   *    range: R,
   *    move: "horizontal"|"vertical"
   *    type: "perint"|"perflo"|"local"|"global"
   *    variableX: number
   *    variableY: number
   *  }
   *  textConfig: {
   *    text: string,
   *    align: "left"|"right"
   *    offset: P
   *  }
   *  colorConfig: {
   *    off: Color
   *    onOver: Color
   *    onPress: Color
   *    onDisable: Color
   *  }
   *  soundConfig: {
   *    normal: {
   *      onOver: Sound
   *      onOut: Sound
   *      onPress: Sound
   *      onRelease: Sound
   *    }
   *    onDisable: {
   *      onOver: Sound
   *      onOut: Sound
   *      onPress: Sound
   *      onRelease: Sound
   *    }
   *  }
   * }>}
   */
  const $ = parsePluginParams(params);
  console.log({ $ });
  const picture = UIPicture.picture($.pictureId);
  picture.collision = R.from($.collision);
  if ($?.dragConfig) {
    const dragRange = R.from($.dragConfig.range);
    picture._dragRange = dragRange;
    picture._movableDirection = $.dragConfig.move
      ? new P(
          +($.dragConfig.move === "horizontal"),
          +($.dragConfig.move === "vertical")
        )
      : new P(1, 1);
    picture._variableType = $.dragConfig.type;
    picture._variableIds = new P(
      $.dragConfig.variableX || 0,
      $.dragConfig.variableY || 0
    );
  }
  if ($?.textConfig) {
    picture._labelText = $.textConfig.text || "";
    picture._textAlign = $.textConfig.align || "center";
    picture._textOffset = $.textConfig.offset || new P(0, 0);
  }
});

const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function () {
  const children = resolveTypeAs(
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
