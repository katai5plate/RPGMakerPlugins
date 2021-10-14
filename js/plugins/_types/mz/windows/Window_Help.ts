import * as PIXI from "pixi.js";
import { Item } from "../data";
import { Window_Base } from "..";

export declare class Window_Help extends Window_Base {
  constructor(rect: PIXI.Rectangle);
  public setText(text: string): void;
  public clear(): void;
  public setItem(item: Item): void;
  public refresh(): void;

  public _text: string;
}
