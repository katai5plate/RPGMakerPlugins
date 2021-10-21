//@ts-check
/***__HIDDEN-BEGIN__***/
import { Color, P, R } from "../calc";
import { Game_Interpreter } from "~types/mz";
import Sprite_UIPictureLabel from "./Sprite_UIPictureLabel";
/***__HIDDEN-END__***/

class Game_UIPicture extends Game_Picture {
  /** @type {number} */
  _width;
  /** @type {number} */
  _height;
  /** @type {boolean} */
  _loaded = false;
  /** @type {boolean} */
  _isDragging = false;
  /** @type {P} */
  _dragPosition = new P();
  /** @type {boolean} */
  _isDraggable = true;
  /** @type {Sprite_UIPictureLabel} */
  _labelSprite;
  /** @type {number} */
  _pressCount = 0;

  /** @type {boolean} */
  _isUI = false;
  /** @type {boolean} */
  _enableLoadingWait = false;
  /** @type {*} */
  _callbackInterpreter = null;

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
  /** @type {boolean} */
  _disDraggableWhenDisabled = false;

  /** @type {string} */
  _labelText = "";
  /** @type {CanvasTextAlign} */
  _textAlign = "center";
  /** @type {P} */
  _textOffset = new P(0, 0);

  /** @type {number} */
  _colorDuration = 1;
  /** @type {Color} */
  _colorNormal = new Color(0, 0, 0, 0, 255);
  /** @type {Color} */
  _colorOnOver = new Color(0, 0, 0, 0, 255);
  /** @type {Color} */
  _colorOnPress = new Color(0, 0, 0, 0, 255);
  /** @type {Color} */
  _colorOnDisable = new Color(0, 0, 0, 0, 255);
  /** @type {number} */
  _opacityDuration = 0;

  /** @type {boolean} */
  _isDisabled = false;

  /** @type {number} */
  _callbackCommonEventId = NaN;
  /** @type {string} */
  _callbackCommonEventLabelOnOver = "";
  /** @type {string} */
  _callbackCommonEventLabelOnOut = "";
  /** @type {string} */
  _callbackCommonEventLabelOnPress = "";
  /** @type {string} */
  _callbackCommonEventLabelOnRelease = "";

