import { Game_Picture } from "../objects/Game_Picture";
import { Sprite_Clickable } from "./Sprite_Clickable";

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
