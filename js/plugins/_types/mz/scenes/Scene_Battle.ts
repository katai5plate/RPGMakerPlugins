import * as PIXI from "pixi.js";
import { Window_Status } from "..";

export declare class Scene_Battle extends Scene_Message {
  constructor();
  public create(): void;
  public start(): void;
  public update(): void;
  public updateVisibility(): void;
  public updateBattleProcess(): void;
  public isTimeActive(): boolean;
  public isAnyInputWindowActive(): void;
  public changeInputWindow(): void;
  public stop(): void;
  public terminate(): void;
  public shouldAutosave(): boolean;
  public needsSlowFadeOut(): boolean;
  public updateLogWindowVisibility(): void;
  public updateStatusWindowVisibility(): void;
  public shouldOpenStatusWindow(): boolean;
  public updateStatusWindowPosition(): void;
  public statusWindowX(): number;
  public updateInputWindowVisibility(): void;
  public needsInputWindowChange(): boolean;
  public updateCancelButton(): void;
  public createDisplayObjects(): void;
  public createSpriteset(): void;
  public createAllWindows(): void;
  public createLogWindow(): void;
  public logWindowRect(): PIXI.Rectangle;
  public createStatusWindow(): void;
  public statusWindowRect(): PIXI.Rectangle;
  public createPartyCommandWindow(): void;
  public partyCommandWindowRect(): PIXI.Rectangle;
  public createActorCommandWindow(): void;
  public actorCommandWindowRect(): PIXI.Rectangle;
  public createHelpWindow(): void;
  public helpWindowRect(): PIXI.Rectangle;
  public createSkillWindow(): void;
  public skillWindowRect(): PIXI.Rectangle;
  public createItemWindow(): void;
  public itemWindowRect(): PIXI.Rectangle;
  public createActorWindow(): void;
  public actorWindowRect(): PIXI.Rectangle;
  public createEnemyWindow(): void;
  public enemyWindowRect(): PIXI.Rectangle;
  public helpAreaTop(): number;
  public helpAreaBottom(): number;
  public helpAreaHeight(): number;
  public windowAreaHeight(): number;
  public createButtons(): void;
  public createCancelButton(): void;
  public closeCommandWindows(): void;
  public hideSubInputWindows(): void;
  public startPartyCommandSelection(): void;
  public commandFight(): void;
  public commandEscape(): void;
  public startActorCommandSelection(): void;
  public commandAttack(): void;
  public commandSkill(): void;
  public commandGuard(): void;
  public commandItem(): void;
  public commandCancel(): void;
  public selectNextCommand(): void;
  public selectPreviousCommand(): void;
  public startActorSelection(): void;
  public onActorOk(): void;
  public onActorCancel(): void;
  public startEnemySelection(): void;
  public onEnemyOk(): void;
  public onEnemyCancel(): void;
  public onSkillOk(): void;
  public onSkillCancel(): void;
  public onItemOk(): void;
  public onItemCancel(): void;
  public onSelectAction(): void;
  public endCommandSelection(): void;

  public _actorCommandWindow: Window_ActorCommand;
  public _partyCommandWindow: Window_PartyCommand;
  public _statusWindow: Window_Status;
}
