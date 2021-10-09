import * as PIXI from "pixi.js";
import { Sprite, Stage, Window } from "..";

export declare class Scene_Base extends Stage {
  constructor();
  public create(): void;
  public isActive(): boolean;
  public isReady(): boolean;
  public start(): void;
  public update(): void;
  public stop(): void;
  public isStarted(): boolean;
  public isBusy(): boolean;
  public isFading(): boolean;
  public terminate(): void;
  public createWindowLayer(): void;
  public addWindow(window: Window): void;
  public startFadeIn(duration: number, white: boolean): void;
  public startFadeOut(duration: number, white: boolean): void;
  public createColorFilter(): void;
  public updateColorFilter(): void;
  public updateFade(): void;
  public updateChildren(): void;
  public popScene(): void;
  public checkGameover(): void;
  public fadeOutAll(): void;
  public fadeSpeed(): number;
  public slowFadeSpeed(): number;
  public scaleSprite(sprite: Sprite): void;
  public centerSprite(sprite: Sprite): void;
  public isBottomHelpMode(): boolean;
  public isBottomButtonMode(): boolean;
  public isRightInputMode(): boolean;
  public mainCommandWidth(): number;
  public buttonAreaTop(): number;
  public buttonAreaBottom(): number;
  public buttonAreaHeight(): number;
  public buttonY(): number;
  public calcWindowHeight(numLines: number, selectable: boolean): number;
  public requestAutosave(): void;
  public isAutosaveEnabled(): boolean;
  public executeAutosave(): void;
  public onAutosaveSuccess(): void;
  public onAutosaveFailure(): void;

  public _active: boolean;
  public _fadeDuration: number;
  public _fadeOpacity: number;
  public _fadeSign: number;
  public _fadeWhite: number;
  public _started: boolean;
  public filters: PIXI.Filter[];
}
