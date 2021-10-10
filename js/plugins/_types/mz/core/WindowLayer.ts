import * as PIXI from "pixi.js";
import { Window } from "..";

export declare class WindowLayer extends PIXI.Container {
  constructor();
  public onRemoveAsAChild(): void;
  public move(x: number, y: number, width: number, height: number): void;
  public update(): void;
  public renderCanvas(renderer: unknown): void; // FIXME: renderer
  public _canvasClearWindowRect(renderSession: unknown, window: Window): void; // FIXME: renderSession: Object
  public renderWebGL(renderer: unknown): void; // FIXME: renderer
  public _maskWindow(window: Window, shift: PIXI.Point): void;

  public _height: number;
  public _renderSprite: unknown; //  null;
  public _tempCanvas: HTMLCanvasElement;
  public _width: number;
  public _windowMask: PIXI.Graphics;
  public boundsDirty: boolean;
  public _windowRect: PIXI.Rectangle;
  public filters: PIXI.Filter[];
}
