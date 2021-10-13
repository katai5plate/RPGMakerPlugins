//@ts-check
/***__HIDDEN-BEGIN__***/
import resolveTypeAs from "../../../../_templates/resolveTypeAs";

import * as MZ from "../../../../_types/mz";

import Game_UIPicture from "./Game_UIPicture";
import Sprite_UIPicture from "./Sprite_UIPicture";
/***__HIDDEN-END__***/

class UIPicture {
  /** convertEscapeCharacters 呼び出し用
   *  @return {MZ.Window_Base} */
  static get baseWindow() {
    return resolveTypeAs(
      /** @param {MZ.Window_Base | null} _ */ (_) => _,
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
}

export default UIPicture; /***__HIDDEN__***/
