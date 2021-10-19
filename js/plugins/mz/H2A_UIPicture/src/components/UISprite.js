//@ts-check
/***__HIDDEN-BEGIN__***/
import { Window_Base } from "~types/mz";
import resolveTypeAs from "~templates/resolveTypeAs";

import Game_UIPicture from "./Game_UIPicture";
import Sprite_UIPicture from "./Sprite_UIPicture";
/***__HIDDEN-END__***/

class UIPicture {
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
  static isPressed(pictureId) {
    const picture = this.picture(pictureId);
    const sprite = this.sprite(pictureId);
    return (
      picture._isUI &&
      sprite._isPressed &&
      !sprite.isAutoMoving &&
      !picture._isDisabled
    );
  }
  static isTriggered(pictureId) {
    const picture = this.picture(pictureId);
    const sprite = this.sprite(pictureId);
    return (
      picture._isUI &&
      sprite._pressCount === 0 &&
      !sprite.isAutoMoving &&
      !picture._isDisabled
    );
  }
  static isDisabled(pictureId) {
    return this.picture(pictureId)._isDisabled;
  }
  static _updateWait() {
    const pictures = resolveTypeAs(
      /** @param {Game_UIPicture[] | null} _ */ (_) => _,
      $gameScreen._pictures
    );
    let waiting = false;
    for (let pic of pictures.slice(1)) {
      if (pic._enableLoadingWait && !pic._loaded) {
        waiting = true;
      }
    }
    return waiting;
  }
}
globalThis.UIPicture = UIPicture;

export default UIPicture; /***__HIDDEN__***/
