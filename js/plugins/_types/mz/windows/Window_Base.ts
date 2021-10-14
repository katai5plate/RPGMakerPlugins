import * as PIXI from "pixi.js";
import { Sprite, Window } from "..";
import { Item } from "../data";
import { TextState } from "../other";

export declare class Window_Base extends Window {
  constructor(rect: PIXI.Rectangle);
  public checkRectObject(rect: unknown): void;
  public lineHeight(): number;
  public itemWidth(): number;
  public itemHeight(): number;
  public itemPadding(): number;
  public baseTextRect(): PIXI.Rectangle;
  public loadWindowskin(): void;
  public updatePadding(): void;
  public updateBackOpacity(): void;
  public fittingHeight(numLines: number): number;
  public updateTone(): void;
  public createContents(): void;
  public destroyContents(): void;
  public contentsWidth(): number;
  public contentsHeight(): number;
  public resetFontSettings(): void;
  public resetTextColor(): void;
  public update(): void;
  public updateOpen(): void;
  public updateClose(): void;
  public open(): void;
  public close(): void;
  public isOpening(): boolean;
  public isClosing(): boolean;
  public show(): void;
  public hide(): void;
  public activate(): void;
  public deactivate(): void;
  public systemColor(): string;
  public translucentOpacity(): number;
  public changeTextColor(color: string): void;
  public changeOutlineColor(color: string): void;
  public changePaintOpacity(enabled: boolean): void;
  public drawRect(x: number, y: number, width: number, height: number): void;
  public drawText(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    align: CanvasTextAlign
  ): void;
  public textWidth(text: string): number;
  public drawTextEx(text: string, x: number, y: number, width: number): number;
  public textSizeEx(text: string): { width: number; height: number };
  public createTextState(
    text: string,
    x: number,
    y: number,
    width: number
  ): TextState;
  public processAllText(textState: TextState): void;
  public flushTextState(textState: TextState): void;
  public createTextBuffer(rtl: boolean): string;
  public convertEscapeCharacters(text: string): string;
  public actorName(n: number): string;
  public partyMemberName(n: number): string;
  public processCharacter(textState: TextState): void;
  public processControlCharacter(textState: TextState, c: unknown): void;
  public processNewLine(textState: TextState): void;
  public obtainEscapeCode(textState: TextState): string;
  public obtainEscapeParam(textState: TextState): string;
  public processEscapeCharacter(code: string, textState: TextState): void;
  public processColorChange(colorIndex: number): void;
  public processDrawIcon(iconIndex: number, textState: TextState): void;
  public makeFontBigger(): void;
  public makeFontSmaller(): void;
  public calcTextHeight(textState: TextState): number;
  public maxFontSizeInLine(line: string): number;
  public drawIcon(iconIndex: number, x: number, y: number): void;
  public drawItemName(item: Item, x: number, y: number, width: number): void;
  public drawCurrencyValue(
    value: number,
    unit: string,
    x: number,
    y: number,
    width: number
  ): void;
  public setBackgroundType(type: number): void;
  public showBackgroundDimmer(): void;
  public createDimmerSprite(): void;
  public hideBackgroundDimmer(): void;
  public updateBackgroundDimmer(): void;
  public refreshDimmerBitmap(): void;
  public playCursorSound(): void;
  public playOkSound(): void;
  public playBuzzerSound(): void;

  public _closing: boolean;
  public _dimmerSprite: Sprite;
  public visible: boolean;
  public _opening: boolean;
  public active: boolean;
  public fontFace: string;
  public fontSize: number;
  public outlineColor: string;
  public textColor: string;
}
