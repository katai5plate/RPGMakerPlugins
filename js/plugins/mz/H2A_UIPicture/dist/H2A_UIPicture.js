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
    constructor({ pictureName, aliasName, position, collision, dragConfig }) {
      super();
      const texture = PIXI.Texture.from(`/img/pictures/${pictureName}.png`);
      texture.baseTexture.addListener("loaded", () => {
        this.texture = texture;
        this.#collision =
          collision ||
          // 画像全体を設定するので XY がゼロになる
          new R(0, 0, this.width, this.height);
        this.initialize();
      });
      this.#aliasName = aliasName;
      this.x = position.x;
      this.y = position.y;
      this.#isDraggable = !!dragConfig.isEnable;
      this.#draggableArea = dragConfig.draggableArea;
      console.log(this.x, this.y, this.#draggableArea.x, this.#draggableArea.y);
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
      //
    }
    updateDrag() {
      if (!this.#isDraggable || !this.#isDragging) return;
      if (!TouchInput.isPressed() || (this.#isHovered && !this.#isPressed)) {
        this.#isDragging = false;
        this.onDragEnd();
      }
      const z = new P(
        TouchInput.x - this.#dragPosition.x,
        TouchInput.y - this.#dragPosition.y
      );
      const area = this.#draggableArea;
      const gcol = this.#globalCollision;
      const col = this.#collision;
      const lt = new P(col.x, col.y);
      const rb = new P(col.x + col.width, col.y + col.height);
      if (z.x + lt.x <= area.left) {
        this.x = area.left - lt.x;
      } else if (area.right <= z.x + rb.x) {
        this.x = area.right - rb.x;
      } else {
        this.x = z.x;
      }
      if (z.y + lt.y <= area.top) {
        this.y = area.top - lt.y;
      } else if (area.bottom <= z.y + rb.y) {
        this.y = area.bottom - rb.y;
      } else {
        this.y = z.y;
      }
      debugLog([
        ["ZZZZ", z.x, z.y],
        ["this", this.x, this.y],
        ["area", area.x, area.y, area.width, area.height],
        ["lcol", col.x, col.y, col.width, col.height],
        ["gcol", gcol.x, gcol.y, gcol.width, gcol.height],
        ["lt", lt.x, lt.y],
        ["rb", rb.x, rb.y],
        [area.x + area.width, area.right],
      ]);
    }
    update() {
      this.updateTouch();
      this.updateDrag();
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
        this.#isDragging = false;
        this.onDragEnd();
      }
    }
  }

  window.Button = Button;

  PluginManager.registerCommand(pluginName, "setup", (params) => {
    const data = parse(params);
    const { _pictureName, _aliasName, _position, _collision, _dragConfig } =
      data;
    console.log(data);
    const [pictureName, aliasName, position, collision, dragConfig] = [
      _pictureName,
      _aliasName || _pictureName,
      new P(_position._x, _position.y),
      _collision &&
        new R(
          _collision._x,
          _collision._y,
          _collision._width,
          _collision._height
        ),
      {
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
    ];
    new Button({ pictureName, aliasName, position, collision, dragConfig });
  });

  Scene_Map.prototype.processMapTouch = () => {};
})();
