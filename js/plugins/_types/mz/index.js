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
const { Tilemap } = require("./core/Tilemap");
const { TouchInput } = require("./core/TouchInput");
const { Window } = require("./core/Window");
globalThis.Bitmap = Bitmap;
globalThis.ColorFilter = ColorFilter;
globalThis.Graphics = Graphics;
globalThis.Input = Input;
globalThis.Sprite = Sprite;
globalThis.Stage = Stage;
globalThis.Tilemap = Tilemap;
globalThis.TouchInput = TouchInput;
globalThis.Window = Window;
export {
  Bitmap,
  ColorFilter,
  Graphics,
  Input,
  Sprite,
  Stage,
  Tilemap,
  TouchInput,
  Window,
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
const { Game_Character } = require("./objects/Game_Character");
const { Game_CharacterBase } = require("./objects/Game_CharacterBase");
const { Game_Picture } = require("./objects/Game_Picture");
const { Game_System } = require("./objects/Game_System");
globalThis.Game_Character = Game_Character;
globalThis.Game_CharacterBase = Game_CharacterBase;
globalThis.Game_Picture = Game_Picture;
globalThis.Game_System = Game_System;
export {
  Game_Character,
  Game_CharacterBase,
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
const { Sprite_Animation } = require("./sprites/Sprite_Animation");
const { Sprite_Balloon } = require("./sprites/Sprite_Balloon");
const { Sprite_Character } = require("./sprites/Sprite_Character");
const { Sprite_Clickable } = require("./sprites/Sprite_Clickable");
const { Sprite_Picture } = require("./sprites/Sprite_Picture");
const { Spriteset_Base } = require("./sprites/Spriteset_Base");
const { Spriteset_Map } = require("./sprites/Spriteset_Map");
globalThis.Sprite_Animation = Sprite_Animation;
globalThis.Sprite_Balloon = Sprite_Balloon;
globalThis.Sprite_Character = Sprite_Character;
globalThis.Sprite_Clickable = Sprite_Clickable;
globalThis.Sprite_Picture = Sprite_Picture;
globalThis.Spriteset_Base = Spriteset_Base;
globalThis.Spriteset_Map = Spriteset_Map;
export {
  Sprite_Animation,
  Sprite_Balloon,
  Sprite_Character,
  Sprite_Clickable,
  Sprite_Picture,
  Spriteset_Base,
  Spriteset_Map,
};
