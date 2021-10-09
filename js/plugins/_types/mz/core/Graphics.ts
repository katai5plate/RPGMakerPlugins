import * as PIXI from "pixi.js";
import { Stage } from "..";
import { TickHandler } from "../other";

export declare class Graphics {
  constructor();
  static setTickHandler(handler: TickHandler): void;
  static startGameLoop(): void;
  static stopGameLoop(): void;
  static setStage(stage: Stage): void;
  static startLoading(): void;
  static endLoading(): boolean;
  static printError(name: string, message: string, error: Error): void;
  static showRetryButton(retry: () => void): void;
  static eraseError(): void;
  static pageToCanvasX(x: number): number;
  static pageToCanvasY(y: number): number;
  static isInsideCanvas(x: number, y: number): boolean;
  static showScreen(): void;
  static hideScreen(): void;
  static resize(width: number, height: number): void;
  static _createAllElements(): void;
  static _updateAllElements(): void;
  static _onTick(deltaTime: number): void;
  static _canRender(): boolean;
  static _updateRealScale(): void;
  static _stretchWidth(): number;
  static _stretchHeight(): number;
  static _makeErrorHtml(name: string, message: string): string;
  static _defaultStretchMode(): boolean;
  static _createErrorPrinter(): void;
  static _updateErrorPrinter(): void;
  static _createCanvas(): void;
  static _updateCanvas(): void;
  static _updateVideo(): void;
  static _createLoadingSpinner(): void;
  static _createFPSCounter(): void;
  static _centerElement(element: HTMLCanvasElement): void;
  static _disableContextMenu(): void;
  static _applyCanvasFilter(): void;
  static _clearCanvasFilter(): void;
  static _setupEventHandlers(): void;
  static _onWindowResize(): void;
  static _onKeyDown(event: KeyboardEvent): void;
  static _switchFPSCounter(): void;
  static _switchStretchMode(): void;
  static _switchFullScreen(): void;
  static _isFullScreen(): boolean;
  static _requestFullScreen(): void;
  static _cancelFullScreen(): void;
  static _createPixiApp(): void;
  static _setupPixi(): void;
  static _createEffekseerContext(): void;

  static readonly app: PIXI.Application;
  static readonly effekseer: unknown; //  effekseer
  static get width(): number;
  static set width(value: number);
  static get height(): number;
  static set height(value: number);
  static get defaultScale(): number;
  static set defaultScale(value: number);

  static _app: PIXI.Application;
  static stage: Stage;
  static _canvas: HTMLCanvasElement;
  static id: string;
  static filter: string;
  static opacity: number;
  static webkitFilter: string;
  static zIndex: number;
  static _defaultScale: number;
  static _effekseer: unknown; //  effekseer.createContext();
  static _errorPrinter: HTMLDivElement;
  static innerHTML: string;
  static _fpsCounter: FPSCounter;
  static _height: number;
  static _loadingSpinner: HTMLDivElement;
  static _realScale: number;
  static _stretchEnabled: boolean;
  static _tickHandler: TickHandler;
  static _wasLoading: boolean;
  static _width: number;
  static boxHeight: number;
  static boxWidth: number;
  static frameCount: number;
}

declare class FPSCounter {
  constructor();
  public startTick(): void;
  public endTick(): void;
  public switchMode(): void;
  public _createElements(): void;
  public _update(): void;

  public _boxDiv: HTMLDivElement; //  document.createElement("div");
  public id: string;
  public display: "block" | "none";
  public _frameStart: number;
  public _frameTime: number;
  public _labelDiv: HTMLDivElement;
  public _lastLoop: number;
  public _numberDiv: HTMLDivElement;
  public _showFps: boolean;
  public _tickCount: number;
  public duration: number;
  public fps: number;
}
