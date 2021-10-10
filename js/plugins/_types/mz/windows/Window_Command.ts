import * as PIXI from "pixi.js";
import { CommandExt, CommandListElement, MZSynbol } from "../other";
import { Window_Selectable } from "..";

export declare class Window_Command extends Window_Selectable {
  constructor(rect: PIXI.Rectangle);
  public clearCommandList(): void;
  public addCommand(
    name: string,
    symbol: MZSynbol,
    enabled: boolean,
    ext: CommandExt
  ): void;
  public makeCommandList(): void;
  public commandName(index: number): string;
  public commandSymbol(index: number): MZSynbol;
  public isCommandEnabled(index: number): boolean;
  public currentData(): CommandListElement | null;
  public currentSymbol(): MZSynbol;
  public currentExt(): CommandExt;
  public findSymbol(symbol: MZSynbol): number;
  public selectSymbol(symbol: MZSynbol): void;
  public findExt(ext: CommandExt): void;
  public selectExt(ext: CommandExt): void;
  public itemTextAlign(): CanvasTextAlign;
  public callOkHandler(): void;
  public refresh(): void;

  public _list: CommandListElement[];
}
