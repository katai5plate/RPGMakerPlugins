import { Tileset } from "../data";
import { Spriteset_Base, Sprite_Balloon, Sprite_Character, Tilemap } from "..";

export declare class Spriteset_Map extends Spriteset_Base {
  constructor();
  public loadSystemImages(): void;
  public createLowerLayer(): void;
  public update(): void;
  public hideCharacters(): void;
  public createParallax(): void;
  public createTilemap(): void;
  public loadTileset(): void;
  public createCharacters(): void;
  public createShadow(): void;
  public createDestination(): void;
  public createWeather(): void;
  public updateTileset(): void;
  public updateParallax(): void;
  public updateTilemap(): void;
  public updateShadow(): void;
  public updateWeather(): void;
  public updateBalloons(): void;
  public processBalloonRequests(): void;
  public createBalloon(request: unknown): void;
  public removeBalloon(sprite: unknown): void;
  public removeAllBalloons(): void;
  public animationBaseDelay(): number;

  public _balloonSprites: Sprite_Balloon[];
  public _characterSprites: Sprite_Character[];
  public z: number;
  public _effectsContainer: unknown; // FIXME: tilemap;
  public _parallaxName: string;
  public _tilemap: Tilemap;
  public flags: number[];
  public _tileset: Tileset;
}
