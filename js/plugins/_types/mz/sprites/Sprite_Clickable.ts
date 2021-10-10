import { Sprite } from "..";

export declare class Sprite_Clickable extends Sprite {
  constructor();
  public update(): void;
  public processTouch(): void;
  public isPressed(): boolean;
  public isClickEnabled(): boolean;
  public isBeingTouched(): boolean;
  public hitTest(x: number, y: number): boolean;
  public onMouseEnter(): void;
  public onMouseExit(): void;
  public onPress(): void;
  public onClick(): void;

  public _hovered: boolean;
  public _pressed: boolean;
}