  /** @param {number} pictureId */
  constructor(pictureId) {
    super();
    this._pictureId = pictureId;
    console.log(456, this);
  }
  get scale() {
    return new P(this._scaleX, this._scaleY);
  }
  get anchoredPosition() {
    // MEMO: anchor が 0.5 の時は xy はマイナスになる
    const anchor = +!!this.origin() * 0.5;
    return new P(-anchor * this._width, -anchor * this._height);
  }
  get imageCollision() {
    return R.fromP(this.anchoredPosition)
      .calc("add", 0, 0, this._width, this._height)
      .calcP("mul", this.scale.calc("div", 100));
  }
  get collision() {
    // 判定が壊れている場合は画像サイズを代用する
    if (!this._collision.isSafe) return this.imageCollision;
    return R.fromP(this.anchoredPosition)
      .calcR("add", this._collision)
      .calcP("mul", this.scale.calc("div", 100));
  }
  set collision(r) {
    const { x, y, width, height } = r || {
      x: 0,
      y: 0,
      width: this._width,
      height: this._height,
    };
    Number.isFinite(x) && (this._collision.x = x);
    Number.isFinite(y) && (this._collision.y = y);
    Number.isFinite(width) && (this._collision.width = width);
    Number.isFinite(height) && (this._collision.height = height);
  }
  get enableDrag() {
    return this._dragRange.isSafe;
  }
  /** @param {"over"|"out"|"press"|"release"} on */
  callback(on) {
    const i = this._callbackInterpreter;
    if (!(i instanceof Game_Interpreter)) return;
    const ce = $dataCommonEvents[this._callbackCommonEventId];
    if (!ce) return;
    let label = "";
    on === "over" && (label = this._callbackCommonEventLabelOnOver);
    on === "out" && (label = this._callbackCommonEventLabelOnOut);
    on === "press" && (label = this._callbackCommonEventLabelOnPress);
    on === "release" && (label = this._callbackCommonEventLabelOnRelease);
    if (label !== "") {
      i.setup(
        ce.list.slice(
          ce.list.findIndex(
            (x) => x.code === 118 && x.parameters?.[0] === label
          )
        )
      );
    }
  }
  get isForeground() {
    return (
      Math.max(
        ...UIPicture.pictures()
          ?.filter((x) => x.isBeingTouched())
          .map((x) => x._pictureId)
      ) === this._pictureId
    );
  }
  get isAutoMoving() {
    return this._duration > 0;
  }
  get sprite() {
    return UIPicture.sprite(this._pictureId);
  }
  isBeingTouched() {
    return new R(
      this.sprite.x + this.collision.x,
      this.sprite.y + this.collision.y,
      this.collision.width,
      this.collision.height
    ).hit(new P(TouchInput.x, TouchInput.y));
  }
  onDragEnd() {
    //
  }
  triggerColor() {
    const { _colorDuration, _colorNormal, _colorOnOver, _colorOnPress } = this;
    if (this.isAutoMoving) {
      this._targetOpacity = _colorNormal.opacity;
      this.tint(_colorNormal.TintColor, _colorDuration);
    } else if (this._isDragging || this._isPressed) {
      this._targetOpacity = _colorOnPress.opacity;
      this.tint(_colorOnPress.TintColor, _colorDuration);
    } else if (this._isHovered) {
      this._targetOpacity = _colorOnOver.opacity;
      this.tint(_colorOnOver.TintColor, _colorDuration);
    } else {
      this._targetOpacity = _colorNormal.opacity;
      this.tint(_colorNormal.TintColor, _colorDuration);
    }
    this._opacityDuration = _colorDuration;
  }
  updateTouch() {
    if (this.sprite.worldVisible) {
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
    if (this._isPressed) {
      this._pressCount++;
    } else {
      this._pressCount = -1;
    }
  }
  updateDrag() {
    if (!this._isDraggable || !this._isDragging) return;
    if (
      !TouchInput.isPressed() ||
      (this._isHovered && !this._isPressed) ||
      this.isAutoMoving ||
      this._isDisabled
    ) {
      this._isDragging = false;
      this.onDragEnd();
    }
    const z = new P(
      TouchInput.x - this._dragPosition.x,
      TouchInput.y - this._dragPosition.y
    );
    const area = this._dragRange;
    /** @type {R} */
    const col = this.collision;
    if (this.enableDrag) {
      if (this._movableDirection.x > 0) {
        if (z.x + col.left <= area.left) {
          this._x = area.left - col.left;
        } else if (area.right <= z.x + col.right) {
          this._x = area.right - col.right;
        } else {
          this._x = z.x;
        }
      }
      if (this._movableDirection.y > 0) {
        if (z.y + col.top <= area.top) {
          this._y = area.top - col.top;
        } else if (area.bottom <= z.y + col.bottom) {
          this._y = area.bottom - col.bottom;
        } else {
          this._y = z.y;
        }
      }
    }
  }
  updateOpacity() {
    if (this._opacityDuration > 0) {
      const d = this._opacityDuration;
      this._opacity =
        ((this._opacity || 0) * (d - 1) + this._targetOpacity) / d;
      this._opacityDuration--;
    }
  }
  updateColor() {
    const { _colorDuration, _colorNormal, _colorOnDisable } = this;
    this._opacityDuration = _colorDuration;
    if (this._isDisabled) {
      this._targetOpacity = _colorOnDisable.opacity;
      this.tint(_colorOnDisable.TintColor, _colorDuration);
      return;
    }
    if (!this._isDragging && !this._isPressed && !this._isHovered) {
      this._targetOpacity = _colorNormal.opacity;
      this.tint(_colorNormal.TintColor, _colorDuration);
    }
  }
  updateVariables() {
    if (!this?._variableIds || !this?._variableType) return;
    const { x: idx, y: idy } = this._variableIds;
    if (this._variableType) {
      const pos = new P(
        this._x - this._dragRange.x + this.collision.x,
        this._y - this._dragRange.y + this.collision.y
      );
      const max = new P(
        this._dragRange.right +
          (this.collision.x - this.collision.width) -
          (this._dragRange.x + this.collision.x),
        this._dragRange.bottom +
          (this.collision.y - this.collision.height) -
          (this._dragRange.y + this.collision.y)
      );
      const per = new P(pos.x / max.x, pos.y / max.y).mapping(0, 1, 0, 1);
      switch (this._variableType) {
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
          idx > 0 && $gameVariables.setValue(idx, this._x);
          idy > 0 && $gameVariables.setValue(idy, this._y);
          break;
      }
    }
  }
  update() {
    super.update();
    if (this._isUI) {
      this.updateTouch();
      this.updateDrag();
      this.updateOpacity();
      this.updateColor();
      this.updateVariables();
    }
  }
  onMouseOver() {
    console.log("onMouseOver");
    if (!this.isAutoMoving) {
      this.callback("over");
    }
    this.triggerColor();
  }
  onMouseOut() {
    console.log("onMouseOut");
    if (!this.isAutoMoving) {
      this.callback("out");
    }
    this.triggerColor();
  }
  onMousePress() {
    console.log("onMousePress");
    if (!this.isAutoMoving) {
      this.callback("press");
      if (this._isDraggable) {
        if (!(this._isDisabled && this._disDraggableWhenDisabled)) {
          this._isDragging = true;
          this._dragPosition = new P(
            TouchInput.x - this.sprite.x,
            TouchInput.y - this.sprite.y
          );
        }
      }
    }
    this.triggerColor();
  }
  onMouseRelease() {
    console.log("onMouseRelease");
    if (!this.isAutoMoving) {
      this.callback("release");
      if (this._isDraggable) {
        this._isDragging = false;
        this.onDragEnd();
      }
    }
    this.triggerColor();
  }
}

export default Game_UIPicture; /***__HIDDEN__***/
