import * as PIXI from "pixi.js";
import { Bitmap } from "..";

export declare class Tilemap extends PIXI.Container {
  constructor();
  public destroy(): void;
  public setData(width: number, height: number, data: number[]): void;
  public isReady(): boolean;
  public update(): void;
  public setBitmaps(bitmaps: Bitmap[]): void;
  public refresh(): void;
  public updateTransform(): void;
  public _createLayers(): void;
  public _updateBitmaps(): void;
  public _addAllSpots(startX: number, startY: number): void;
  public _addSpot(startX: number, startY: number, x: number, y: number): void;
  public _addSpotTile(tileId: number, dx: number, dy: number): void;
  public _addTile(layer: number, tileId: number, dx: number, dy: number): void;
  public _addNormalTile(
    layer: number,
    tileId: number,
    dx: number,
    dy: number
  ): void;
  public _addAutotile(
    layer: number,
    tileId: number,
    dx: number,
    dy: number
  ): void;
  public _addTableEdge(
    layer: number,
    tileId: number,
    dx: number,
    dy: number
  ): void;
  public _addShadow(
    layer: number,
    shadowBits: number,
    dx: number,
    dy: number
  ): void;
  public _readMapData(x: number, y: number, z: number): number;
  public _isHigherTile(tileId: number): boolean;
  public _isTableTile(tileId: number): boolean;
  public _isOverpassPosition(): boolean;
  public _sortChildren(): void;
  public _compareChildOrder(a: unknown, b: unknown): number; // sort
  static isVisibleTile(tileId: number): boolean;
  static isAutotile(tileId: number): boolean;
  static getAutotileKind(tileId: number): number;
  static getAutotileShape(tileId: number): number;
  static makeAutotileId(kind: unknown, shape: unknown): number;
  static isSameKindTile(tileID1: unknown, tileID2: unknown): boolean;
  static isTileA1(tileId: number): boolean;
  static isTileA2(tileId: number): boolean;
  static isTileA3(tileId: number): boolean;
  static isTileA4(tileId: number): boolean;
  static isTileA5(tileId: number): boolean;
  static isWaterTile(tileId: number): boolean;
  static isWaterfallTile(tileId: number): boolean;
  static isGroundTile(tileId: number): boolean;
  static isShadowingTile(tileId: number): boolean;
  static isRoofTile(tileId: number): boolean;
  static isWallTopTile(tileId: number): boolean;
  static isWallSideTile(tileId: number): boolean;
  static isWallTile(tileId: number): boolean;
  static isFloorTypeAutotile(tileId: number): boolean;
  static isWallTypeAutotile(tileId: number): boolean;
  static isWaterfallTypeAutotile(tileId: number): boolean;

  static FLOOR_AUTOTILE_TABLE: number[][];
  static TILE_ID_A1: 2048;
  static TILE_ID_A2: 2816;
  static TILE_ID_A3: 4352;
  static TILE_ID_A4: 5888;
  static TILE_ID_A5: 1536;
  static TILE_ID_B: 0;
  static TILE_ID_C: 256;
  static TILE_ID_D: 512;
  static TILE_ID_E: 768;
  static TILE_ID_MAX: 8192;
  static WALL_AUTOTILE_TABLE: number[][];
  static WATERFALL_AUTOTILE_TABLE: number[][];
  public _bitmaps: Bitmap[];
  public _height: number;
  public _lastAnimationFrame: number;
  public _lastStartX: number;
  public _lastStartY: number;
  public z: number;
  public _mapData: number[];
  public _mapHeight: number;
  public _mapWidth: number;
  public _margin: number;
  public _needsBitmapsUpdate: boolean;
  public _needsRepaint: boolean;
  public _tileHeight: number;
  public _tileWidth: number;
  public _width: number;
  public animationCount: number;
  public flags: number[];
  public horizontalWrap: boolean;
  public verticalWrap: boolean;
  static Layer: { new (): Layer };
  static Renderer: { new (): Renderer };
}

export declare class Layer extends PIXI.Container {
  constructor();
  public destroy(): void;
  public setBitmaps(bitmaps: Bitmap[]): void;
  public clear(): void;
  public addRect(
    setNumber: number,
    sx: number,
    sy: number,
    dx: number,
    dy: number,
    w: number,
    h: number
  ): void;
  public render(renderer: PIXI.Renderer): void;
  public isReady(): boolean;
  public _createVao(): void;
  public _updateIndexBuffer(): void;
  public _updateVertexBuffer(): void;

  public _elements: [
    setNumber: number,
    sx: number,
    sy: number,
    dx: number,
    dy: number,
    w: number,
    h: number
  ][];
  public length: number;
  public _images: (HTMLImageElement | HTMLCanvasElement)[];
  public _indexBuffer: PIXI.Buffer;
  public _needsTexturesUpdate: boolean;
  public _needsVertexUpdate: boolean;
  public _state: PIXI.State;
  public _vao: PIXI.Geometry;
  public _vertexBuffer: PIXI.Buffer;
}
export declare class Renderer extends PIXI.ObjectRenderer {
  constructor(renderer: PIXI.Renderer);
  public destroy(): void;
  public getShader(): PIXI.Shader;
  public contextChange(): void;
  public _createShader(): PIXI.Shader;
  public _createInternalTextures(): void;
  public _destroyInternalTextures(): void;
  public updateTextures(
    renderer: PIXI.Renderer,
    images: (HTMLImageElement | HTMLCanvasElement)[]
  ): void;
  public bindTextures(renderer: PIXI.Renderer): void;

  public _images: (HTMLImageElement | HTMLCanvasElement)[];
  public _internalTextures: PIXI.BaseTexture[];
  public _shader: PIXI.Shader;
}
