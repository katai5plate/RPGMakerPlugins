//@ts-check
/***__HIDDEN-BEGIN__***/
import * as PIXI from "pixi.js";
/***__HIDDEN-END__***/

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
  /** @type {CanvasRenderingContext2D} */
  get ctx() {
    return this.#context;
  }
  flip() {
    this.texture.update();
  }
  /** @param {(ctx:CanvasRenderingContext2D)=>void} fn */
  draw(fn, refresh = false) {
    refresh && this.ctx.clearRect(0, 0, this.width, this.height);
    fn(this.ctx);
    this.flip();
  }
  update() {
    //
  }
}
globalThis.CanvasSprite = CanvasSprite;

export default CanvasSprite; /***__HIDDEN__***/
