const { PIXI } = require("pixi.js");
/** @type {import("pixi.js")} */
globalThis.PIXI = PIXI;
globalThis.Rectangle = PIXI.Rectangle;
globalThis.Point = PIXI.Point;

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
const { WindowLayer } = require("./core/WindowLayer");
globalThis.Bitmap = Bitmap;
globalThis.ColorFilter = ColorFilter;
globalThis.Graphics = Graphics;
globalThis.Input = Input;
globalThis.Sprite = Sprite;
globalThis.Stage = Stage;
globalThis.Tilemap = Tilemap;
globalThis.TouchInput = TouchInput;
globalThis.Window = Window;
globalThis.WindowLayer = WindowLayer;
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
  WindowLayer,
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
const { Game_Action } = require("./objects/Game_Action");
const { Game_Actor } = require("./objects/Game_Actor");
const { Game_Battler } = require("./objects/Game_Battler");
const { Game_BattlerBase } = require("./objects/Game_BattlerBase");
const { Game_Character } = require("./objects/Game_Character");
const { Game_CharacterBase } = require("./objects/Game_CharacterBase");
const { Game_CommonEvent } = require("./objects/Game_CommonEvent");
const { Game_Interpreter } = require("./objects/Game_Interpreter");
const { Game_Item } = require("./objects/Game_Item");
const { Game_Picture } = require("./objects/Game_Picture");
const { Game_Screen } = require("./objects/Game_Screen");
const { Game_System } = require("./objects/Game_System");
const { Game_Variables } = require("./objects/Game_Variables");
globalThis.Game_Action = Game_Action;
globalThis.Game_Actor = Game_Actor;
globalThis.Game_Battler = Game_Battler;
globalThis.Game_BattlerBase = Game_BattlerBase;
globalThis.Game_Character = Game_Character;
globalThis.Game_CharacterBase = Game_CharacterBase;
globalThis.Game_CommonEvent = Game_CommonEvent;
globalThis.Game_Interpreter = Game_Interpreter;
globalThis.Game_Item = Game_Item;
globalThis.Game_Picture = Game_Picture;
globalThis.Game_Screen = Game_Screen;
globalThis.Game_System = Game_System;
globalThis.Game_Variables = Game_Variables;
export {
  Game_Action,
  Game_Actor,
  Game_Battler,
  Game_BattlerBase,
  Game_Character,
  Game_CharacterBase,
  Game_CommonEvent,
  Game_Interpreter,
  Game_Item,
  Game_Picture,
  Game_Screen,
  Game_System,
  Game_Variables,
};

// globalThis.$gameTemp = new Game_Temp();
globalThis.$gameSystem = new Game_System();
globalThis.$gameScreen = new Game_Screen();
// globalThis.$gameTimer = new Game_Timer();
// globalThis.$gameMessage = new Game_Message();
// globalThis.$gameSwitches = new Game_Switches();
globalThis.$gameVariables = new Game_Variables();
// globalThis.$gameSelfSwitches = new Game_SelfSwitches();
// globalThis.$gameActors = new Game_Actors();
// globalThis.$gameParty = new Game_Party();
// globalThis.$gameTroop = new Game_Troop();
// globalThis.$gameMap = new Game_Map();
// globalThis.$gamePlayer = new Game_Player();

// scenes
const { Scene_Base } = require("./scenes/Scene_Base");
const { Scene_Battle } = require("./scenes/Scene_Battle");
const { Scene_Map } = require("./scenes/Scene_Map");
const { Scene_Message } = require("./scenes/Scene_Message");
globalThis.Scene_Base = Scene_Base;
globalThis.Scene_Battle = Scene_Battle;
globalThis.Scene_Map = Scene_Map;
globalThis.Scene_Message = Scene_Base;
export {
  Scene_Base,
  Scene_Battle,
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

// windows
const { Window_ActorCommand } = require("./windows/Window_ActorCommand");
const { Window_Base } = require("./windows/Window_Base");
const { Window_Command } = require("./windows/Window_Command");
const { Window_Help } = require("./windows/Window_Help");
const { Window_PartyCommand } = require("./windows/Window_PartyCommand");
const { Window_Scrollable } = require("./windows/Window_Scrollable");
const { Window_Selectable } = require("./windows/Window_Selectable");
const { Window_Status } = require("./windows/Window_Status");
const { Window_StatusBase } = require("./windows/Window_StatusBase");
globalThis.Window_ActorCommand = Window_ActorCommand;
globalThis.Window_Base = Window_Base;
globalThis.Window_Command = Window_Command;
globalThis.Window_Help = Window_Help;
globalThis.Window_PartyCommand = Window_PartyCommand;
globalThis.Window_Scrollable = Window_Scrollable;
globalThis.Window_Selectable = Window_Selectable;
globalThis.Window_Status = Window_Status;
globalThis.Window_StatusBase = Window_StatusBase;
export {
  Window_ActorCommand,
  Window_Base,
  Window_Command,
  Window_Help,
  Window_PartyCommand,
  Window_Scrollable,
  Window_Selectable,
  Window_Status,
  Window_StatusBase,
};

// $data
/** @type {import("./data").Actors} */
globalThis.$dataActors = [];
/** @type {import("./data").Classes} */
globalThis.$dataClasses = [];
/** @type {import("./data").Skills} */
globalThis.$dataSkills = [];
/** @type {import("./data").Items} */
globalThis.$dataItems = [];
/** @type {import("./data").Weapons} */
globalThis.$dataWeapons = [];
/** @type {import("./data").Armores} */
globalThis.$dataArmors = [];
/** @type {import("./data").Enemies} */
globalThis.$dataEnemies = [];
/** @type {import("./data").Troops} */
globalThis.$dataTroops = [];
/** @type {import("./data").States} */
globalThis.$dataStates = [];
/** @type {import("./data").Animations} */
globalThis.$dataAnimations = [];
/** @type {import("./data").Tilesets} */
globalThis.$dataTilesets = [];
/** @type {import("./data").CommonEvents} */
globalThis.$dataCommonEvents = [];
/** @type {import("./data").System} */
globalThis.$dataSystem = {};
/** @type {import("./data").MapInfo} */
globalThis.$dataMapInfos = {};
/** @type {import("./data").Map} */
globalThis.$dataMap = {};

/** @type {import("./data").EventList} */
globalThis.$testEvent = [];
