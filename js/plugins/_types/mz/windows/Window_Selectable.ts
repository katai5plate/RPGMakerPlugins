import * as PIXI from "pixi.js";
import { Item, MZSynbol } from "../other";
import { Window_Help, Window_Scrollable } from "..";

export declare class Window_Selectable extends Window_Scrollable {
  constructor(rect: PIXI.Rectangle);
  public index(): number;
  public cursorFixed(): boolean;
  public setCursorFixed(cursorFixed: boolean): void;
  public cursorAll(): boolean;
  public setCursorAll(cursorAll: boolean): void;
  public maxCols(): number;
  public maxItems(): number;
  public colSpacing(): number;
  public rowSpacing(): number;
  public itemWidth(): number;
  public itemHeight(): number;
  public contentsHeight(): number;
  public maxRows(): number;
  public overallHeight(): number;
  public activate(): void;
  public deactivate(): void;
  public select(index: number): void;
  public forceSelect(index: number): void;
  public smoothSelect(index: number): void;
  public deselect(): void;
  public reselect(): void;
  public row(): number;
  public topRow(): number;
  public maxTopRow(): number;
  public setTopRow(row: number): void;
  public maxPageRows(): number;
  public maxPageItems(): number;
  public maxVisibleItems(): void;
  public isHorizontal(): boolean;
  public topIndex(): number;
  public itemRect(index: number): PIXI.Rectangle;
  public itemRectWithPadding(index: number): PIXI.Rectangle;
  public itemLineRect(index: number): PIXI.Rectangle;
  public setHelpWindow(helpWindow: Window_Help): void;
  public showHelpWindow(): void;
  public hideHelpWindow(): void;
  public setHandler(symbol: MZSynbol, method: () => void): void;
  public isHandled(symbol: MZSynbol): boolean;
  public callHandler(symbol: MZSynbol): void;
  public isOpenAndActive(): boolean;
  public isCursorMovable(): boolean;
  public cursorDown(wrap: boolean): void;
  public cursorUp(wrap: boolean): void;
  public cursorRight(wrap: boolean): void;
  public cursorLeft(wrap: boolean): void;
  public cursorPagedown(): void;
  public cursorPageup(): void;
  public isScrollEnabled(): boolean;
  public update(): void;
  public processCursorMove(): void;
  public processHandling(): void;
  public processTouch(): void;
  public isHoverEnabled(): boolean;
  public onTouchSelect(trigger: boolean): void;
  public onTouchOk(): void;
  public onTouchCancel(): void;
  public hitIndex(): number;
  public hitTest(x: number, y: number): number;
  public isTouchOkEnabled(): boolean;
  public isOkEnabled(): boolean;
  public isCancelEnabled(): boolean;
  public isOkTriggered(): boolean;
  public isCancelTriggered(): boolean;
  public processOk(): void;
  public callOkHandler(): void;
  public processCancel(): void;
  public callCancelHandler(): void;
  public processPageup(): void;
  public processPagedown(): void;
  public updateInputData(): void;
  public ensureCursorVisible(smooth: boolean): void;
  public callUpdateHelp(): void;
  public updateHelp(): void;
  public setHelpWindowItem(item: Item): void;
  public isCurrentItemEnabled(): boolean;
  public drawAllItems(): void;
  public drawItem(): void;
  public clearItem(index: number): void;
  public drawItemBackground(index: number): void;
  public drawBackgroundRect(rect: PIXI.Rectangle): void;
  public redrawItem(index: number): void;
  public redrawCurrentItem(): void;
  public refresh(): void;
  public paint(): void;
  public refreshCursor(): void;
  public refreshCursorForAll(): void;

  public _canRepeat: boolean;
  public _cursorAll: boolean;
  public _cursorFixed: boolean;
  public _doubleTouch: boolean;
  public _handlers: { [S in MZSynbol]: () => void };
  public _helpWindow: Window_Help;
  public _index: number;
  public cursorVisible: boolean;
}