import * as PIXI from "pixi.js";

// extension.js
declare interface CanvasRenderingContext2D {
  /**
   * 文字列のサイズを調べる
   * @param text 文字列
   * @returns サイズ
   */
  getTextSize(text: string): { width: number; height: number };
  /**
   * 動的表示ログ
   * @param value 値
   * @param x 座標
   * @param y 座標
   */
  log(value: any, x: number, y: number): void;
  /**
   * シンプル直線
   * @param ax 座標
   * @param ay 座標
   * @param bx 座標
   * @param by 座標
   */
  line(ax: number, ay: number, bx: number, by: number): void;
}
