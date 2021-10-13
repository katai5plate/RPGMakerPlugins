//@ts-check
/***__HIDDEN-BEGIN__***/
import { Color, P, R, Sound } from "../calc";
/***__HIDDEN-END__***/

class Game_UIPicture extends Game_Picture {
  /** @type {number} */
  _width;
  /** @type {number} */
  _height;

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
  /** @type {Sound} */
  _soundNormalOnOver = new Sound();
  /** @type {Sound} */
  _soundNormalOnOut = new Sound();
  /** @type {Sound} */
  _soundNormalOnPress = new Sound();
  /** @type {Sound} */
  _soundNormalOnRelease = new Sound();
  /** @type {Sound} */
  _soundDisableOnOver = new Sound();
  /** @type {Sound} */
  _soundDisableOnOut = new Sound();
  /** @type {Sound} */
  _soundDisableOnPress = new Sound();
  /** @type {Sound} */
  _soundDisableOnRelease = new Sound();

  /** @param {number} pictureId */
  constructor(pictureId) {
    super();
    this._pictureId = pictureId;
    console.log(this);
  }
  get collision() {
    // MEMO: anchor が 0.5 の時は xy はマイナスになる
    const anchor = +!!this.origin() * 0.5;
    // 判定が壊れている場合は画像サイズを代用する
    const safeCol = this._collision.isSafe
      ? this._collision
      : new R(0, 0, this._width, this._height);
    const sx = this._scaleX / 100;
    const sy = this._scaleY / 100;
    const px = -anchor * this._width;
    const py = -anchor * this._height;
    return new R(
      px + safeCol.x,
      py + safeCol.y,
      safeCol.width,
      safeCol.height
    ).calc("mul", sx, sy);
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
  updateOpacity() {
    if (this._opacityDuration > 0) {
      const d = this._opacityDuration;
      this._opacity =
        ((this._opacity || 0) * (d - 1) + this._targetOpacity) / d;
      this._opacityDuration--;
    }
  }
  update() {
    super.update();
    this.updateOpacity();
  }
}

export default Game_UIPicture; /***__HIDDEN__***/