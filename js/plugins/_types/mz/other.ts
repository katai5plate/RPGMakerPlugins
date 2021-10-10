import { Bitmap } from "./core/Bitmap";

export type AnyObject = { [key: string | number]: AnyObject };

export type LoadEventListener = (that: Bitmap) => void;
export type TickHandler = (deltaTime: number) => void;

export type ColorTone = [r: number, g: number, b: number, gray: number];
export type BlendColor = [r: number, g: number, b: number, a: number];

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
  list: {
    code: number;
    parameters: [];
  }[];
  repeat: boolean;
  skippable: boolean;
  wait: boolean;
}
