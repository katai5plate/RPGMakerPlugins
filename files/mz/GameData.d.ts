// RPGツクールMZ の data/*.json 型定義

/* 配列定義用 */

type Array2<T> = [T, T];

type APlusOne<T, L extends T[]> = [...L, T];
type APlusAny<T, A extends T[], B extends T[] = A> = [...A, ...B];

type ATimes2<T, L extends T[]> = APlusAny<T, L>;
type ATimes4<T, L extends T[], R extends T[] = ATimes2<T, L>> = APlusAny<T, R>;

type Array4<T> = ATimes2<T, Array2<T>>;
type Array5<T> = APlusOne<T, Array4<T>>;
type Array6<T> = APlusOne<T, Array5<T>>;
type Array8<T> = ATimes2<T, Array4<T>>;
type Array9<T> = APlusOne<T, Array8<T>>;
type Array10<T> = ATimes2<T, Array5<T>>;
type Array12<T> = APlusAny<T, Array10<T>, Array2<T>>;
type Array13<T> = APlusOne<T, Array12<T>>;
type Array20<T> = ATimes2<T, Array10<T>>;
type Array24<T> = ATimes2<T, Array12<T>>;
type Array100<T> = APlusAny<T, ATimes4<T, Array20<T>>, Array20<T>>;

type DBList<T> = [null, ...T[]];

/* 共通 */

export type ColorTone = Array4<number>;
export type Equips = Array5<number>;
export type StateChangeParams = Array8<number>;
export interface Event {
  code: number;
  indent?: number;
  parameters: [];
}
export type EventList = Event[];
export interface Effect {
  code: number;
  dataId: number;
  value1: number;
  value2: number;
}
export type Effects = Effect[];
export interface Audio {
  name: string;
  pan: number;
  pitch: number;
  volume: number;
}
export interface Damage {
  critical: boolean;
  elementId: number;
  formula: string;
  type: number;
  variance: number;
}
export interface Trait {
  code: number;
  dataId: number;
  value: number;
}
export type Traits = Trait[];

/* アクター */

export interface Actor {
  id: number;
  battlerName: string;
  characterIndex: number;
  characterName: string;
  classId: number;
  equips: Equips;
  faceIndex: number;
  faceName: string;
  traits: Traits;
  initialLevel: number;
  maxLevel: number;
  name: string;
  nickname: string;
  note: string;
  profile: string;
}
export type Actors = DBList<Actor>;

/* アニメーション */

export interface Animation_FlashTiming {
  frame: number;
  duration: number;
  color: ColorTone;
}
export interface Animation_Rotation {
  x: number;
  y: number;
  z: number;
}
export interface Animation_SoundTiming {
  frame: number;
  se: Audio;
}
export interface Animation {
  id: number;
  displayType: number;
  effectName: string;
  flashTimings: Animation_FlashTiming[];
  name: string;
  offsetX: number;
  offsetY: number;
  rotation: Animation_Rotation;
  scale: number;
  soundTimings: Animation_SoundTiming[];
  speed: number;
}
export type Animations = DBList<Animation>;

/* 防具 */

export interface Armore {
  id: number;
  atypeId: number;
  description: string;
  etypeId: number;
  traits: Traits;
  iconIndex: number;
  name: string;
  note: string;
  params: StateChangeParams;
  price: number;
}
export type Armores = DBList<Armore>;

/* 職業 */

export interface Class_Learning {
  level: number;
  skillId: number;
  note: string;
}
export type Class_ExpParams = Array4<number>;
export type Class_Params = Array8<Array100<number>>;
export interface Class {
  id: number;
  expParams: Class_ExpParams;
  traits: Traits;
  learnings: Class_Learning[];
  name: string;
  note: string;
  params: Class_Params;
}
export type Classes = DBList<Class>;

/* コモンイベント */

export interface CommonEvent {
  id: number;
  list: EventList;
  name: string;
  switchId: number;
  trigger: number;
}
export type CommonEvents = DBList<CommonEvent>;

/* 敵キャラ */

export interface Enemy_DropItem {
  dataId: number;
  denominator: number;
  kind: number;
}
export interface Enemy_Action {
  conditionParam1: number;
  conditionParam2: number;
  conditionType: number;
  rating: number;
  skillId: number;
}
export interface Enemy {
  id: number;
  actions: Enemy_Action[];
  battlerHue: number;
  battlerName: string;
  dropItems: Enemy_DropItem[];
  exp: number;
  traits: Traits;
  gold: number;
  name: string;
  note: string;
  params: StateChangeParams;
}
export type Enemies = DBList<Enemy>;

/* アイテム */

