import { Sprite, Bitmap, Game_CharacterBase } from "..";

export declare class Sprite_Character extends Sprite {
  constructor(character: Game_CharacterBase);
  public initMembers(): void;
  public setCharacter(character: Game_CharacterBase): void;
  public checkCharacter(character: Game_CharacterBase): boolean;
  public update(): void;
  public updateVisibility(): void;
  public isTile(): boolean;
  public isObjectCharacter(): boolean;
  public isEmptyCharacter(): boolean;
  public tilesetBitmap(tileId: number): Bitmap;
  public updateBitmap(): void;
  public isImageChanged(): boolean;
  public setTileBitmap(): void;
  public setCharacterBitmap(): void;
  public updateFrame(): void;
  public updateTileFrame(): void;
  public updateCharacterFrame(): void;
  public characterBlockX(): number;
  public characterBlockY(): number;
  public characterPatternX(): number;
  public characterPatternY(): number;
  public patternWidth(): number;
  public patternHeight(): number;
  public updateHalfBodySprites(): void;
  public createHalfBodySprites(): void;
  public updatePosition(): void;
  public updateOther(): void;

  public _balloonDuration: number;
  public _bushDepth: number;
  public _character: Game_CharacterBase;
  public _characterIndex: number;
  public _characterName: string;
  public _isBigCharacter: boolean;
  public _lowerBody: Sprite;
  public visible: boolean;
  public _tileId: number;
  public _tilesetId: number;
  public _upperBody: Sprite;
  public z: number;
}
