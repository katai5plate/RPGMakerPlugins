//@ts-check
/***__HIDDEN-BEGIN__***/
import { Sprite, Window_Base } from "~types/mz";
import resolveTypeAs from "~templates/resolveTypeAs";
import parsePluginParams from "~templates/parsePluginParams";
import pluginName from "~templates/pluginName";

import Game_UIPicture from "./Game_UIPicture";
import Sprite_UIPicture from "./Sprite_UIPicture";
import DebugSprite from "./DebugSprite";
import Sprite_UIPictureLabel from "./Sprite_UIPictureLabel";
/***__HIDDEN-END__***/

class UIPicture {
  /** @type {DebugSprite} */
  static _debugSprite = null;
  static initialize() {
    const isDebugMode =
      parsePluginParams(PluginManager.parameters(pluginName)).debugMode &&
      Utils.isOptionValid("test");
    if (isDebugMode) {
      UIPicture._debugSprite = new DebugSprite();
      SceneManager._scene._spriteset.addChild(UIPicture._debugSprite);
    }
  }
  /** convertEscapeCharacters 呼び出し用
   *  @return {Window_Base} */
  static get baseWindow() {
    return resolveTypeAs(
      /** @param {Window_Base | null} _ */ (_) => _,
      SceneManager._scene._windowLayer?.children.find(
        (x) => x instanceof Window_Base
      )
    );
  }
  static pictures() {
    return resolveTypeAs(
      /** @param {Game_UIPicture[]} _ */ (_) => _,
      ($gameScreen?._pictures || []).slice(1)
    );
  }
  static sprites() {
    return resolveTypeAs(
      /** @param {Sprite_UIPicture[]} _ */ (_) => _,
      SceneManager._scene?._spriteset?._pictureContainer?.children || []
    );
  }
  /** @returns {Sprite | null} */
  static spriteParent() {
    return SceneManager._scene?._spriteset?._pictureContainer || null;
  }
  static picture(pictureId) {
    return resolveTypeAs(
      /** @param {Game_UIPicture | null} _ */ (_) => _,
      $gameScreen.picture(pictureId)
    );
  }
  static sprite(pictureId) {
    return resolveTypeAs(
      /** @param {Sprite_UIPicture | null} _ */ (_) => _,
      SceneManager._scene?._spriteset?._pictureContainer?.children?.[
        pictureId - 1
      ]
    );
  }
  static spriteIsUI(sprite) {
    return (
      sprite instanceof Sprite_UIPicture ||
      sprite instanceof Sprite_UIPictureLabel
    );
  }
  static spriteIsUIById(pictureId) {
    /** @type {*} */
    const sprite = this.sprite(pictureId);
    return this.spriteIsUI(sprite);
  }
  static replaceSprite(pictureId, sprite) {
    const parent = this.spriteParent();
    if (!parent) return;
    const before = parent.children[pictureId - 1];
    const beforeIndex = parent.getChildIndex(before);
    parent.removeChild(before);
    parent.addChild(sprite);
    parent.setChildIndex(sprite, beforeIndex);
  }
  static isPressed(pictureId) {
    const picture = this.picture(pictureId);
    return (
      picture._isUI &&
      picture._isPressed &&
      !picture.isAutoMoving &&
      !picture._isDisabled
    );
  }
  static isTriggered(pictureId) {
    const picture = this.picture(pictureId);
    return (
      picture._isUI &&
      picture._pressCount === 0 &&
      !picture.isAutoMoving &&
      !picture._isDisabled
    );
  }
  static isDisabled(pictureId) {
    return this.picture(pictureId)._isDisabled;
  }
  static showPicture(
    pictureId,
    name,
    origin,
    x,
    y,
    scaleX,
    scaleY,
    opacity,
    blendMode
  ) {
    this.replaceSprite(pictureId, new Sprite_UIPicture(pictureId));
    const realPictureId = $gameScreen.realPictureId(pictureId);
    const picture = new Game_UIPicture(pictureId);
    picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    $gameScreen._pictures[realPictureId] = picture;
    console.log("done", picture);
  }
  static _updateWait() {
    const pictures = resolveTypeAs(
      /** @param {Game_UIPicture[] | null} _ */ (_) => _,
      $gameScreen._pictures
    );
    let waiting = false;
    for (let pic of pictures.slice(1)) {
      if (!this.spriteIsUIById(pic._pictureId)) {
        waiting = false;
      } else if (pic._enableLoadingWait && !pic._loaded) {
        waiting = true;
      }
    }
    return waiting;
  }
}
globalThis.UIPicture = UIPicture;

const start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
  start.apply(this, arguments);
  UIPicture.initialize();
};

const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function () {
  return (
    isMapTouchOk.apply(this, arguments) &&
    !UIPicture.pictures().find((b) => {
      if (UIPicture.spriteIsUI(b)) {
        return b.isBeingTouched;
      }
    })
  );
};

const updateWait = Game_Interpreter.prototype.updateWait;
Game_Interpreter.prototype.updateWait = function () {
  return UIPicture._updateWait() || updateWait.apply(this, arguments);
};

export default UIPicture; /***__HIDDEN__***/
