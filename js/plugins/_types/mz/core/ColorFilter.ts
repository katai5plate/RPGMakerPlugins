import * as PIXI from "pixi.js";
import { ColorTone } from "../data";

export declare class ColorFilter extends PIXI.Filter {
  constructor();
  public setHue(hue: number): void;
  public setColorTone(tone: ColorTone): void;
  public setBlendColor(color: ColorTone): void;
  public setBrightness(brightness: number): void;
  public _fragmentSrc(): string;

  public blendColor: ColorTone;
  public brightness: number;
  public colorTone: ColorTone;
  public hue: number;
}
