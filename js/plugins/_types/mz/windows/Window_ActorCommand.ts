import * as PIXI from "pixi.js";
import { Game_Actor, Window_Command } from "..";

export declare class Window_ActorCommand extends Window_Command {
  constructor(rect: PIXI.Rectangle);
  public makeCommandList(): void;
  public addAttackCommand(): void;
  public addSkillCommands(): void;
  public addGuardCommand(): void;
  public addItemCommand(): void;
  public setup(actor: Game_Actor): void;
  public actor(): Game_Actor;
  public processOk(): void;
  public selectLast(): void;

  public _actor: Game_Actor;
}
