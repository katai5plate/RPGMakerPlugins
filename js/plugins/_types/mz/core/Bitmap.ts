import * as PIXI from "pixi.js";
import { LoadEventListener } from "../other";
import { Stage } from "..";

export declare class Bitmap {
  constructor(width: number, height: number);
  static load(url: string): Bitmap;
  static snap(stage: Stage): Bitmap;
  public isReady(): boolean;
  public isError(): boolean;
  public destroy(): void;
  public resize(width: number, height: number): void;
  public blt(
    source: Bitmap,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void;
  public getPixel(x: number, y: number): string;
  public getAlphaPixel(x: number, y: number): string;
  public clearRect(x: number, y: number, width: number, height: number): void;
  public clear(): void;
  public fillRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void;
  public fillAll(color: string): void;
  public strokeRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void;
  public drawCircle(x: number, y: number, radius: number, color: string): void;
  public drawText(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: CanvasTextAlign
  ): void;
  public measureTextWidth(text: string): number;
  public addLoadListener(listner: (that: Bitmap) => void): void;
  public retry(): void;
  public _makeFontNameText(): string;
  public _drawTextOutline(
    text: string,
    tx: number,
    ty: number,
    maxWidth: number
  ): void;
  public _drawTextBody(
    text: string,
    tx: number,
    ty: number,
    maxWidth: number
  ): void;
  public _createCanvas(width: number, height: number): void;
  public _ensureCanvas(): void;
  public _destroyCanvas(): void;
  public _createBaseTexture(source: PIXI.Resource): void;
  public _updateScaleMode(): void;
  public _startLoading(): void;
  public _startDecrypting(): void;
  public _onXhrLoad(xhr: XMLHttpRequest): void;
  public _onLoad(): void;
  public _callLoadListeners(): void;
  public _onError(): void;

  public readonly url: string;
  public readonly baseTexture: PIXI.BaseTexture;
  public readonly image: HTMLImageElement;
  public readonly canvas: HTMLCanvasElement;
  public readonly context: CanvasRenderingContext2D;
  public readonly width: number;
  public readonly height: number;
  public readonly rect: PIXI.Rectangle;
  public get smooth(): boolean;
  public set smooth(value: boolean);
  public get paintOpacity(): number;
  public set paintOpacity(value: number);

  public _baseTexture: PIXI.BaseTexture;
  public _canvas: HTMLCanvasElement;
  public _context: CanvasRenderingContext2D;
  public _image: HTMLImageElement;
  public _loadingState: "error" | "loaded" | "loading" | "none";
  public _loadListeners: LoadEventListener[];
  public _paintOpacity: number;
  public _smooth: boolean;
  public _url: string;
  public fontBold: boolean;
  public fontFace: string;
  public fontItalic: boolean;
  public fontSize: number;
  public globalCompositeOperation: string;
  public mipmap: boolean;
  public outlineWidth: number;
  public scaleMode: PIXI.SCALE_MODES;
  public src: string;
  public textColor: string;
}
