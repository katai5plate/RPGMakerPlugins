export declare class Game_Action {
  // TODO: 必要になったらちゃんと設定する
  constructor(subject: unknown, forcing: unknown);
  public clear(): unknown;
  public setSubject(subject: unknown): unknown;
  public subject(): unknown;
  public friendsUnit(): unknown;
  public opponentsUnit(): unknown;
  public setEnemyAction(action: unknown): unknown;
  public setAttack(): unknown;
  public setGuard(): unknown;
  public setSkill(skillId: unknown): unknown;
  public setItem(itemId: unknown): unknown;
  public setItemObject(object: unknown): unknown;
  public setTarget(targetIndex: unknown): unknown;
  public item(): unknown;
  public isSkill(): unknown;
  public isItem(): unknown;
  public numRepeats(): unknown;
  public checkItemScope(list: unknown): unknown;
  public isForOpponent(): unknown;
  public isForFriend(): unknown;
  public isForDeadFriend(): unknown;
  public isForUser(): unknown;
  public isForOne(): unknown;
  public isForRandom(): unknown;
  public isForAll(): unknown;
  public needsSelection(): unknown;
  public numTargets(): unknown;
  public checkDamageType(list: unknown): unknown;
  public isHpEffect(): unknown;
  public isMpEffect(): unknown;
  public isDamage(): unknown;
  public isRecover(): unknown;
  public isDrain(): unknown;
  public isHpRecover(): unknown;
  public isMpRecover(): unknown;
  public isCertainHit(): unknown;
  public isPhysical(): unknown;
  public isMagical(): unknown;
  public isAttack(): unknown;
  public isGuard(): unknown;
  public isMagicSkill(): unknown;
  public decideRandomTarget(): unknown;
  public setConfusion(): unknown;
  public prepare(): unknown;
  public isValid(): unknown;
  public speed(): unknown;
  public makeTargets(): unknown;
  public repeatTargets(targets: unknown): unknown;
  public confusionTarget(): unknown;
  public targetsForOpponents(): unknown;
  public targetsForFriends(): unknown;
  public evaluate(): unknown;
  public itemTargetCandidates(): unknown;
  public evaluateWithTarget(target: unknown): unknown;
  public testApply(target: unknown): unknown;
  public hasItemAnyValidEffects(target: unknown): unknown;
  public testItemEffect(target: unknown, effect: unknown): unknown;
  public itemCnt(target: unknown): unknown;
  public itemMrf(target: unknown): unknown;
  public itemHit(target: unknown): unknown;
  public itemEva(target: unknown): unknown;
  public itemCri(target: unknown): unknown;
  public apply(target: unknown): unknown;
  public makeDamageValue(target: unknown, critical: unknown): unknown;
  public evalDamageFormula(target: unknown): unknown;
  public calcElementRate(target: unknown): unknown;
  public elementsMaxRate(target: unknown, elements: unknown): unknown;
  public applyCritical(damage: unknown): unknown;
  public applyVariance(damage: unknown, variance: unknown): unknown;
  public applyGuard(damage: unknown, target: unknown): unknown;
  public executeDamage(target: unknown, value: unknown): unknown;
  public executeHpDamage(target: unknown, value: unknown): unknown;
  public executeMpDamage(target: unknown, value: unknown): unknown;
  public gainDrainedHp(value: unknown): unknown;
  public gainDrainedMp(value: unknown): unknown;
  public applyItemEffect(target: unknown, effect: unknown): unknown;
  public itemEffectRecoverHp(target: unknown, effect: unknown): unknown;
  public itemEffectRecoverMp(target: unknown, effect: unknown): unknown;
  public itemEffectGainTp(target: unknown, effect: unknown): unknown;
  public itemEffectAddState(target: unknown, effect: unknown): unknown;
  public itemEffectAddAttackState(target: unknown, effect: unknown): unknown;
  public itemEffectAddNormalState(target: unknown, effect: unknown): unknown;
  public itemEffectRemoveState(target: unknown, effect: unknown): unknown;
  public itemEffectAddBuff(target: unknown, effect: unknown): unknown;
  public itemEffectAddDebuff(target: unknown, effect: unknown): unknown;
  public itemEffectRemoveBuff(target: unknown, effect: unknown): unknown;
  public itemEffectRemoveDebuff(target: unknown, effect: unknown): unknown;
  public itemEffectSpecial(target: unknown, effect: unknown): unknown;
  public itemEffectGrow(target: unknown, effect: unknown): unknown;
  public itemEffectLearnSkill(target: unknown, effect: unknown): unknown;
  public itemEffectCommonEvent(target: unknown, effect: unknown): unknown;
  public makeSuccess(target: unknown): unknown;
  public applyItemUserEffect(target: unknown): unknown;
  public lukEffectRate(target: unknown): unknown;
  public applyGlobal(): unknown;

  static EFFECT_ADD_BUFF: 31;
  static EFFECT_ADD_DEBUFF: 32;
  static EFFECT_ADD_STATE: 21;
  static EFFECT_COMMON_EVENT: 44;
  static EFFECT_GAIN_TP: 13;
  static EFFECT_GROW: 42;
  static EFFECT_LEARN_SKILL: 43;
  static EFFECT_RECOVER_HP: 11;
  static EFFECT_RECOVER_MP: 12;
  static EFFECT_REMOVE_BUFF: 33;
  static EFFECT_REMOVE_DEBUFF: 34;
  static EFFECT_REMOVE_STATE: 22;
  static EFFECT_SPECIAL: 41;
  static HITTYPE_CERTAIN: 0;
  static HITTYPE_MAGICAL: 2;
  static HITTYPE_PHYSICAL: 1;
  static SPECIAL_EFFECT_ESCAPE: 0;
  public _subjectActorId: number;
  public _subjectEnemyIndex: number;
  public _targetIndex: number;
}
