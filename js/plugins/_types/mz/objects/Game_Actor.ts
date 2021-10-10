import { MZSynbol } from "../other";
import { Game_Battler } from "..";

export declare class Game_Actor extends Game_Battler {
  constructor(actorId: number);
  // TODO: 必要になったらちゃんと設定する
  public initMembers(): unknown;
  public setup(actorId: number): unknown;
  public actorId(): unknown;
  public actor(): unknown;
  public name(): unknown;
  public setName(name: string): unknown;
  public nickname(): unknown;
  public setNickname(nickname: string): unknown;
  public profile(): unknown;
  public setProfile(profile: unknown): unknown;
  public characterName(): unknown;
  public characterIndex(): unknown;
  public faceName(): unknown;
  public faceIndex(): unknown;
  public battlerName(): unknown;
  public clearStates(): unknown;
  public eraseState(stateId: number): unknown;
  public resetStateCounts(stateId: number): unknown;
  public initImages(): unknown;
  public expForLevel(level: unknown): unknown;
  public initExp(): unknown;
  public currentExp(): unknown;
  public currentLevelExp(): unknown;
  public nextLevelExp(): unknown;
  public nextRequiredExp(): unknown;
  public maxLevel(): unknown;
  public isMaxLevel(): unknown;
  public initSkills(): unknown;
  public initEquips(equips: unknown): unknown;
  public equipSlots(): unknown;
  public equips(): unknown;
  public weapons(): unknown;
  public armors(): unknown;
  public hasWeapon(weapon: unknown): unknown;
  public hasArmor(armor: unknown): unknown;
  public isEquipChangeOk(slotId: unknown): unknown;
  public changeEquip(slotId: unknown, item: unknown): unknown;
  public forceChangeEquip(slotId: unknown, item: unknown): unknown;
  public tradeItemWithParty(newItem: unknown, oldItem: unknown): unknown;
  public changeEquipById(etypeId: unknown, itemId: unknown): unknown;
  public isEquipped(item: unknown): unknown;
  public discardEquip(item: unknown): unknown;
  public releaseUnequippableItems(forcing: unknown): unknown;
  public clearEquipments(): unknown;
  public optimizeEquipments(): unknown;
  public bestEquipItem(slotId: unknown): unknown;
  public calcEquipItemPerformance(item: unknown): unknown;
  public isSkillWtypeOk(skill: unknown): unknown;
  public isWtypeEquipped(wtypeId: unknown): unknown;
  public refresh(): unknown;
  public isActor(): unknown;
  public friendsUnit(): unknown;
  public opponentsUnit(): unknown;
  public index(): unknown;
  public isBattleMember(): unknown;
  public isFormationChangeOk(): unknown;
  public currentClass(): unknown;
  public isClass(gameClass: unknown): unknown;
  public skills(): unknown;
  public usableSkills(): unknown;
  public traitObjects(): unknown;
  public attackElements(): unknown;
  public hasNoWeapons(): unknown;
  public bareHandsElementId(): unknown;
  public paramMax(paramId: unknown): unknown;
  public paramBase(paramId: unknown): unknown;
  public paramPlus(paramId: unknown): unknown;
  public attackAnimationId1(): unknown;
  public attackAnimationId2(): unknown;
  public bareHandsAnimationId(): unknown;
  public changeExp(exp: unknown, show: unknown): unknown;
  public levelUp(): unknown;
  public levelDown(): unknown;
  public findNewSkills(lastSkills: unknown): unknown;
  public displayLevelUp(newSkills: unknown): unknown;
  public gainExp(exp: unknown): unknown;
  public finalExpRate(): unknown;
  public benchMembersExpRate(): unknown;
  public shouldDisplayLevelUp(): unknown;
  public changeLevel(level: unknown, show: unknown): unknown;
  public learnSkill(skillId: unknown): unknown;
  public forgetSkill(skillId: unknown): unknown;
  public isLearnedSkill(skillId: unknown): unknown;
  public hasSkill(skillId: unknown): unknown;
  public changeClass(classId: unknown, keepExp: unknown): unknown;
  public setCharacterImage(characterName, characterIndex: unknown): unknown;
  public setFaceImage(facename: string, faceIndex: unknown): unknown;
  public setBattlerImage(battlername: string): unknown;
  public isSpriteVisible(): unknown;
  public startAnimation(
    animationId: unknown,
    mirror: unknown,
    delay: unknown
  ): unknown;
  public performActionStart(action: unknown): unknown;
  public performAction(action: unknown): unknown;
  public performActionEnd(): unknown;
  public performAttack(): unknown;
  public performDamage(): unknown;
  public performEvasion(): unknown;
  public performMagicEvasion(): unknown;
  public performCounter(): unknown;
  public performCollapse(): unknown;
  public performVictory(): unknown;
  public performEscape(): unknown;
  public makeActionList(): unknown;
  public makeAutoBattleActions(): unknown;
  public makeConfusionActions(): unknown;
  public makeActions(): unknown;
  public onPlayerWalk(): unknown;
  public updateStateSteps(state: unknown): unknown;
  public showAddedStates(): unknown;
  public showRemovedStates(): unknown;
  public stepsForTurn(): unknown;
  public turnEndOnMap(): unknown;
  public checkFloorEffect(): unknown;
  public executeFloorDamage(): unknown;
  public basicFloorDamage(): unknown;
  public maxFloorDamage(): unknown;
  public performMapDamage(): unknown;
  public clearActions(): unknown;
  public inputtingAction(): unknown;
  public selectNextCommand(): unknown;
  public selectPreviousCommand(): unknown;
  public lastMenuSkill(): unknown;
  public setLastMenuSkill(skill: unknown): unknown;
  public lastBattleSkill(): unknown;
  public setLastBattleSkill(skill: unknown): unknown;
  public lastCommandSymbol(): unknown;
  public setLastCommandSymbol(symbol: unknown): unknown;
  public testEscape(item: unknown): unknown;
  public meetsUsableItemConditions(item: unknown): unknown;

  public readonly level: number;

  public _actionInputIndex: number;
  public _actorId: number;
  public _battlername: string;
  public _characterIndex: number;
  public _charactername: string;
  public _classId: number;
  public _equips: Game_Item[];
  public _exp: { [classId: string]: number };
  public _faceIndex: number;
  public _facename: string;
  public _lastCommandSymbol: MZSynbol;
  public _level: number;
  public _name: string;
  public _nickname: string;
  public _profile: string;
  public _skills: number[];
  public _stateSteps: { [stateId: number]: number };
}
