import { EffectType, MotionType } from "../other";
import { Game_Action, Game_BattlerBase } from "..";

export declare class Game_Battler extends Game_BattlerBase {
  constructor();
  // TODO: 必要になったらちゃんと設定する
  public initMembers(): unknown;
  public clearAnimations(): unknown;
  public clearDamagePopup(): unknown;
  public clearWeaponAnimation(): unknown;
  public clearEffect(): unknown;
  public clearMotion(): unknown;
  public requestEffect(effectType: unknown): unknown;
  public requestMotion(motionType: unknown): unknown;
  public requestMotionRefresh(): unknown;
  public select(): unknown;
  public deselect(): unknown;
  public isAnimationRequested(): unknown;
  public isDamagePopupRequested(): unknown;
  public isEffectRequested(): unknown;
  public isMotionRequested(): unknown;
  public isWeaponAnimationRequested(): unknown;
  public isMotionRefreshRequested(): unknown;
  public isSelected(): unknown;
  public effectType(): unknown;
  public motionType(): unknown;
  public weaponImageId(): unknown;
  public shiftAnimation(): unknown;
  public startAnimation(
    animationId: unknown,
    mirror: unknown,
    delay: unknown
  ): unknown;
  public startDamagePopup(): unknown;
  public startWeaponAnimation(weaponImageId: unknown): unknown;
  public action(index: unknown): unknown;
  public setAction(index: unknown, action: unknown): unknown;
  public numActions(): unknown;
  public clearActions(): unknown;
  public result(): unknown;
  public clearResult(): unknown;
  public refresh(): unknown;
  public addState(stateId: unknown): unknown;
  public isStateAddable(stateId: unknown): unknown;
  public isStateRestrict(stateId: unknown): unknown;
  public onRestrict(): unknown;
  public removeState(stateId: unknown): unknown;
  public escape(): unknown;
  public addBuff(paramId: unknown, turns: unknown): unknown;
  public addDebuff(paramId: unknown, turns: unknown): unknown;
  public removeBuff(paramId: unknown): unknown;
  public removeBattleStates(): unknown;
  public removeAllBuffs(): unknown;
  public removeStatesAuto(timing: unknown): unknown;
  public removeBuffsAuto(): unknown;
  public removeStatesByDamage(): unknown;
  public makeActionTimes(): unknown;
  public makeActions(): unknown;
  public speed(): unknown;
  public makeSpeed(): unknown;
  public currentAction(): unknown;
  public removeCurrentAction(): unknown;
  public setLastTarget(target: unknown): unknown;
  public forceAction(skillId: unknown, targetIndex: unknown): unknown;
  public useItem(item: unknown): unknown;
  public consumeItem(item: unknown): unknown;
  public gainHp(value: unknown): unknown;
  public gainMp(value: unknown): unknown;
  public gainTp(value: unknown): unknown;
  public gainSilentTp(value: unknown): unknown;
  public initTp(): unknown;
  public clearTp(): unknown;
  public chargeTpByDamage(damageRate: unknown): unknown;
  public regenerateHp(): unknown;
  public maxSlipDamage(): unknown;
  public regenerateMp(): unknown;
  public regenerateTp(): unknown;
  public regenerateAll(): unknown;
  public onBattleStart(): unknown;
  public onAllActionsEnd(): unknown;
  public onTurnEnd(): unknown;
  public onBattleEnd(): unknown;
  public onDamage(value: unknown): unknown;
  public setActionState(actionState: unknown): unknown;
  public isUndecided(): unknown;
  public isInputting(): unknown;
  public isWaiting(): unknown;
  public isActing(): unknown;
  public isChanting(): unknown;
  public isGuardWaiting(): unknown;
  public performActionStart(action: unknown): unknown;
  public performAction(action: unknown): unknown;
  public performActionEnd(): unknown;
  public performDamage(): unknown;
  public performMiss(): unknown;
  public performRecovery(): unknown;
  public performEvasion(): unknown;
  public performMagicEvasion(): unknown;
  public performCounter(): unknown;
  public performReflection(): unknown;
  public performSubstitute(target: unknown): unknown;
  public performCollapse(): unknown;

  public _actionState: string;
  public _actions: Game_Action[];
  public _animations: { animationId: number; mirror: unknown; delay: number }[];
  public _damagePopup: boolean;
  public _effectType: EffectType;
  public _lastTargetIndex: number;
  public _motionRefresh: boolean;
  public _motionType: MotionType;
  public hpAffected: number;
  public hpDamage: number;
  public _selected: boolean;
  public _speed: number;
  public _weaponImageId: number;
}