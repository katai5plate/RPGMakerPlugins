import * as PIXI from "pixi.js";
import { ColorTone, Animation } from "../data";

export declare class Sprite_Animation extends Sprite {
  constructor();
  public initMembers(): void;
  public update(): void;
  public canStart(): boolean;
  public shouldWaitForPrevious(): boolean;
  public updateEffectGeometry(): void;
  public updateMain(): void;
  public processSoundTimings(): void;
  public processFlashTimings(): void;
  public checkEnd(): void;
  public updateFlash(): void;
  public isPlaying(): boolean;
  public setRotation(x: number, y: number, z: number): void;
  public _render(renderer: unknown): void; // FIXME: renderer は Effekseer関係？
  public setProjectionMatrix(renderer: unknown): void; // FIXME: renderer は Effekseer関係？
  public setCameraMatrix(): void;
  public setViewport(renderer: unknown): void; // FIXME: renderer は Effekseer関係？
  public targetPosition(renderer: unknown): PIXI.Point; // FIXME: renderer は Effekseer関係？
  public targetSpritePosition(sprite: unknown): PIXI.Point; // FIXME: renderer は Effekseer関係？
  public saveViewport(renderer: unknown): void; // FIXME: renderer は Effekseer関係？
  public resetViewport(renderer: unknown): void; // FIXME: renderer は Effekseer関係？
  public onBeforeRender(renderer: unknown): void; // FIXME: renderer は Effekseer関係？
  public onAfterRender(renderer: unknown): void; // FIXME: renderer は Effekseer関係？

  public _animation: Animation;
  public _delay: number;
  public _effect: unknown; // FIXME: EffectManager.load(animation.effectName);
  public _flashColor: ColorTone;
  public _flashDuration: number;
  public _frameIndex: number;
  public _handle: unknown; // FIXME: Graphics.effekseer.play(this._effect);
  public _maxTimingFrames: number;
  public _mirror: boolean;
  public _originalViewport: unknown; // FIXME: renderer.gl.getParameter(renderer.gl.VIEWPORT);
  public _playing: boolean;
  public _previous: Animation;
  public _started: boolean;
  public _targets: unknown[]; // FIXME: target は戦闘アニメ対象？
  public _viewportSize: number;
  public z: number;
}
