import { CommonEvent, EventList } from "../data";
import { Game_Interpreter } from "./Game_Interpreter";

export declare class Game_CommonEvent {
  constructor(commonEventId: number);
  public event(): CommonEvent;
  public list(): EventList;
  public refresh(): void;
  public isActive(): boolean;
  public update(): void;

  public _commonEventId: number;
  public _interpreter: Game_Interpreter;
}
