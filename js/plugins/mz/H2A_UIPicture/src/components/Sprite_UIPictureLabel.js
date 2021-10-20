//@ts-check
/***__HIDDEN-BEGIN__***/
import resolveTypeAs from "~templates/resolveTypeAs";

import { P } from "../calc";

import CanvasSprite from "./CanvasSprite";
import Game_UIPicture from "./Game_UIPicture";
import UIPicture from "./UIPicture";
/***__HIDDEN-END__***/

class Sprite_UIPictureLabel extends CanvasSprite {
  /** @type {number} */
  pictureId;
  /** @param {number} pictureId */
  constructor(pictureId) {
    super();
    this.pictureId = pictureId;
    this.width = this.picture._width;
    this.height = this.picture._height;
    this.createCanvas();
    console.log(this);
  }
  get picture() {
    return resolveTypeAs(
      /** @param {Game_UIPicture} _ */ (_) => _,
      $gameScreen.picture(this.pictureId)
    );
  }
  updateText() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (!UIPicture.baseWindow) return;
    const base = UIPicture.baseWindow;
    const text = `${this.picture._labelText}`;
    const convertedText = base.convertEscapeCharacters(text);
    const convertedLines = convertedText.split("\n").map((text, i, s) => ({
      text,
      height:
        base.maxFontSizeInLine(text) +
        (i === s.length - 1
          ? 0
          : base.lineHeight() - $gameSystem.mainFontSize()),
    }));
    const convertedTextHeight = convertedLines.reduce(
      (p, c) => p + c.height,
      0
    );
    const align = this.picture._textAlign;
    const drawPos = new P(
      align === "start" || align === "left"
        ? this.x
        : align === "end" || align === "right"
        ? this.width
        : this.width / 2, // center
      this.height / 2 - convertedTextHeight / 2
    ).calcP("add", this.picture._textOffset);
    this.ctx.textAlign = align;
    this.ctx.font = `${$gameSystem.mainFontSize()}px ${$gameSystem.mainFontFace()}`;
    this.ctx.textBaseline = "top";
    convertedLines.forEach(({ text, height }) => {
      // outline
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 3;
      this.ctx.lineJoin = "round";
      this.ctx.strokeText(text, drawPos.x, drawPos.y);
      // body
      this.ctx.fillStyle = "white";
      this.ctx.fillText(text, drawPos.x, drawPos.y);
      drawPos.calc("add", 0, height);
    });
    this.flip();
  }
  update() {
    this.updateText();
    if (this.picture.origin() === 0) {
      this.anchor.set(0, 0);
    } else {
      this.anchor.set(0.5, 0.5);
    }
  }
}

export default Sprite_UIPictureLabel; /***__HIDDEN__***/
