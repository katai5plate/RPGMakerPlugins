export declare class TouchInput {
  constructor();
  static clear(): void;
  static update(): void;
  static isPressed(): boolean;
  static isTriggered(): boolean;
  static isRepeated(): boolean;
  static isLongPressed(): boolean;
  static isCancelled(): boolean;
  static isMoved(): boolean;
  static isHovered(): boolean;
  static isReleased(): boolean;
  static _setupEventHandlers(): void;
  static _onMouseDown(event: MouseEvent): void;
  static _onLeftButtonDown(event: MouseEvent): void;
  static _onMiddleButtonDown(event: MouseEvent): void;
  static _onRightButtonDown(event: MouseEvent): void;
  static _onMouseMove(event: MouseEvent): void;
  static _onMouseUp(event: MouseEvent): void;
  static _onWheel(event: MouseEvent): void;
  static _onTouchStart(event: MouseEvent): void;
  static _onTouchMove(event: MouseEvent): void;
  static _onTouchEnd(event: MouseEvent): void;
  static _onTouchCancel(event: MouseEvent): void;
  static _onPointerDown(event: MouseEvent): void;
  static _onTrigger(x: number, y: number): void;
  static _onCancel(x: number, y: number): void;
  static _onMove(x: number, y: number): void;
  static _onRelease(x: number, y: number): void;

  static readonly wheelX: number;
  static readonly wheelY: number;
  static readonly x: number;
  static readonly y: number;
  static readonly date: number;

  static keyRepeatInterval: number; //  6;
  static keyRepeatWait: number; //  24;
  public _cancelled: boolean;
  public _date: number;
  public _events: {
    triggered: boolean;
    cancelled: boolean;
    moved: boolean;
    released: boolean;
    wheelX: number;
    wheelY: number;
  };
  public cancelled: boolean;
  public moved: boolean;
  public released: boolean;
  public triggered: boolean;
  public wheelX: number;
  public wheelY: number;
  public _mousePressed: boolean;
  public _moved: boolean;
  public _pressedTime: number;
  public _released: boolean;
  public _screenPressed: boolean;
  public _triggered: boolean;
  public _wheelX: number;
  public _wheelY: number;
  public _x: number;
  public _y: number;
}
