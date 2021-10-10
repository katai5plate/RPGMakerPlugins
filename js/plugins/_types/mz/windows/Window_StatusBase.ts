import * as PIXI from "pixi.js";
import { StatusType } from "../other";
import { Sprite, Game_Actor, Window_Selectable } from "..";

export declare class Window_StatusBase extends Window_Selectable {
  constructor(rect: PIXI.Rectangle);
  public loadFaceImages(): void;
  public refresh(): void;
  public hideAdditionalSprites(): void;
  public placeActorName(actor: Game_Actor, x: number, y: number): void;
  public placeStateIcon(actor: Game_Actor, x: number, y: number): void;
  public placeGauge(
    actor: Game_Actor,
    type: StatusType,
    x: number,
    y: number
  ): void;
  public createInnerSprite(key: string, spriteClass: Sprite): Sprite;
  public placeTimeGauge(actor: Game_Actor, x: number, y: number): void;
  public placeBasicGauges(actor: Game_Actor, x: number, y: number): void;
  public gaugeLineHeight(): number;
  public drawActorCharacter(actor: Game_Actor, x: number, y: number): void;
  public drawActorFace(
    actor: Game_Actor,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  public drawActorName(
    actor: Game_Actor,
    x: number,
    y: number,
    width: number
  ): void;
  public drawActorClass(
    actor: Game_Actor,
    x: number,
    y: number,
    width: number
  ): void;
  public drawActorNickname(
    actor: Game_Actor,
    x: number,
    y: number,
    width: number
  ): void;
  public drawActorLevel(actor: Game_Actor, x: number, y: number): void;
  public drawActorIcons(
    actor: Game_Actor,
    x: number,
    y: number,
    width: number
  ): void;
  public drawActorSimpleStatus(actor: Game_Actor, x: number, y: number): void;
  public actorSlotName(actor: Game_Actor, index: number): string[];

  public _additionalSprites: { [key: string]: Sprite };
}
