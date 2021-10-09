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
