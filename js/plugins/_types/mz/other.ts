import { Scene_Map } from ".";
import { Bitmap } from "./core/Bitmap";

export type AnyObject = { [key: string | number]: AnyObject };

export type LoadEventListener = (that: Bitmap) => void;
export type TickHandler = (deltaTime: number) => void;

export type ColorTone = [r: number, g: number, b: number, gray: number];
export type BlendColor = [r: number, g: number, b: number, a: number];
export type ListElement = { code: number; indent?: number; parameters: [] };
export type SelfSwitch = "A" | "B" | "C" | "D";
export type Buffs = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
export type EffectType =
  | "whiten"
  | "blink"
  | "collapse"
  | "bossCollapse"
  | "instantCollapse";
export type MotionType =
  | "guard"
  | "spell"
  | "skill"
  | "item"
  | "thrust"
  | "swing"
  | "missile"
  | "damage"
  | "evade"
  | "victory"
  | "escape";
export type DataClass = "armor" | "item" | "skill" | "weapon";
export type StatusType = "time" | "tp" | string;

// 型がよくわからないもの
export type BasicScenes = Scene_Map; //Scene_Gameover | Scene_Title | Scene_Battle
export type MZSynbol = string;
export type Item = unknown; // Window_* 系 EquipSlot, ItemList, ShopBuy, SkillList の itemAt？ this._helpWindow.setItem？
export type CommandExt = unknown;
export type CommandListElement = {
  name: string;
  symbol: MZSynbol;
  enabled: boolean;
  ext: CommandExt;
};
export type ItemObject = unknown; //DataSkill | DataItem | DataWeapon | DataArmore
export type AnyThisType = unknown;

export interface AudioObject {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}
export interface Plugin {
  description: string;
  name: string;
  parameters: AnyObject;
  status: boolean;
}
export interface Tileset {
  id: number;
  flags: number[];
  mode: number;
  name: string;
  note: string;
  tilesetNames: [
    a1: string,
    a2: string,
    a3: string,
    a4: string,
    a5: string,
    b: string,
    c: string,
    d: string,
    e: string
  ];
  meta: {};
}
export interface Animation {
  id: number;
  displayType: number;
  effectName: string;
  flashTimings: {
    frame: number;
    duration: number;
    color: BlendColor;
  }[];
  name: string;
  offsetX: number;
  offsetY: number;
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: number;
  soundTimings: {
    frame: number;
    se: AudioObject;
  }[];
  speed: number;
}
export interface MoveRoute {
  list: ListElement[];
  repeat: boolean;
  skippable: boolean;
  wait: boolean;
}
export interface TextState {
  text: string;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  startX: number;
  startY: number;
  rtl: boolean;
  buffer: string;
  drawing: boolean;
  outputWidth: number;
  outputHeight: number;
}
export interface MapEvent {
  id: number;
  name: string;
  note: string;
  pages: {
    conditions: {
      actorId: number;
      actorValid: boolean;
      itemId: number;
      itemValid: boolean;
      selfSwitchCh: SelfSwitch;
      selfSwitchValid: boolean;
      switch1Id: number;
      switch1Valid: boolean;
      switch2Id: number;
      switch2Valid: boolean;
      variableId: number;
      variableValid: boolean;
      variableValue: number;
    };
    directionFix: boolean;
    image: {
      characterIndex: number;
      characterName: string;
      direction: number;
      pattern: number;
      tileId: number;
    };
    list: ListElement[];
    moveFrequency: number;
    moveRoute: MoveRoute;
    moveSpeed: number;
    moveType: number;
    priorityType: number;
    stepAnime: boolean;
    through: boolean;
    trigger: number;
    walkAnime: boolean;
  }[];
  x: number;
  y: number;
  meta: {};
}

export interface DataState {
  id: number;
  autoRemovalTiming: number;
  chanceByDamage: number;
  iconIndex: number;
  maxTurns: number;
  message1: string;
  message2: string;
  message3: string;
  message4: string;
  minTurns: number;
  motion: number;
  name: string;
  note: string;
  overlay: number;
  priority: number;
  releaseByDamage: boolean;
  removeAtBattleEnd: boolean;
  removeByDamage: boolean;
  removeByRestriction: boolean;
  removeByWalking: boolean;
  restriction: number;
  stepsToRemove: number;
  traits: {
    code: number;
    dataId: number;
    value: number;
  }[];
  messageType: number;
  meta: {};
}
