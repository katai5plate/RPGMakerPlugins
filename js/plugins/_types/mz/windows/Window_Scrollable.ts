import * as PIXI from "pixi.js";
import { Window_Base } from "..";

export declare class Window_Scrollable extends Window_Base {
  constructor(rect: PIXI.Rectangle);
  public clearScrollStatus(): void;
  public scrollX(): number;
  public scrollY(): number;
  public scrollBaseX(): number;
  public scrollBaseY(): number;
  public scrollTo(x: number, y: number): void;
  public scrollBy(x: number, y: number): void;
  public smoothScrollTo(x: number, y: number): void;
  public smoothScrollBy(x: number, y: number): void;
  public setScrollAccel(x: number, y: number): void;
  public overallWidth(): number;
  public overallHeight(): number;
  public maxScrollX(): number;
  public maxScrollY(): number;
  public scrollBlockWidth(): number;
  public scrollBlockHeight(): number;
  public smoothScrollDown(n: number): void;
  public smoothScrollUp(n: number): void;
  public update(): void;
  public processWheelScroll(): void;
  public processTouchScroll(): void;
  public isWheelScrollEnabled(): boolean;
  public isTouchScrollEnabled(): boolean;
  public isScrollEnabled(): boolean;
  public isTouchedInsideFrame(): boolean;
  public onTouchScrollStart(): void;
  public onTouchScroll(): void;
  public onTouchScrollEnd(): void;
  public updateSmoothScroll(): void;
  public updateScrollAccel(): void;
  public updateArrows(): void;
  public updateOrigin(): void;
  public updateScrollBase(baseX: number, baseY: number): void;
  public paint(): void;

  public _scrollAccelX: number;
  public _scrollAccelY: number;
  public _scrollBaseX: number;
  public _scrollBaseY: number;
  public _scrollDuration: number;
  public _scrollLastCursorVisible: boolean;
  public _scrollLastTouchX: number;
  public _scrollLastTouchY: number;
  public _scrollTargetX: number;
  public _scrollTargetY: number;
  public _scrollTouching: boolean;
  public _scrollX: number;
  public _scrollY: number;
  public cursorVisible: boolean;
}
