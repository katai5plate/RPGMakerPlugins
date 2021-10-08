import { ColorTone } from "../other";

export declare class Game_Picture {
  constructor();
  public name(): string;
  public origin(): number;
  public x(): number;
  public y(): number;
  public scaleX(): number;
  public scaleY(): number;
  public opacity(): number;
  public blendMode(): number;
  public tone(): ColorTone;
  public angle(): number;
  public initBasic(): void;
  public initTarget(): void;
  public initTone(): void;
  public initRotation(): void;
  public show(
    name: string,
    origin: number,
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    opacity: number,
    blendMode: number
  ): void;
  public move(
    origin: number,
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    opacity: number,
    blendMode: number,
    duration: number,
    easingType: number
  ): void;
  public rotate(speed: number): void;
  public tint(tone: ColorTone, duration: number): void;
  public update(): void;
  public updateMove(): void;
  public updateTone(): void;
  public updateRotation(): void;
  public applyEasing(current: number, target: number): number;
  public calcEasing(t: number): number;
  public easeIn(t: number, exponent: number): number;
  public easeOut(t: number, exponent: number): number;
  public easeInOut(t: number, exponent: number): number;

  public _angle: number;
  public _blendMode: number;
  public _duration: number;
  public _easingExponent: number;
  public _easingType: number;
  public _name: string;
  public _opacity: number;
  public _origin: number;
  public _rotationSpeed: number;
  public _scaleX: number;
  public _scaleY: number;
  public _targetOpacity: number;
  public _targetScaleX: number;
  public _targetScaleY: number;
  public _targetX: number;
  public _targetY: number;
  public _tone: ColorTone;
  public _toneDuration: number;
  public _toneTarget: ColorTone;
  public _wholeDuration: number;
  public _x: number;
  public _y: number;
}