export interface Item {
  id: number;
  animationId: number;
  consumable: boolean;
  damage: Damage;
  description: string;
  effects: Effects;
  hitType: number;
  iconIndex: number;
  itypeId: number;
  name: string;
  note: string;
  occasion: number;
  price: number;
  repeats: number;
  scope: number;
  speed: number;
  successRate: number;
  tpGain: number;
}
export type Items = DBList<Item>;

/* マップデータ */

export interface Map_Encounter {
  troopId: number;
  weight: number;
  regionSet: number[];
}
export interface Map_Event {
  id: number;
  name: string;
  note: string;
  pages: Map_EventPage[];
  x: number;
  y: number;
}
export interface Map_EventPage {
  conditions: Map_EventPageConditions;
  directionFix: boolean;
  image: Map_EventPageCharactorImage;
  list: EventList;
  moveFrequency: number;
  moveRoute: Map_EventPageMoveRoute;
  moveSpeed: number;
  moveType: number;
  priorityType: number;
  stepAnime: boolean;
  through: boolean;
  trigger: number;
  walkAnime: boolean;
}
export interface Map_EventPageConditions {
  actorId: number;
  actorValid: boolean;
  itemId: number;
  itemValid: boolean;
  selfSwitchCh: string;
  selfSwitchValid: boolean;
  switch1Id: number;
  switch1Valid: boolean;
  switch2Id: number;
  switch2Valid: boolean;
  variableId: number;
  variableValid: boolean;
  variableValue: number;
}
export interface Map_EventPageCharactorImage {
  tileId: number;
  characterName: string;
  direction: number;
  pattern: number;
  characterIndex: number;
}
export interface Map_EventPageMoveRoute {
  list: EventList;
  repeat: boolean;
  skippable: boolean;
  wait: boolean;
}
export interface Map {
  autoplayBgm: boolean;
  autoplayBgs: boolean;
  battleback1Name: string;
  battleback2Name: string;
  bgm: Audio;
  bgs: Audio;
  disableDashing: boolean;
  displayName: string;
  encounterList: Map_Encounter[];
  encounterStep: number;
  height: number;
  note: string;
  parallaxLoopX: boolean;
  parallaxLoopY: boolean;
  parallaxName: string;
  parallaxShow: boolean;
  parallaxSx: number;
  parallaxSy: number;
  scrollType: number;
  specifyBattleback: boolean;
  tilesetId: number;
  width: number;
  data: number[];
  events: DBList<Map_Event>;
}

/* マップ設定 */

export interface MapInfo {
  id: number;
  expanded: boolean;
  name: string;
  order: number;
  parentId: number;
  scrollX: number;
  scrollY: number;
}
export type MapInfos = DBList<MapInfo>;

/* スキル */

export interface Skill {
  id: number;
  animationId: number;
  damage: Damage;
  description: string;
  effects: Effects;
  hitType: number;
  iconIndex: number;
  message1: string;
  message2: string;
  mpCost: number;
  name: string;
  note: string;
  occasion: number;
  repeats: number;
  requiredWtypeId1: number;
  requiredWtypeId2: number;
  scope: number;
  speed: number;
  stypeId: number;
  successRate: number;
  tpCost: number;
  tpGain: number;
  messageType: number;
}
export type Skills = DBList<Skill>;

/* ステート */

export interface State {
  id: number;
  autoRemovalTiming: number;
  chanceByDamage: number;
  traits: Traits;
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
  removeAtBattleEnd: boolean;
  removeByDamage: boolean;
  removeByRestriction: boolean;
  removeByWalking: boolean;
  restriction: number;
  stepsToRemove: number;
}
export type States = DBList<State>;

/* システム */

