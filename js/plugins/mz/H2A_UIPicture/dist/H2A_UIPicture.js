/*:
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
 *   @arg _collision
 *   @text 当たり判定
 *   @desc 省略した場合は画像サイズがそのまま設定されます
 *   @type struct<Rect>
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
/*~struct~Rect:
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

  /*========== ./main.js ==========*/

  /**
   * 文字列のサイズを調べる
   * @param {string} text 文字列
   * @returns {{width:number,height:number}} サイズ
   */
  CanvasRenderingContext2D.prototype.getTextSize = function (text) {
    const measure = this.measureText(text);
    return {
      width: measure.width,
      height:
        measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
    };
  };
  /**
   * 動的表示ログ
   * @param {string} value 値
   * @param {number} x 座標
   * @param {number} y 座標
   */
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
  /**
   * シンプル直線
   * @param {number} ax 座標
   * @param {number} ay 座標
   * @param {number} bx 座標
   * @param {number} by 座標
   */
  CanvasRenderingContext2D.prototype.line = function (ax, ay, bx, by) {
    this.beginPath();
    this.moveTo(ax, ay);
    this.lineTo(bx, by);
    this.stroke();
  };

  // class Table extends PIXI.Container {
  //   constructor() {
  //     super();
  //     SceneManager._scene._table = this;
  //     SceneManager._scene.addChild(SceneManager._scene._table);
  //   }
  // }
  // window.Table = Table;

  class P extends PIXI.Point {
    constructor(x, y) {
      super(x, y);
    }
    /** @param {import("pixi.js").Rectangle} rect */
    contains(rect) {
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
    /** @param {import("pixi.js").Point} point */
    contains(point) {
      return (
        this.left <= point.x &&
        point.x <= this.right &&
        this.top <= point.y &&
        point.y <= this.bottom
      );
    }
    /** @param {import("pixi.js").Rectangle} rect */
    containsRect(rect) {
      return (
        Math.abs(this.x - rect.x) < this.width / 2 + rect.width / 2 &&
        Math.abs(this.y - rect.y) < this.height / 2 + rect.height / 2
      );
    }
  }

  class Button extends PIXI.Sprite {
    /** @type {string} */
    #aliasName;
    /** @type {R} */
    #collision;
    /** @type {boolean} */
    #isPressed = false;
    /** @type {boolean} */
    #isHovered = false;
    /** @type {boolean} */
    #isDragging = false;
    /** @type {P} */
    #dragPosition = new P();
    /** @type {boolean} */
    #isDraggable = true;
    /** @type {R} */
    #draggableArea = new R();
    constructor({ pictureName, aliasName, collision }) {
      super();
      const texture = PIXI.Texture.from(`/img/pictures/${pictureName}.png`);
      texture.baseTexture.addListener("loaded", () => {
        this.texture = texture;
        this.initialize();
      });
      this.#aliasName = aliasName;
      console.log(collision);
      this.#collision = collision;
      this.#isDraggable = true;
      this.#draggableArea = new R(0, 0, 720, 528);
    }
    #connectToTable() {
      if (!SceneManager._scene?._table) {
        SceneManager._scene._table = new Sprite();
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
      return this.#globalCollision.contains(this.mousePosition);
    }
    updateTouch() {
      if (this.worldVisible) {
        // 画面上
        if (this.isBeingTouched) {
          // 判定内
          if (!this.#isHovered && TouchInput.isHovered()) {
            this.#isHovered = true;
            this.onMouseOver();
          }
          if (TouchInput.isTriggered()) {
            this.#isPressed = true;
            this.onMousePress();
          }
        } else {
          // 判定外
          if (this.#isHovered) this.onMouseOut();
          (this.#isPressed = false), (this.#isHovered = false);
        }
        if (this.#isPressed && TouchInput.isReleased()) {
          this.#isPressed = false;
          this.onMouseRelease();
        }
      } else {
        // 画面外
        (this.#isPressed = false), (this.#isHovered = false);
      }
    }
    onDragEnd() {
      // const a = this.#draggableArea;
      // const c = this.#globalCollision;
      // if (a.right <= c.right) {
      //   console.log(a.right, c.width);
      //   this.position.set(a.right - c.width - (c.x - this.x), this.y);
      // }
    }
    updateDrag() {
      if (!this.#isDraggable || !this.#isDragging) return;
      if (!TouchInput.isPressed() || (this.#isHovered && !this.#isPressed)) {
        this.#isDragging = false;
        this.onDragEnd();
      }
      const m = new P(TouchInput.x, TouchInput.y);
      const d = this.#dragPosition;
      const z = new P(m.x - d.x, m.y - d.y);
      // if (c.left < a.left) z.x = a.left;
      // if (c.right > a.right) z.x = a.right - c.width - 100;
      // if (c.top < a.top) z.y = a.top;
      // if (c.bottom > a.bottom) z.y = a.bottom;
      // if (a.containsRect(c)) {
      this.position.set(z.x, z.y);
      const a = this.#draggableArea;
      const c = this.#globalCollision;
      if (c.left <= a.left) this.position.set(a.left - (c.x - this.x), this.y);
      if (a.right <= c.right)
        this.position.set(a.right - c.width - (c.x - this.x), this.y);
      if (c.top <= a.top) this.position.set(this.x, a.top - (c.y - this.y));
      if (a.bottom <= c.bottom)
        this.position.set(this.x, a.bottom - c.height - (c.y - this.y));
    }
    update() {
      this.updateTouch();
      this.updateDrag();
      Input.isTriggered("ok") &&
        (console.log(
          "T:%s\nH:%s P:%s D:%s\nH:%s P:%s M:%s",
          this.isBeingTouched,
          this.#isHovered,
          this.#isPressed,
          this.#isDragging,
          TouchInput.isHovered(),
          TouchInput.isPressed(),
          TouchInput.isMoved()
        ),
        console.log({
          draggableArea: this.#draggableArea,
          globalCollision: this.#globalCollision,
        }));
    }
    onMouseOver() {
      console.log("-[->]");
    }
    onMouseOut() {
      console.log("OUT", TouchInput.isMoved());
    }
    onMousePress() {
      if (this.#isDraggable) {
        this.#isDragging = true;
        const m = this.mousePosition;
        this.#dragPosition = new P(m.x - this.x, m.y - this.y);
      }
      console.log("press");
    }
    onMouseRelease() {
      console.log("release");
      if (this.#isDraggable) {
        this.#isDragging = false;
        this.onDragEnd();
      }
    }
  }

  window.Button = Button;

  PluginManager.registerCommand(pluginName, "setup", (params) => {
    const { _pictureName, _aliasName, _collision } = parse(params);
    console.log(_collision);
    const [pictureName, aliasName, collision] = [
      _pictureName,
      _aliasName,
      new R(
        _collision._x,
        _collision._y,
        _collision._width,
        _collision._height
      ),
    ];
    new Button({ pictureName, aliasName, collision });
  });

  Scene_Map.prototype.processMapTouch = () => {};
})();
