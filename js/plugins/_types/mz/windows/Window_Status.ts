import * as PIXI from "pixi.js";
import { Game_Actor } from "..";

export declare class Window_Status extends Window_StatusBase {
  constructor(rect: PIXI.Rectangle);
  public setActor(actor: Game_Actor): void;
  public refresh(): void;
  public drawBlock1(): void;
  public block1Y(): number;
  public drawBlock2(): void;
  public block2Y(): number;
  public drawBasicInfo(x: number, y: number): void;
  public drawExpInfo(x: number, y: number): void;
  public expTotalValue(): string;
  public expNextValue(): string;

  public _actor: Game_Actor;
}
