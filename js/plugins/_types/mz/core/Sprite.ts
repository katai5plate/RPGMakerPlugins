import * as PIXI from "pixi.js";
import { BlendColor, ColorTone } from "../other";
import { Bitmap, ColorFilter } from "..";

export declare class Sprite extends PIXI.Sprite {
  constructor(bitmap?: Bitmap);
  public destroy(): void;
  public update(): void;
  public hide(): void;
  public show(): void;
  public updateVisibility(): void;
  public move(x: number, y: number): void;
  public setFrame(x: number, y: number, width: number, height: number): void;
  public setHue(hue: number): void;
  public getBlendColor(): void;
  public setBlendColor(color: BlendColor): void;
  public getColorTone(): ColorTone;
  public setColorTone(tone: ColorTone): void;
  public _onBitmapChange(): void;
  public _onBitmapLoad(bitmapLoaded: Bitmap): void;
  public _refresh(): void;
  public _createColorFilter(): void;
  public _updateColorFilter(): void;

  public get bitmap(): Bitmap;
  public set bitmap(value: Bitmap);
  public get opacity(): number;
  public set opacity(value: number);

  public _bitmap: Bitmap;
  public _blendColor: BlendColor;
  public _blendMode: PIXI.BLEND_MODES;
  public _colorFilter: ColorFilter;
  public _colorTone: ColorTone;
  public _frame: PIXI.Rectangle;
  public _hidden: boolean;
  public _hue: number;
  public _refreshFrame: boolean;
  public filters: PIXI.Filter[];
  public spriteId: number;
  public visible: boolean;
  static _counter: number;
  static _emptyBaseTexture: PIXI.BaseTexture;
}
