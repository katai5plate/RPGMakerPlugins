/*:ja
 * @plugindesc
 *
 * @target MZ
 * @author Had2Apps
 * @url https://github.com/katai5plate/RPGMakerPlugins
 *
 * @command setup
 * @text ピクチャ設定
 *
 *   @arg _pictureName
 *   @text ファイル名
 *   @type file
 *   @dir img/pictures
 *
 *   @arg _aliasName
 *   @text エイリアス名
 *   @desc 省略した場合はファイル名が設定されます
 *   @type string
 *
 *   @arg _labelText
 *   @text ラベル文字列
 *   @desc
 *   @type string
 *
 *   @arg _position
 *   @text 左上位置
 *   @desc 省略禁止
 *   @type struct<P>
 *   @default {"_x":0,"_y":0}
 *
 *   @arg _collision
 *   @text 当たり判定
 *   @desc 省略した場合は画像サイズがそのまま設定されます
 *   @type struct<R>
 *
 *   @arg _dragConfig
 *   @text ドラッグ設定
 *   @desc 省略禁止
 *   @type struct<DragConfig>
 *   @default {"_isEnable":false}
 *
 * @help
 *
 *
 * Copyright (c) 2021 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v0.0.1
 * RPG Maker MZ Version: v1.3.3
 */
/*~struct~P:ja
 * @param _x
 * @type number
 *
 * @param _y
 * @type number
 *
 */
/*~struct~R:ja
 * @param _x
 * @type number
 *
 * @param _y
 * @type number
 *
 * @param _width
 * @type number
 *
 * @param _height
 * @type number
 *
 */
/*~struct~DragConfig:ja
 * @param _isEnable
 * @type boolean
 *
 * @param _draggableArea
 * @type struct<R>
 *
 */
