import * as PIXI from "pixi.js";
import { Sprite, Sprite_Animation } from "..";
import { Animation } from "../other";

export declare class Spriteset_Base extends Sprite {
  constructor();
  public loadSystemImages(): void;
  public createLowerLayer(): void;
  public createUpperLayer(): void;
  public update(): void;
  public createBaseSprite(): void;
  public createBaseFilters(): void;
  public createPictures(): void;
  public pictureContainerRect(): PIXI.Rectangle;
  public createTimer(): void;
  public createOverallFilters(): void;
  public updateBaseFilters(): void;
  public updateOverallFilters(): void;
  public updatePosition(): void;
  public findTargetSprite(): null;
  public updateAnimations(): void;
  public processAnimationRequests(): void;
  public createAnimation(request: unknown): void;
  public isMVAnimation(animation: Animation): boolean;
  public makeTargetSprites(targets: unknown): Sprite; // target は戦闘アニメ対象？
  public lastAnimationSprite(): Sprite_Animation;
  public isAnimationForEach(animation: Animation): boolean;
  public animationBaseDelay(): number;
  public animationNextDelay(): number;
  public animationShouldMirror(target: unknown): boolean; // target は戦闘アニメ対象？
  public removeAnimation(sprite: unknown): void;
  public removeAllAnimations(): void;
  public isAnimationPlaying(): boolean;

  public _animationSprites: Sprite_Animation[];
  public filters: PIXI.Filter[];
}
