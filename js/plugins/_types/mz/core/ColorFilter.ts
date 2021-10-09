import * as PIXI from "pixi.js";
import { BlendColor, ColorTone } from "../other";

export declare class ColorFilter extends PIXI.Filter {
  constructor();
  public setHue(hue: number): void;
  public setColorTone(tone: ColorTone): void;
  public setBlendColor(color: BlendColor): void;
  public setBrightness(brightness: number): void;
  public _fragmentSrc(): string;

  public blendColor: BlendColor;
  public brightness: number;
  public colorTone: ColorTone;
  public hue: number;
}
