//@ts-check
/***__HIDDEN-BEGIN__***/
import { Bitmap } from "~types/mz";
import pluginName from "~templates/pluginName";
import parsePluginParams from "~templates/parsePluginParams";
import resolveTypeAs from "~templates/resolveTypeAs";

import { P, R, Color } from "./calc";

import UIPicture from "./components/UISprite";
import Sprite_UIPicture from "./components/Sprite_UIPicture";
import Game_UIPicture from "./components/Game_UIPicture";
import { Command_SetupPictures, Command_ToggleDisable } from "./type";
/***__HIDDEN-END__***/

PluginManager.registerCommand(pluginName, "setupPictures", function (params) {
  /** @type {Command_SetupPictures} */
  const { list, enableLoadingWait } = parsePluginParams(params);
  console.log({ list, enableLoadingWait }, this);
  (list || []).map(($) => {
    const picture = UIPicture.picture($.pictureId);
    const sprite = UIPicture.sprite($.pictureId);
    picture._isUI = true;
    picture._enableLoadingWait = !!enableLoadingWait;
    picture._callbackInterpreter = this;
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
      picture._disDraggableWhenDisabled =
        !!$.dragConfig.disDraggableWhenDisabled;
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
    if ($.callbackConfig) {
      picture._callbackCommonEventId = $.callbackConfig.commonEventId || NaN;
      picture._callbackCommonEventLabelOnOver = $.callbackConfig.onOver || "";
      picture._callbackCommonEventLabelOnOut = $.callbackConfig.onOut || "";
      picture._callbackCommonEventLabelOnPress = $.callbackConfig.onPress || "";
      picture._callbackCommonEventLabelOnRelease =
        $.callbackConfig.onRelease || "";
    }
    if ($?.position) {
      picture._x = $.position.x;
      picture._y = $.position.y;
    }
    if ($?.debugConfig) {
      /** @type {Bitmap | null} */
      let bitmap = null;
      if ($.debugConfig.forceTransform) {
        bitmap = new Bitmap(
          $.debugConfig.forceTransform.width,
          $.debugConfig.forceTransform.height
        );
      }
      if (bitmap) sprite._onBitmapLoad(bitmap);
    }
  });
});

PluginManager.registerCommand(pluginName, "disable", (params) => {
  /** @type {Command_ToggleDisable} */
  const $ = parsePluginParams(params);
  $?.pictureIds?.forEach((id) => {
    const picture = UIPicture.picture(id);
    picture._isDisabled = true;
  });
});

PluginManager.registerCommand(pluginName, "enable", (params) => {
  /** @type {Command_ToggleDisable} */
  const $ = parsePluginParams(params);
  $?.pictureIds?.forEach((id) => {
    const picture = UIPicture.picture(id);
    picture._isDisabled = false;
  });
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

const updateWait = Game_Interpreter.prototype.updateWait;
Game_Interpreter.prototype.updateWait = function () {
  return UIPicture._updateWait() || updateWait.apply(this, arguments);
};
