import { Bitmap } from "..";
import { ImageCache } from "../other";
export declare class ImageManager {
  static loadAnimation(filename: string): Bitmap;
  static loadBattleback1(filename: string): Bitmap;
  static loadBattleback2(filename: string): Bitmap;
  static loadEnemy(filename: string): Bitmap;
  static loadCharacter(filename: string): Bitmap;
  static loadFace(filename: string): Bitmap;
  static loadParallax(filename: string): Bitmap;
  static loadPicture(filename: string): Bitmap;
  static loadSvActor(filename: string): Bitmap;
  static loadSvEnemy(filename: string): Bitmap;
  static loadSystem(filename: string): Bitmap;
  static loadTileset(filename: string): Bitmap;
  static loadTitle1(filename: string): Bitmap;
  static loadTitle2(filename: string): Bitmap;
  static loadBitmap(folder: string, filename: string): Bitmap;
  static loadBitmapFromUrl(url: string): Bitmap;
  static clear(): void;
  static isReady(): boolean;
  static throwLoadError(bitmap: Bitmap): void;
  static isObjectCharacter(filename: string): boolean;
  static isBigCharacter(filename: string): boolean;
  static isZeroParallax(filename: string): boolean;

  static _cache: ImageCache;
  static _system: ImageCache;
  static faceHeight: number;
  static faceWidth: number;
  static iconHeight: number;
  static iconWidth: number;
}
