import { Class, Item } from "../data";

export declare class Game_Item {
  constructor(item?: unknown); // FIXME: 引数使ってる？
  public isSkill(): boolean;
  public isItem(): boolean;
  public isUsableItem(): boolean;
  public isWeapon(): boolean;
  public isArmor(): boolean;
  public isEquipItem(): boolean;
  public isNull(): boolean;
  public itemId(): boolean;
  public object(): Item;
  public setObject(item: Item): void;
  public setEquip(isWeapon: boolean, itemId: number): void;

  public _dataClass: Class;
  public _itemId: number;
}
