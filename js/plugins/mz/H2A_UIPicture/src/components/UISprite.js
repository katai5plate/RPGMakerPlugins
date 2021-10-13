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
    return (
      this.sprite(pictureId)._isPressed && !this.picture(pictureId)._isDisabled
    );
  }
  static isTriggered(pictureId) {
    return (
      this.sprite(pictureId)._pressCount === 0 &&
      !this.picture(pictureId)._isDisabled
    );
  }
}
globalThis.UIPicture = UIPicture;

export default UIPicture; /***__HIDDEN__***/
