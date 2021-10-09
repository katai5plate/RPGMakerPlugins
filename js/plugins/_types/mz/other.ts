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
