import * as PIXI from "pixi.js";
import { Bitmap, Sprite } from "..";

export declare class Window extends PIXI.Container {
  constructor();
  public destroy(): unknown;
  public update(): unknown;
  public move(x: number, y: number, width: number, height: number): void;
  public isOpen(): boolean;
  public isClosed(): boolean;
  public setCursorRect(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  public moveCursorBy(x: number, y: number): void;
  public moveInnerChildrenBy(x: number, y: number): void;
  public setTone(r: number, g: number, b: number): void;
  public addChildToBack(child: PIXI.DisplayObject): PIXI.DisplayObject;
  public addInnerChild(child: PIXI.DisplayObject): PIXI.DisplayObject;
  public updateTransform(): void;
  public drawShape(graphics: PIXI.Graphics): void;
  public _createAllParts(): void;
  public _createContainer(): void;
  public _createBackSprite(): void;
  public _createFrameSprite(): void;
  public _createClientArea(): void;
  public _createContentsBackSprite(): void;
  public _createCursorSprite(): void;
  public _createContentsSprite(): void;
  public _createArrowSprites(): void;
  public _createPauseSignSprites(): void;
  public _onWindowskinLoad(): void;
  public _refreshAllParts(): void;
  public _refreshBack(): void;
  public _refreshFrame(): void;
  public _refreshCursor(): void;
  public _setRectPartsGeometry(
    sprite: Sprite,
    srect: PIXI.Rectangle,
    drect: PIXI.Rectangle,
    m: number
  ): void;
  public _refreshArrows(): void;
  public _refreshPauseSign(): void;
  public _updateClientArea(): void;
  public _updateFrame(): void;
  public _updateContentsBack(): void;
  public _updateCursor(): void;
  public _makeCursorAlpha(): number;
  public _updateContents(): void;
  public _updateArrows(): void;
  public _updatePauseSign(): void;
  public _updateFilterArea(): void;

  public get windowskin(): Bitmap;
  public set windowskin(value: Bitmap);
  public get contents(): Bitmap;
  public set contents(value: Bitmap);
  public get contentsBack(): Bitmap;
  public set contentsBack(value: Bitmap);
  public get padding(): number;
  public set padding(value: number);
  public get margin(): number;
  public set margin(value: number);
  public get opacity(): number;
  public set opacity(value: number);
  public get backOpacity(): number;
  public set backOpacity(value: number);
  public get contentsOpacity(): number;
  public set contentsOpacity(value: number);
  public get openness(): number;
  public set openness(value: number);
  public readonly innerWidth: number;
  public readonly innerHeight: number;
  public readonly innerRect: PIXI.Rectangle;

  public _animationCount: number;
  public _backSprite: Sprite;
  public visible: boolean;
  public _container: PIXI.Container;
  public _contentsBackSprite: Sprite;
  public bitmap: Bitmap;
  public _contentsSprite: Sprite;
  public _cursorSprite: Sprite;
  public alpha: number;
  public _downArrowSprite: Sprite;
  public _frameSprite: Sprite;
  public _height: number;
  public _innerChildren: Window[];
  public _isWindow: boolean;
  public _margin: number;
  public _openness: number;
  public _padding: number;
  public _pauseSignSprite: Sprite;
  public _upArrowSprite: Sprite;
  public _width: number;
  public _windowskin: Bitmap;
  public active: boolean;
  public cursorVisible: boolean;
  public downArrowVisible: boolean;
  public frameVisible: boolean;
  public pause: boolean;
  public upArrowVisible: boolean;
}
