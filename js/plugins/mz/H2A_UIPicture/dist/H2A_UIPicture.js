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

  /*========== ./main.js ==========*/
  //@ts-check

  /** @typedef {import("pixi.js").Point} Point */
  /** @typedef {import("pixi.js").Rectangle} Rectangle */
  /** @typedef {import("../../../_types/mz/index.js").ColorFilter} ColorFilter */

  class P extends PIXI.Point {
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

  class R extends PIXI.Rectangle {
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

  class Table extends PIXI.Container {
    constructor() {
      super();
    }
    update() {
      for (let index = 0; index < this.children.length; index++) {
        const child = this.children[index];
        // 重なり判定対策のため、update に次回の要素を送る
        const next =
          index === this.children.length - 1 ? null : this.children[index + 1];
        //@ts-expect-error
        child.update && child.update(next);
      }
    }
  }

  class CanvasSprite extends PIXI.Sprite {
    #context;
    /**
     * @param {number} width
     * @param {number} height
     */
    //@ts-ignore
    constructor(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      super(new PIXI.Texture(PIXI.BaseTexture.from(canvas)));
      this.#context = canvas.getContext("2d");
    }
    get ctx() {
      return this.#context;
    }
  }

  class ButtonLabel extends CanvasSprite {
    constructor(width, height, text) {
      super(width, height);
      const x = width / 2;
      const y = height / 2;
      this.ctx.textAlign = "center";
      this.ctx.font = `${$gameSystem.mainFontSize()}px ${$gameSystem.mainFontFace()}`;
      this.ctx.textBaseline = "middle";
      // outline
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 3;
      this.ctx.lineJoin = "round";
      this.ctx.strokeText(text, x, y);
      // body
      this.ctx.fillStyle = "white";
      this.ctx.fillText(text, x, y);
      this.texture.update();
    }
  }

  class Button extends PIXI.Sprite {
    /** @type {string} */
    #aliasName;
    /** @type {R} */
    #collision;
    /** @type {boolean} */
    isPressed = false;
    /** @type {boolean} */
    isHovered = false;
    /** @type {boolean} */
    isDragging = false;
    /** @type {P} */
    #dragPosition = new P();
    /** @type {boolean} */
    #isDraggable = true;
    /** @type {R} */
    #draggableArea = new R();
    /** @type {ButtonLabel} */
    labelSprite;
    /** @type {string} */
    #labelText = "";
    /** @type {ColorFilter} */
    #color;
    constructor({
      pictureName,
      aliasName,
      labelText,
      position,
      collision,
      dragConfig,
    }) {
      super();
      const texture = PIXI.Texture.from(`/img/pictures/${pictureName}.png`);
      texture.baseTexture.addListener("loaded", () => {
        this.texture = texture;
        this.#collision =
          collision ||
          // 画像全体を設定するので XY がゼロになる
          new R(0, 0, this.width, this.height);
        this.initialize();
        this.labelSprite = new ButtonLabel(
          this.width,
          this.height,
          this.#labelText
        );
        this.addChild(this.labelSprite);
        console.log(this.labelSprite);
      });
      this.#aliasName = aliasName;
      this.#labelText = labelText;
      this.x = position.x;
      this.y = position.y;
      this.#isDraggable = !!dragConfig.isEnable;
      this.#draggableArea = dragConfig.draggableArea;
      this.#color = new ColorFilter();
      this.filters = [this.#color];
    }
    #connectToTable() {
      if (!SceneManager._scene?._table) {
        SceneManager._scene._table = new Table();
        SceneManager._scene._table.name = "H2A_UIPicture";
        SceneManager._scene.addChild(SceneManager._scene._table);
      }
      SceneManager._scene._table.addChild(this);
    }
    initialize() {
      this.#connectToTable();
      console.log(this);
    }
    get mousePosition() {
      // return this.worldTransform.applyInverse(new P(TouchInput.x, TouchInput.y));
      return new P(TouchInput.x, TouchInput.y);
    }
    get #globalCollision() {
      const c = this.#collision;
      return new R(this.x + c.x, this.y + c.y, c.width, c.height);
    }
    get isBeingTouched() {
      return this.#globalCollision.hit(this.mousePosition);
    }
    updateTouch() {
      if (this.worldVisible) {
        // 画面上
        if (this.isBeingTouched) {
          // 判定内
          if (!this.isHovered && TouchInput.isHovered()) {
            this.isHovered = true;
            this.onMouseOver();
          }
          if (TouchInput.isTriggered()) {
            this.isPressed = true;
            this.onMousePress();
          }
        } else {
          // 判定外
          if (this.isHovered) this.onMouseOut();
          (this.isPressed = false), (this.isHovered = false);
        }
        if (this.isPressed && TouchInput.isReleased()) {
          this.isPressed = false;
          this.onMouseRelease();
        }
      } else {
        // 画面外
        (this.isPressed = false), (this.isHovered = false);
      }
    }
    onDragEnd() {
      //
    }
    updateDrag() {
      if (!this.#isDraggable || !this.isDragging) return;
      if (!TouchInput.isPressed() || (this.isHovered && !this.isPressed)) {
        this.isDragging = false;
        this.onDragEnd();
      }
      const z = new P(
        this.mousePosition.x - this.#dragPosition.x,
        this.mousePosition.y - this.#dragPosition.y
      );
      const area = this.#draggableArea;
      const col = this.#collision;
      if (z.x + col.left <= area.left) {
        this.x = area.left - col.left;
      } else if (area.right <= z.x + col.right) {
        this.x = area.right - col.right;
      } else {
        this.x = z.x;
      }
      if (z.y + col.top <= area.top) {
        this.y = area.top - col.top;
      } else if (area.bottom <= z.y + col.bottom) {
        this.y = area.bottom - col.bottom;
      } else {
        this.y = z.y;
      }
    }
    /** @param {Button|null} nextButton */
    updateColor(nextButton) {
      if (nextButton?.isHovered) {
        this.#color.setBlendColor([0, 0, 0, 0]);
      } else if (this.isDragging || this.isPressed) {
        this.#color.setBlendColor([0, 0, 0, 63]);
      } else if (this.isHovered) {
        this.#color.setBlendColor([255, 255, 255, 63]);
      } else {
        this.#color.setBlendColor([0, 0, 0, 0]);
      }
    }
    /** @param {Button|null} nextButton */
    update(nextButton) {
      if (!nextButton?.isHovered) {
        this.updateTouch();
        this.updateDrag();
      }
      this.updateColor(nextButton);
    }
    onMouseOver() {
      console.log("-[->]");
    }
    onMouseOut() {
      console.log("OUT");
    }
    onMousePress() {
      if (this.#isDraggable) {
        this.isDragging = true;
        const m = this.mousePosition;
        this.#dragPosition = new P(m.x - this.x, m.y - this.y);
        console.log(
          "update dragPos",
          this.#dragPosition.x,
          this.#dragPosition.y
        );
      }
      console.log("press");
    }
    onMouseRelease() {
      console.log("release");
      if (this.#isDraggable) {
        this.isDragging = false;
        this.onDragEnd();
      }
    }
  }

  PluginManager.registerCommand(pluginName, "setup", (params) => {
    const data = parse(params);
    const {
      _pictureName,
      _aliasName,
      _labelText,
      _position,
      _collision,
      _dragConfig,
    } = data;
    new Button({
      pictureName: _pictureName,
      aliasName: _aliasName || _pictureName,
      labelText: _labelText || "",
      position: new P(_position._x, _position._y),
      collision:
        _collision &&
        new R(
          _collision._x,
          _collision._y,
          _collision._width,
          _collision._height
        ),
      dragConfig: {
        isEnable: !!_dragConfig?._isEnable,
        draggableArea: _dragConfig._draggableArea
          ? new R(
              _dragConfig._draggableArea._x,
              _dragConfig._draggableArea._y,
              _dragConfig._draggableArea._width,
              _dragConfig._draggableArea._height
            )
          : new R(0, 0, Graphics.boxWidth, Graphics.boxHeight),
      },
    });
  });

  const processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function () {
    if (SceneManager._scene?._table) {
      if (SceneManager._scene._table.children.find((b) => b.isBeingTouched)) {
        return;
      }
    }
    processMapTouch.apply(this, arguments);
  };
})();
