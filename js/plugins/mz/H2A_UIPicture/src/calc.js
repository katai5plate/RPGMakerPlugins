/***__HIDDEN-BEGIN__***/
import * as PIXI from "pixi.js";
/***__HIDDEN-END__***/

class P extends PIXI.Point {
  /**
   * @param {ConstructorParameters<typeof PIXI.Point>[0]} [x]
   * @param {ConstructorParameters<typeof PIXI.Point>[1]} [y]
   */
  constructor(x, y) {
    super(x, y);
  }
  get isSafe() {
    return [this.x, this.y].every(
      (v) => Number.isFinite(v) && 0 <= v && v <= Number.MAX_SAFE_INTEGER
    );
  }
  /** @param {PIXI.Rectangle} rect */
  hit(rect) {
    return (
      rect.left <= this.x &&
      this.x <= rect.right &&
      rect.top <= this.y &&
      this.y <= rect.bottom
    );
  }
  /**
   * @param {number} xmin
   * @param {number} xmax
   * @param {number} ymin
   * @param {number} ymax
   */
  mapping(xmin, xmax, ymin, ymax) {
    xmin > this.x && (this.x = xmin);
    xmax < this.x && (this.x = xmax);
    ymin > this.y && (this.y = ymin);
    ymax < this.y && (this.y = ymax);
    return this;
  }
  /**
   * @param {"add"|"sub"|"mul"|"div"|"mod"} op
   * @param {number} x
   * @param {number} [y]
   */
  calc(op, x, y = x) {
    if (op === "add") {
      (this.x += x), (this.y += y);
    } else if (op === "sub") {
      (this.x -= x), (this.y -= y);
    } else if (op === "mul") {
      (this.x *= x), (this.y *= y);
    } else if (op === "div") {
      (this.x /= x), (this.y /= y);
    } else if (op === "mod") {
      (this.x %= x), (this.y %= y);
    }
    return this;
  }
  /**
   * @param {Parameters<typeof this.calc>[0]} op
   * @param {P} p
   */
  calcP(op, p) {
    return this.calc(op, p.x, p.y);
  }
  static from({ x, y }) {
    return new this(x, y);
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
  get isSafe() {
    return (
      [this.x, this.y, this.width, this.height].every(
        (v) => Number.isFinite(v) && 0 <= v && v <= Number.MAX_SAFE_INTEGER
      ) && [this.width, this.height].every((v) => 0 < v)
    );
  }
  /** @param {PIXI.Point} point */
  hit(point) {
    return (
      this.left <= point.x &&
      point.x <= this.right &&
      this.top <= point.y &&
      point.y <= this.bottom
    );
  }
  /**
   * @param {"add"|"sub"|"mul"|"div"|"mod"} op
   * @param {number} x
   * @param {number} [y]
   * @param {number} [w]
   * @param {number} [h]
   */
  calc(op, x, y, w, h) {
    let _y = y,
      _w = w,
      _h = h;
    !y && (_y = x);
    !w && !h && (_w = x), (_h = _y);
    if (op === "add") {
      (this.x += x), (this.y += _y), (this.width += _w), (this.height += _h);
    } else if (op === "sub") {
      (this.x -= x), (this.y -= _y), (this.width -= _w), (this.height -= _h);
    } else if (op === "mul") {
      (this.x *= x), (this.y *= _y), (this.width *= _w), (this.height *= _h);
    } else if (op === "div") {
      (this.x /= x), (this.y /= _y), (this.width /= _w), (this.height /= _h);
    } else if (op === "mod") {
      (this.x %= x), (this.y %= _y), (this.width %= _w), (this.height %= _h);
    }
    return this;
  }
  /** @param {PIXI.Rectangle} rect */
  containsRect(rect) {
    return (
      Math.abs(this.x - rect.x) < this.width / 2 + rect.width / 2 &&
      Math.abs(this.y - rect.y) < this.height / 2 + rect.height / 2
    );
  }
  static from({ x, y, width, height }) {
    return new this(x, y, width, height);
  }
}

class Color {
  constructor(r = 0, g = 0, b = 0, v = 0, a = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.v = v;
    this.a = a;
  }
}

class Sound {
  constructor(name = "", volume = 0, pitch = 0, pan = 0) {
    this.name = name;
    this.volume = volume;
    this.pitch = pitch;
    this.pan = pan;
  }
  play() {
    AudioManager.playSe(this);
  }
}

/***__HIDDEN-BEGIN__***/
export { P, R, Margin, Color, Sound };
/***__HIDDEN-END__***/
