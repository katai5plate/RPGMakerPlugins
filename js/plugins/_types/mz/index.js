const { PIXI } = require("pixi.js");
/** @type {import("pixi.js")} */
globalThis.PIXI = PIXI;

// core
const { Bitmap } = require("./core/Bitmap");
globalThis.Bitmap = Bitmap;
const { ColorFilter } = require("./core/ColorFilter");
globalThis.ColorFilter = ColorFilter;
const { Input } = require("./core/Input");
globalThis.Input = Input;
const { Sprite } = require("./core/Sprite");
globalThis.Sprite = Sprite;
const { Stage } = require("./core/Stage");
globalThis.Stage = Stage;
const { TouchInput } = require("./core/TouchInput");
globalThis.TouchInput = TouchInput;

// objects
const { Game_Picture } = require("./objects/Game_Picture");
globalThis.Game_Picture = Game_Picture;

// sprites
const { Sprite_Clickable } = require("./sprites/Sprite_Clickable");
globalThis.Sprite_Clickable = Sprite_Clickable;
const { Sprite_Picture } = require("./sprites/Sprite_Picture");
globalThis.Sprite_Picture = Sprite_Picture;
