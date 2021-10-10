import { Sprite } from "..";

export declare class Sprite_Balloon extends Sprite {
  constructor();
  public initMembers(): void;
  public loadBitmap(): void;
  public setup(targetSprite: unknown, balloonId: number): void; // FIXME: target は敵キャラも含む？
  public update(): void;
  public updatePosition(): void;
  public updateFrame(): void;
  public speed(): number;
  public waitTime(): number;
  public frameIndex(): number;
  public isPlaying(): boolean;

  public _balloonId: number;
  public _duration: number;
  public _target: unknown; // FIXME: target は敵キャラも含む？
  public z: number;
}
