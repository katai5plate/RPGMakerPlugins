const { PIXI } = require("pixi.js");
/** @type {import("pixi.js")} */
globalThis.PIXI = PIXI;

// core
const { Bitmap } = require("./core/Bitmap");
const { ColorFilter } = require("./core/ColorFilter");
const { Graphics } = require("./core/Graphics");
const { Input } = require("./core/Input");
const { Sprite } = require("./core/Sprite");
const { Stage } = require("./core/Stage");
const { TouchInput } = require("./core/TouchInput");
const { Window } = require("./core/Window");
globalThis.Bitmap = Bitmap;
globalThis.ColorFilter = ColorFilter;
globalThis.Graphics = Graphics;
globalThis.Input = Input;
globalThis.Sprite = Sprite;
globalThis.Stage = Stage;
globalThis.TouchInput = TouchInput;
globalThis.Window = Window;
export {
  Bitmap,
  ColorFilter,
  Graphics,
  Input,
  Sprite,
  Stage,
  TouchInput,
  Window,
  //
};

// managers
const { SceneManager } = require("./managers/SceneManager");
const { PluginManager } = require("./managers/PluginManager");
globalThis.SceneManager = SceneManager;
globalThis.PluginManager = PluginManager;
export {
  SceneManager,
  PluginManager,
  //
};

// objects
const { Game_Picture } = require("./objects/Game_Picture");
const { Game_System } = require("./objects/Game_System");
globalThis.Game_Picture = Game_Picture;
globalThis.Game_System = Game_System;
export {
  Game_Picture,
  Game_System,
  //
};
globalThis.$gameSystem = new Game_System();

// scenes
const { Scene_Base } = require("./scenes/Scene_Base");
const { Scene_Map } = require("./scenes/Scene_Map");
const { Scene_Message } = require("./scenes/Scene_Message");
globalThis.Scene_Base = Scene_Base;
globalThis.Scene_Map = Scene_Map;
globalThis.Scene_Message = Scene_Base;
export {
  Scene_Base,
  Scene_Map,
  Scene_Message,
  //
};

// sprites
const { Sprite_Clickable } = require("./sprites/Sprite_Clickable");
const { Sprite_Picture } = require("./sprites/Sprite_Picture");
globalThis.Sprite_Clickable = Sprite_Clickable;
globalThis.Sprite_Picture = Sprite_Picture;
export {
  Sprite_Clickable,
  Sprite_Picture,
  //
};
