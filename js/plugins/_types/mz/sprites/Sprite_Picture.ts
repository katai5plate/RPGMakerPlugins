import { Game_Picture, Sprite_Clickable } from "..";

export declare class Sprite_Picture extends Sprite_Clickable {
  constructor(pictureId: number);
  public picture(): Game_Picture;
  public update(): void;
  public updateBitmap(): void;
  public updateOrigin(): void;
  public updatePosition(): void;
  public updateScale(): void;
  public updateTone(): void;
  public updateOther(): void;
  public loadBitmap(): void;

  public _pictureId: number;
  public _pictureName: string;
}
