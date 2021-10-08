export declare class Input {
  static readonly dir4: number;
  static readonly dir8: number;
  static readonly date: number;

  static gamepadMapper: { [key: number]: string };
  static keyMapper: { [key: number]: string };
  static keyRepeatInterval: number;
  static keyRepeatWait: number;
  public _currentState: { [keyName: string]: boolean };
  public _date: number;
  public _dir4: number;
  public _dir8: number;
  public _gamepadStates: boolean[];
  public _latestButton: string;
  public _preferredAxis: "" | "x" | "y";
  public _pressedTime: number;
  public _previousState: { [keyName: string]: boolean };
}
