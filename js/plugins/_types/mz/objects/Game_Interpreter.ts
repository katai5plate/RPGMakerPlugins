import { Event, EventList } from "../data";

export declare class Game_Interpreter {
  // TODO: 必要になったらちゃんと設定する
  constructor(depth: unknown);
  public checkOverflow(): unknown;
  public clear(): unknown;
  public setup(list: unknown, eventId: unknown): unknown;
  public loadImages(): unknown;
  public eventId(): unknown;
  public isOnCurrentMap(): unknown;
  public setupReservedCommonEvent(): unknown;
  public isRunning(): unknown;
  public update(): unknown;
  public updateChild(): unknown;
  public updateWait(): unknown;
  public updateWaitCount(): unknown;
  public updateWaitMode(): unknown;
  public setWaitMode(waitMode: unknown): unknown;
  public wait(duration: unknown): unknown;
  public fadeSpeed(): unknown;
  public executeCommand(): unknown;
  public checkFreeze(): unknown;
  public terminate(): unknown;
  public skipBranch(): unknown;
  public currentCommand(): unknown;
  public nextEventCode(): unknown;
  public iterateActorId(param: unknown, callback: unknown): unknown;
  public iterateActorEx(param1, param2, callback: unknown): unknown;
  public iterateActorIndex(param: unknown, callback: unknown): unknown;
  public iterateEnemyIndex(param: unknown, callback: unknown): unknown;
  public iterateBattler(param1, param2, callback: unknown): unknown;
  public character(param: unknown): unknown;
  public changeHp(
    target: unknown,
    value: unknown,
    allowDeath: unknown
  ): unknown;
  public command101(params: unknown): unknown;
  public command102(params: unknown): unknown;
  public setupChoices(params: unknown): unknown;
  public command402(params: unknown): unknown;
  public command403(): unknown;
  public command103(params: unknown): unknown;
  public setupNumInput(params: unknown): unknown;
  public command104(params: unknown): unknown;
  public setupItemChoice(params: unknown): unknown;
  public command105(params: unknown): unknown;
  public command108(params: unknown): unknown;
  public command111(params: unknown): unknown;
  public command411(): unknown;
  public command112(): unknown;
  public command413(): unknown;
  public command113(): unknown;
  public command115(): unknown;
  public command117(params: unknown): unknown;
  public setupChild(list: unknown, eventId: unknown): unknown;
  public command118(): unknown;
  public command119(params: unknown): unknown;
  public jumpTo(index: unknown): unknown;
  public command121(params: unknown): unknown;
  public command122(params: unknown): unknown;
  public gameDataOperand(
    type: unknown,
    param1: unknown,
    param2: unknown
  ): unknown;
  public operateValue(
    variableId: unknown,
    operationType: unknown,
    value: unknown
  ): unknown;
  public operateVariable(
    variableId: unknown,
    operationType: unknown,
    value: unknown
  ): unknown;
  public command123(params: unknown): unknown;
  public command124(params: unknown): unknown;
  public command125(params: unknown): unknown;
  public command126(params: unknown): unknown;
  public command127(params: unknown): unknown;
  public command128(params: unknown): unknown;
  public command129(params: unknown): unknown;
  public command132(params: unknown): unknown;
  public command133(params: unknown): unknown;
  public command134(params: unknown): unknown;
  public command135(params: unknown): unknown;
  public command136(params: unknown): unknown;
  public command137(params: unknown): unknown;
  public command138(params: unknown): unknown;
  public command139(params: unknown): unknown;
  public command140(params: unknown): unknown;
  public command201(params: unknown): unknown;
  public command202(params: unknown): unknown;
  public command203(params: unknown): unknown;
  public command204(params: unknown): unknown;
  public command205(params: unknown): unknown;
  public command206(): unknown;
  public command211(params: unknown): unknown;
  public command212(params: unknown): unknown;
  public command213(params: unknown): unknown;
  public command214(): unknown;
  public command216(params: unknown): unknown;
  public command217(): unknown;
  public command221(): unknown;
  public command222(): unknown;
  public command223(params: unknown): unknown;
  public command224(params: unknown): unknown;
  public command225(params: unknown): unknown;
  public command230(params: unknown): unknown;
  public command231(params: unknown): unknown;
  public command232(params: unknown): unknown;
  public picturePoint(params: unknown): unknown;
  public command233(params: unknown): unknown;
  public command234(params: unknown): unknown;
  public command235(params: unknown): unknown;
  public command236(params: unknown): unknown;
  public command241(params: unknown): unknown;
  public command242(params: unknown): unknown;
  public command243(): unknown;
  public command244(): unknown;
  public command245(params: unknown): unknown;
  public command246(params: unknown): unknown;
  public command249(params: unknown): unknown;
  public command250(params: unknown): unknown;
  public command251(): unknown;
  public command261(params: unknown): unknown;
  public videoFileExt(): unknown;
  public command281(params: unknown): unknown;
  public command282(params: unknown): unknown;
  public command283(params: unknown): unknown;
  public command284(params: unknown): unknown;
  public command285(params: unknown): unknown;
  public command301(params: unknown): unknown;
  public command601(): unknown;
  public command602(): unknown;
  public command603(): unknown;
  public command302(params: unknown): unknown;
  public command303(params: unknown): unknown;
  public command311(params: unknown): unknown;
  public command312(params: unknown): unknown;
  public command326(params: unknown): unknown;
  public command313(params: unknown): unknown;
  public command314(params: unknown): unknown;
  public command315(params: unknown): unknown;
  public command316(params: unknown): unknown;
  public command317(params: unknown): unknown;
  public command318(params: unknown): unknown;
  public command319(params: unknown): unknown;
  public command320(params: unknown): unknown;
  public command321(params: unknown): unknown;
  public command322(params: unknown): unknown;
  public command323(params: unknown): unknown;
  public command324(params: unknown): unknown;
  public command325(params: unknown): unknown;
  public command331(params: unknown): unknown;
  public command332(params: unknown): unknown;
  public command342(params: unknown): unknown;
  public command333(params: unknown): unknown;
  public command334(params: unknown): unknown;
  public command335(params: unknown): unknown;
  public command336(params: unknown): unknown;
  public command337(params: unknown): unknown;
  public command339(params: unknown): unknown;
  public command340(): unknown;
  public command351(): unknown;
  public command352(): unknown;
  public command353(): unknown;
  public command354(): unknown;
  public command355(): unknown;
  public command356(params: unknown): unknown;
  public pluginCommand(): unknown;
  public command357(params: unknown): unknown;

  public _branch: unknown; //  {};
  public _characterId: number;
  public _childInterpreter: unknown; //  null;
  public _comments: unknown; //  ""; [params[0]];
  public _eventId: unknown; //  0;
  public _frameCount: unknown; //  0; Graphics.frameCount;
  public _freezeChecker: unknown; //  0;
  public _indent: Event["indent"];
  public _index: unknown; //  0; index; this._list.length;
  public _list: EventList;
  public _mapId: unknown; //  $gameMap.mapId(); 0;
  public _waitCount: unknown; //  0; duration;
  public _waitMode: unknown; //  ""; waitMode;
}