export interface System_Advanced {
  gameId: number;
  screenWidth: number;
  screenHeight: number;
  uiAreaWidth: number;
  uiAreaHeight: number;
  numberFontFilename: string;
  fallbackFonts: string;
  fontSize: number;
  mainFontFilename: string;
}
export type System_TermsBasic = Array10<string>;
export type System_TermsCommandsBasic = Array20<string>;
export type System_TermsCommandsConfirm = Array2<string>;
export type System_TermsCommandsShop = Array2<string>;
export type System_TermsParams = Array10<string>;
export interface System_TermMessages {
  alwaysDash: string;
  commandRemember: string;
  touchUI: string;
  bgmVolume: string;
  bgsVolume: string;
  meVolume: string;
  seVolume: string;
  possession: string;
  expTotal: string;
  expNext: string;
  saveMessage: string;
  loadMessage: string;
  file: string;
  autosave: string;
  partyName: string;
  emerge: string;
  preemptive: string;
  surprise: string;
  escapeStart: string;
  escapeFailure: string;
  victory: string;
  defeat: string;
  obtainExp: string;
  obtainGold: string;
  obtainItem: string;
  levelUp: string;
  obtainSkill: string;
  useItem: string;
  criticalToEnemy: string;
  criticalToActor: string;
  actorDamage: string;
  actorRecovery: string;
  actorGain: string;
  actorLoss: string;
  actorDrain: string;
  actorNoDamage: string;
  actorNoHit: string;
  enemyDamage: string;
  enemyRecovery: string;
  enemyGain: string;
  enemyLoss: string;
  enemyDrain: string;
  enemyNoDamage: string;
  enemyNoHit: string;
  evasion: string;
  magicEvasion: string;
  magicReflection: string;
  counterAttack: string;
  substitute: string;
  buffAdd: string;
  debuffAdd: string;
  buffRemove: string;
  actionFailure: string;
}
export interface Terms {
  basic: System_TermsBasic;
  commands: [
    ...System_TermsCommandsBasic,
    null,
    ...System_TermsCommandsConfirm,
    null,
    ...System_TermsCommandsShop
  ];
  params: System_TermsParams;
  messages: System_TermMessages;
}
export interface System_TestBattler {
  actorId: number;
  level: number;
  equips: Equips;
}
export interface System_TitleCommandWindow {
  background: number;
  offsetX: number;
  offsetY: number;
}
export type System_AttackMotions = Array13<{
  type: number;
  weaponImageId: number;
}>;
export interface System_Ship {
  bgm: Audio;
  characterIndex: number;
  characterName: string;
  startMapId: number;
  startX: number;
  startY: number;
}
export type System_ItemCategories = Array4<boolean>;
export type System_MenuCommands = Array6<boolean>;
export type System_Sounds = Array24<Audio>;
export interface System {
  advanced: System_Advanced;
  airship: System_Ship;
  armorTypes: string[];
  attackMotions: System_AttackMotions;
  battleBgm: Audio;
  battleback1Name: string;
  battleback2Name: string;
  battlerHue: number;
  battlerName: string;
  battleSystem: number;
  boat: System_Ship;
  currencyUnit: string;
  defeatMe: Audio;
  editMapId: number;
  elements: string[];
  equipTypes: string[];
  gameTitle: string;
  gameoverMe: Audio;
  itemCategories: System_ItemCategories;
  locale: string;
  magicSkills: number[];
  menuCommands: System_MenuCommands;
  optAutosave: boolean;
  optDisplayTp: boolean;
  optDrawTitle: boolean;
  optExtraExp: boolean;
  optFloorDeath: boolean;
  optFollowers: boolean;
  optKeyItemsNumber: boolean;
  optSideView: boolean;
  optSlipDeath: boolean;
  optTransparent: boolean;
  partyMembers: number[];
  ship: System_Ship;
  skillTypes: string[];
  sounds: System_Sounds;
  startMapId: number;
  startX: number;
  startY: number;
  switches: string[];
  terms: Terms;
  testBattlers: System_TestBattler[];
  testTroopId: number;
  title1Name: string;
  title2Name: string;
  titleBgm: Audio;
  titleCommandWindow: System_TitleCommandWindow;
  variables: string[];
  versionId: number;
  victoryMe: Audio;
  weaponTypes: string[];
  windowTone: ColorTone;
}

/* タイルセット */

export type Tileset_Names = Array9<string>;
export interface Tileset {
  id: number;
  flags: number[];
  mode: number;
  name: string;
  note: string;
  tilesetNames: Tileset_Names;
}
export type Tilesets = DBList<Tileset>;

/* 敵グループ */

export interface Troop_Member {
  enemyId: number;
  x: number;
  y: number;
  hidden: boolean;
}
export interface Troop_Page {
  conditions: Troop_PageConditions;
  list: EventList;
  span: number;
}
export interface Troop_PageConditions {
  actorHp: number;
  actorId: number;
  actorValid: boolean;
  enemyHp: number;
  enemyIndex: number;
  enemyValid: boolean;
  switchId: number;
  switchValid: boolean;
  turnA: number;
  turnB: number;
  turnEnding: boolean;
  turnValid: boolean;
}
export interface Troop {
  id: number;
  members: Troop_Member[];
  name: string;
  pages: Troop_Page[];
}
export type Troops = DBList<Troop>;

/* 武器 */

export interface Weapon {
  id: number;
  animationId: number;
  description: string;
  etypeId: number;
  traits: Traits;
  iconIndex: number;
  name: string;
  note: string;
  params: StateChangeParams;
  price: number;
  wtypeId: number;
}
export type Weapons = DBList<Weapon>;
