import { Game_Picture } from "..";
import { BlendColor, ColorTone } from "../other";

export declare class Game_Screen {
  constructor();
  public clear(): unknown;
  public onBattleStart(): unknown;
  public brightness(): number;
  public tone(): ColorTone;
  public flashColor(): BlendColor;
  public shake(): number;
  public zoomX(): number;
  public zoomY(): number;
  public zoomScale(): number;
  public weatherType(): number;
  public weatherPower(): number;
  public picture(pictureId: number): Game_Picture;
  public realPictureId(pictureId: number): number;
  public clearFade(): void;
  public clearTone(): void;
  public clearFlash(): void;
  public clearShake(): void;
  public clearZoom(): void;
  public clearWeather(): void;
  public clearPictures(): void;
  public eraseBattlePictures(): void;
  public maxPictures(): number;
  public startFadeOut(duration: number): void;
  public startFadeIn(duration: number): void;
  public startTint(tone: ColorTone, duration: number): void;
  public startFlash(color: BlendColor, duration: number): void;
  public startShake(power: number, speed: number, duration: number): void;
  public startZoom(x: number, y: number, scale: number, duration: number): void;
  public setZoom(x: number, y: number, scale: number): void;
  public changeWeather(
    type: unknown,
    power: unknown,
    duration: unknown
  ): unknown;
  public update(): void;
  public updateFadeOut(): void;
  public updateFadeIn(): void;
  public updateTone(): void;
  public updateFlash(): void;
  public updateShake(): void;
  public updateZoom(): void;
  public updateWeather(): void;
  public updatePictures(): void;
  public startFlashForDamage(): void;
  public showPicture(
    pictureId: number,
    name: string,
    origin: number,
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    opacity: number,
    blendMode: number
  ): void;
  public movePicture(
    pictureId: number,
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
  public rotatePicture(pictureId: number, speed: number): void;
  public tintPicture(
    pictureId: number,
    tone: ColorTone,
    duration: number
  ): void;
  public erasePicture(pictureId: number): void;

  public _brightness: number;
  public _fadeInDuration: number;
  public _fadeOutDuration: number;
  public _flashColor: BlendColor;
  public _flashDuration: number;
  public _pictures: Game_Picture[];
  public _shake: number;
  public _shakeDirection: number;
  public _shakeDuration: number;
  public _shakePower: number;
  public _shakeSpeed: number;
  public _tone: ColorTone;
  public _toneDuration: number;
  public _toneTarget: ColorTone;
  public _weatherDuration: number;
  public _weatherPower: number;
  public _weatherPowerTarget: number;
  public _weatherType: string;
  public _zoomDuration: number;
  public _zoomScale: number;
  public _zoomScaleTarget: number;
  public _zoomX: number;
  public _zoomY: number;
}
