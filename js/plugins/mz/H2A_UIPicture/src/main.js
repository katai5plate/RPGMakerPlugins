//@ts-check
/***__HIDDEN-BEGIN__***/
import pluginName from "~templates/pluginName";
import parsePluginParams from "~templates/parsePluginParams";
import resolveTypeAs from "~templates/resolveTypeAs";

import { P, R, Color, Sound } from "./calc";

import UIPicture from "./components/UISprite";
import Sprite_UIPicture from "./components/Sprite_UIPicture";
import Game_UIPicture from "./components/Game_UIPicture";
/***__HIDDEN-END__***/

PluginManager.registerCommand(pluginName, "setup", (params) => {
  /**
   * @type {Partial<{
   *  pictureId: number
   *  collision: R
   *  dragConfig: {
   *    range: R,
   *    move: "horizontal"|"vertical"
   *    type: "perint"|"perflo"|"local"|"global"
   *    variableX: number
   *    variableY: number
   *  }
   *  textConfig: {
   *    text: string,
   *    align: "left"|"right"
   *    offset: P
   *  }
   *  colorConfig: {
   *    duration:number
   *    off: Color
   *    onOver: Color
   *    onPress: Color
   *    onDisable: Color
   *  }
   *  soundConfig: {
   *    normal: {
   *      onOver: Sound
   *      onOut: Sound
   *      onPress: Sound
   *      onRelease: Sound
   *    }
   *    onDisable: {
   *      onOver: Sound
   *      onOut: Sound
   *      onPress: Sound
   *      onRelease: Sound
   *    }
   *  }
   * }>}
   */
  const $ = parsePluginParams(params);
  console.log({ $ });
  const picture = UIPicture.picture($.pictureId);
  picture.collision = R.from($?.collision || {});
  if ($?.dragConfig) {
    const dragRange = R.from($.dragConfig.range || {});
    picture._dragRange = dragRange;
    picture._movableDirection = $.dragConfig.move
      ? new P(
          +($.dragConfig.move === "horizontal"),
          +($.dragConfig.move === "vertical")
        )
      : new P(1, 1);
    picture._variableType = $.dragConfig.type;
    picture._variableIds = new P(
      $.dragConfig.variableX || 0,
      $.dragConfig.variableY || 0
    );
  }
  if ($?.textConfig) {
    picture._labelText = $.textConfig.text || "";
    picture._textAlign = $.textConfig.align || "center";
    picture._textOffset = P.from($.textConfig.offset || {}, { x: 0, y: 0 });
  }
  if ($?.colorConfig) {
    picture._colorDuration = $.colorConfig.duration || 1;
    picture._colorNormal = Color.from(
      $.colorConfig.off || {},
      new Color(0, 0, 0, 0, 255)
    );
    picture._colorOnOver = Color.from(
      $.colorConfig.onOver || {},
      picture._colorNormal
    );
    picture._colorOnPress = Color.from(
      $.colorConfig.onPress || {},
      picture._colorNormal
    );
    picture._colorOnDisable = Color.from(
      $.colorConfig.onDisable || {},
      picture._colorNormal
    );
  }
});

const isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function () {
  const children = resolveTypeAs(
    /** @param {Sprite_UIPicture[] | null} _ */ (_) => _,
    SceneManager._scene?._spriteset?._pictureContainer?.children
  );
  return (
    isMapTouchOk.apply(this, arguments) &&
    !children.find((b) => b.isBeingTouched())
  );
};

Spriteset_Base.prototype.createPictures = function () {
  const rect = this.pictureContainerRect();
  this._pictureContainer = new Sprite();
  this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
  for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
    this._pictureContainer.addChild(new Sprite_UIPicture(i));
  }
  this.addChild(this._pictureContainer);
};

Game_Screen.prototype.showPicture = function (
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
  const realPictureId = this.realPictureId(pictureId);
  const picture = new Game_UIPicture(pictureId);
  picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
  this._pictures[realPictureId] = picture;
};
