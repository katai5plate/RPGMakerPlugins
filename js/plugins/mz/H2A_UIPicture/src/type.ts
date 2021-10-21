import { Color, P, R } from "./calc";

interface Struct_Setup {
  pictureId?: number;
  collision?: R;
  dragConfig?: Struct_DragConfig;
  textConfig?: Struct_textConfig;
  colorConfig?: ColorConfig;
  callbackConfig?: CallbackConfig;
  position?: P;
  debugConfig?: DebugConfig;
}

interface Struct_DragConfig {
  range?: R;
  move?: "horizontal" | "vertical";
  type?: "perint" | "perflo" | "local" | "global";
  variableX?: number;
  variableY?: number;
  disDraggableWhenDisabled?: boolean;
}

interface Struct_textConfig {
  text?: string;
  align?: "left" | "right";
  offset?: P;
}

interface ColorConfig {
  duration?: number;
  off?: Color;
  onOver?: Color;
  onPress?: Color;
  onDisable?: Color;
}

interface CallbackConfig {
  commonEventId?: number;
  onOver?: string;
  onOut?: string;
  onPress?: string;
  onRelease?: string;
  onDragEnd?: string;
}

interface DebugConfig {
  forceTransform?: R;
}

export interface Command_SetupPictures {
  list?: Struct_Setup[];
  enableLoadingWait?: boolean;
}

export interface Command_ToggleDisable {
  pictureIds?: number[];
}
