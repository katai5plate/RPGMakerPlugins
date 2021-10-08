import { Sprite } from "../core/Sprite";

export declare class Sprite_Clickable extends Sprite {
  constructor();
  public update(): void;
  public processTouch(): void;
  public isPressed(): void;
  public isClickEnabled(): void;
  public isBeingTouched(): void;
  public hitTest(x: number, y: number): void;
  public onMouseEnter(): void;
  public onMouseExit(): void;
  public onPress(): void;
  public onClick(): void;

  public _hovered: boolean;
  public _pressed: boolean;
}
