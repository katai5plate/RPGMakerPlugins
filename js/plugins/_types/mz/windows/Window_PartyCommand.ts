import * as PIXI from "pixi.js";
import { Window_Command } from "..";

export declare class Window_PartyCommand extends Window_Command {
  constructor(rect: PIXI.Rectangle);
  public makeCommandList(): void;
  public setup(): void;
}
