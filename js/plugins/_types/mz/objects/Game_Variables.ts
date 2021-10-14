import { VariableValue } from "../other";

export declare class Game_Variables {
  constructor();
  public clear(): void;
  public value(variableId: number): VariableValue;
  public setValue(variableId: number, value: VariableValue): void;
  public onChange(): void;

  public _data: [undefined, ...VariableValue[]];
}
