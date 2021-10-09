import { Bitmap } from "..";
import { Scene_Base } from "../scenes/Scene_Base";

export declare class SceneManager {
  constructor();
  static run(sceneClass: unknown): unknown;
  static checkBrowser(): unknown;
  static checkPluginErrors(): unknown;
  static initGraphics(): unknown;
  static initAudio(): unknown;
  static initVideo(): unknown;
  static initInput(): unknown;
  static setupEventHandlers(): unknown;
  static update(deltaTime: unknown): unknown;
  static determineRepeatNumber(deltaTime: unknown): unknown;
  static terminate(): unknown;
  static onError(event: unknown): unknown;
  static onReject(event: unknown): unknown;
  static onUnload(): unknown;
  static onKeyDown(event: unknown): unknown;
  static reloadGame(): unknown;
  static showDevTools(): unknown;
  static catchException(e: unknown): unknown;
  static catchNormalError(e: unknown): unknown;
  static catchLoadError(e: unknown): unknown;
  static catchUnknownError(e: unknown): unknown;
  static updateMain(): unknown;
  static updateFrameCount(): unknown;
  static updateInputData(): unknown;
  static updateEffekseer(): unknown;
  static changeScene(): unknown;
  static updateScene(): unknown;
  static isGameActive(): unknown;
  static onSceneTerminate(): unknown;
  static onSceneCreate(): unknown;
  static onBeforeSceneStart(): unknown;
  static onSceneStart(): unknown;
  static isSceneChanging(): unknown;
  static isCurrentSceneBusy(): unknown;
  static isNextScene(sceneClass: unknown): unknown;
  static isPreviousScene(sceneClass: unknown): unknown;
  static goto(sceneClass: unknown): unknown;
  static push(sceneClass: unknown): unknown;
  static pop(): unknown;
  static exit(): unknown;
  static clearStack(): unknown;
  static stop(): unknown;
  static prepareNextScene(): unknown;
  static snap(): unknown;
  static snapForBackground(): unknown;
  static backgroundBitmap(): unknown;
  static resume(): unknown;

  static _backgroundBitmap: Bitmap;
  static _elapsedTime: number;
  static _exiting: boolean;
  static _nextScene: Scene_Base; //  Scene
  static _previousClass: Function;
  static _previousScene: Scene_Base; //  Scene
  static _scene: Scene_Base; //  Scene
  static _smoothDeltaTime: number;
  static _stack: Function[];
}
