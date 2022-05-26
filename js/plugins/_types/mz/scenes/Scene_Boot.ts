import { Scene_Base } from "..";
export declare class Scene_Boot extends Scene_Base {
  constructor();
  public create(): void;
  public onDatabaseLoaded(): void;
  public setEncryptionInfo(): void;
  public loadSystemImages(): void;
  public loadPlayerData(): void;
  public loadGameFonts(): void;
  public isPlayerDataLoaded(): boolean;
  public start(): void;
  public startNormalGame(): void;
  public resizeScreen(): void;
  public adjustBoxSize(): void;
  public adjustWindow(): void;
  public updateDocumentTitle(): void;
  public checkPlayerLocation(): void;

  public _databaseLoaded: boolean;
}
