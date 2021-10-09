import * as PIXI from "pixi.js";
import { Scene_Base } from "..";

export declare class Scene_Message extends Scene_Base {
  constructor();
  public isMessageWindowClosing(): boolean;
  public createAllWindows(): void;
  public createMessageWindow(): void;
  public messageWindowRect(): PIXI.Rectangle;
  public createScrollTextWindow(): void;
  public scrollTextWindowRect(): PIXI.Rectangle;
  public createGoldWindow(): void;
  public goldWindowRect(): PIXI.Rectangle;
  public createNameBoxWindow(): void;
  public createChoiceListWindow(): void;
  public createNumberInputWindow(): void;
  public createEventItemWindow(): void;
  public eventItemWindowRect(): PIXI.Rectangle;
  public associateWindows(): void;

  public openness: number;
}
