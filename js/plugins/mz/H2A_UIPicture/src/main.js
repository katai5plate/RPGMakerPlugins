//@ts-check

//: types ://
/// <reference path="../../../_types/mz/index.js"/>
/// <reference path="./type.ts"/>

//: templates ://
/// <reference path="../../../_templates/utils.js"/>
/// <reference path="../../../_templates/debug.js"/>

//: required ://
/// <reference path="./extension.js"/>
/// <reference path="./calc.js"/>

/** @typedef {import("../../../_types/mz/index.js").ColorFilter} ColorFilter */

class UIPictureState {
  /** @type {Table} */
  static table = null;
}

class Table extends PIXI.Container {
  /** @type {Button[]} */
  children = [];
  constructor() {
    super();
  }
  update() {
    for (let index = 0; index < this.children.length; index++) {
      const child = this.children[index];
      // 重なり判定対策のため、update に次回の要素を送る
      const next =
        index === this.children.length - 1 ? null : this.children[index + 1];
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

class ButtonLabel extends CanvasSprite {
  /**
   * @param {ConstructorParameters<typeof CanvasSprite>[0]} width
   * @param {ConstructorParameters<typeof CanvasSprite>[1]} height
   * @param {string} text
   */
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
    if (!UIPictureState.table) {
      UIPictureState.table = new Table();
    }
    const tableIndex = SceneManager._scene.children.indexOf(
      UIPictureState.table
    );
    if (tableIndex !== -1) {
      SceneManager._scene.addChild(UIPictureState.table);
    }
    UIPictureState.table.addChild(this);
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
      console.log("update dragPos", this.#dragPosition.x, this.#dragPosition.y);
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

const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function () {
  return (
    isMapTouchOk.apply(this, arguments) &&
    !!UIPictureState?.table.children.find((b) => b.isBeingTouched)
  );
};