(() => {
  /*========== ../../../_templates/utils.js ==========*/
  const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

  const parse = (paramText) =>
    JSON.parse(
      JSON.stringify(paramText, (_, v) => {
        if (/^".*?"$/.test(v)) return v;
        try {
          const p = JSON.parse(v);
          return null === p ? v : p;
        } catch (__) {
          return v;
        }
      })
    );

  /*========== ../../../_templates/debug.js ==========*/
  const debugLog = (
    logs = [],
    groupName = `${Date.now()}`,
    enableTrace = false
  ) => {
    console.group(groupName);
    for (let log of logs) console.log(...log);
    if (enableTrace) {
      console.groupCollapsed("trace");
      console.trace();
      console.groupEnd();
    }
    console.groupEnd();
  };

  /*========== ./extension.js ==========*/

  CanvasRenderingContext2D.prototype.getTextSize = function (text) {
    const measure = this.measureText(text);
    return {
      width: measure.width,
      height:
        measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
    };
  };
  CanvasRenderingContext2D.prototype.log = function (value, x = 0, y = 0) {
    const fillStyle = this.fillStyle;
    this.fillStyle = "#fff";
    const text = JSON.stringify(value, null, 2);
    text.split("\n").forEach((line, i) => {
      const { height } = this.getTextSize("あ");
      this.fillText(line, x, y + height * i);
    });
    this.fillStyle = fillStyle;
  };
  CanvasRenderingContext2D.prototype.line = function (ax, ay, bx, by) {
    this.beginPath();
    this.moveTo(ax, ay);
    this.lineTo(bx, by);
    this.stroke();
  };

  /*========== ./calc.js ==========*/
  /** @typedef {import("pixi.js").Point} Point */
  /** @typedef {import("pixi.js").Rectangle} Rectangle */

  class P extends PIXI.Point {
    /**
     * @param {ConstructorParameters<typeof PIXI.Point>[0]} [x]
     * @param {ConstructorParameters<typeof PIXI.Point>[1]} [y]
     */
    constructor(x, y) {
      super(x, y);
    }
    /** @param {Rectangle} rect */
    hit(rect) {
      return (
        rect.left <= this.x &&
        this.x <= rect.right &&
        rect.top <= this.y &&
        this.y <= rect.bottom
      );
    }
  }

  class S extends PIXI.Point {
    /**
     * @param {ConstructorParameters<typeof PIXI.Point>[0]} [w]
     * @param {ConstructorParameters<typeof PIXI.Point>[1]} [h]
     */
    constructor(w, h) {
      super(w, h);
    }
  }

  class R extends PIXI.Rectangle {
    /**
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[0]} [x]
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[1]} [y]
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[2]} [w]
     * @param {ConstructorParameters<typeof PIXI.Rectangle>[3]} [h]
     */
    constructor(x, y, w, h) {
      super(x, y, w, h);
    }
    /** @param {Point} point */
    hit(point) {
      return (
        this.left <= point.x &&
        point.x <= this.right &&
        this.top <= point.y &&
        point.y <= this.bottom
      );
    }
    /** @param {Rectangle} rect */
    containsRect(rect) {
      return (
        Math.abs(this.x - rect.x) < this.width / 2 + rect.width / 2 &&
        Math.abs(this.y - rect.y) < this.height / 2 + rect.height / 2
      );
    }
  }

  /*========== ./main.js ==========*/

  class UIPictureState {
    // /** @type {Table} */
    // static table = null;
    /** @return {MZ.Window_Base} */
    static get baseWindow() {
      const win = RT.as(
        /** @param {MZ.Window_Base | null} _ */ (_) => _,
        SceneManager._scene._windowLayer.children.find(
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
      return target;
    }
  }

  class CanvasSprite extends PIXI.Sprite {
    #context;
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
      super();
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      this.texture = new PIXI.Texture(PIXI.BaseTexture.from(canvas));
      this.#context = canvas.getContext("2d");
    }
    get ctx() {
      return this.#context;
    }
  }
  globalThis.CanvasSprite = CanvasSprite;

  class ButtonLabel extends CanvasSprite {
    /**
     * @param {ConstructorParameters<typeof CanvasSprite>[0]} width
     * @param {ConstructorParameters<typeof CanvasSprite>[1]} height
     * @param {string} text
     */
    constructor(width, height, text) {
      super(width, height);
      this.drawText(text);
      console.log(this);
    }
    /** @param {string} text */
    drawText(text) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      const x = this.width / 2;
      const y = this.height / 2;
      const t =
        UIPictureState.baseWindow?.convertEscapeCharacters(text) || text;
      // const t = text;
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
      this.texture.update();
    }
  }

  class Game_UIPicture extends Game_Picture {
    // /** @type {number} */
    // _pictureId;
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
    /** @type {PIXI.ObservablePoint | P} */
    anchor = new P(0, 0);
    /** @param {number} pictureId */
    constructor(pictureId) {
      super();
      this._pictureId = pictureId;
      console.log(this);
    }
    get collision() {
      const sx = this._scaleX / 100;
      const sy = this._scaleY / 100;
      const px = -this.anchor.x * this._width;
      const py = -this.anchor.y * this._height;
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
    /** @type {ButtonLabel} */
    _labelSprite;
    constructor(pictureId) {
      super(pictureId);
    }
    /** @param {MZ.Bitmap} bitmapLoaded */
    _onBitmapLoad(bitmapLoaded) {
      const picture = RT.as(
        /** @param {Game_UIPicture} _ */ (_) => _,
        this.picture()
      );
      picture._width = bitmapLoaded.width;
      picture._height = bitmapLoaded.height;
      picture.anchor = this.anchor;

      $gameVariables.setValue(5, "123456");
      this._labelSprite = new ButtonLabel(
        bitmapLoaded.width,
        bitmapLoaded.height,
        "val: \\v[5]"
      );
      this._labelSprite.anchor = this.anchor;
      this.addChild(this._labelSprite);
      return super._onBitmapLoad(bitmapLoaded);
    }
    /** @returns {Sprite_UIPicture | null} */
    get nextSprite() {
      return RT.as(
        /** @param {Sprite_UIPicture | null} _ */ (_) => _,
        SceneManager._scene?._spriteset?._pictureContainer?.children?.[
          this._pictureId // _pictureId - 1 + 1
        ] || null
      );
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
        if (this.isBeingTouched()) {
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
      if (this.nextSprite?._isHovered) {
        this.setBlendColor([0, 0, 0, 0]);
      } else if (this._isDragging || this._isPressed) {
        this.setBlendColor([0, 0, 0, 63]);
      } else if (this._isHovered) {
        this.setBlendColor([255, 255, 255, 63]);
      } else {
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
    update() {
      super.update();
      if (!this.nextSprite?._isHovered) {
        if (this._isDragging === this.nextSprite?._isDragging) {
          this._isPressed = false;
          this._isDragging = false;
        }
        this.updateTouch();
        this.updateDrag();
      }
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
        this._dragPosition = new P(
          TouchInput.x - this.x,
          TouchInput.y - this.y
        );
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
})();
