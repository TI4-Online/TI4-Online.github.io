import { OnDeathEffect, OnHitEffect, Participant, ParticipantEffect, ParticipantInstance, Side, UnitAuraEffect, UnitAuraGroupEffect, UnitBattleEffect, UnitEffect } from '../battle-types';
import { Faction, Place } from '../enums';
import { UnitType } from '../unit';
export type BattleEffect = NormalBattleEffect | FactionBattleEffect;
export interface NormalBattleEffect extends SharedStuffBattleEffect {
    type: 'general' | 'promissary' | 'commander' | 'agent' | 'tech' | 'agenda' | 'action-card' | 'relic' | 'unit-upgrade' | 'other' | 'faction';
    faction?: undefined;
}
export interface FactionBattleEffect extends SharedStuffBattleEffect {
    type: 'faction-tech' | 'faction-ability';
    faction: Faction;
}
interface SharedStuffBattleEffect {
    name: string;
    description?: string;
    side?: Side;
    place: Place | 'both';
    unit?: UnitType;
    count?: boolean;
    symmetrical?: boolean;
    priority?: number;
    transformUnit?: UnitEffect;
    transformEnemyUnit?: UnitEffect;
    beforeStart?: ParticipantEffect;
    onStart?: ParticipantEffect;
    onSustain?: UnitBattleEffect;
    onEnemySustain?: UnitBattleEffect;
    onRepair?: UnitBattleEffect;
    onCombatRoundEnd?: ParticipantEffect;
    onCombatRoundEndBeforeAssign?: ParticipantEffect;
    afterAfb?: ParticipantEffect;
    onDeath?: OnDeathEffect;
    onSpaceCannon?: ParticipantEffect;
    onBombardment?: ParticipantEffect;
    onAfb?: ParticipantEffect;
    onCombatRound?: ParticipantEffect;
    onHit?: OnHitEffect;
    onBombardmentHit?: OnHitEffect;
    timesPerRound?: number;
    timesPerFight?: number;
}
export interface BattleAura {
    name: string;
    place: Place | 'both';
    transformUnit?: UnitAuraEffect;
    transformEnemyUnit?: UnitAuraEffect;
    onCombatRoundStart?: UnitAuraGroupEffect;
    timesPerRound?: number;
    timesPerFight?: number;
}
export declare const entropicScar: BattleEffect;
export declare const defendingInNebula: BattleEffect;
export declare function getAllBattleEffects(): BattleEffect[];
export declare function getOtherBattleEffects(): BattleEffect[];
export declare function isBattleEffectRelevantForSome(effect: BattleEffect, participant: Participant[]): boolean;
export declare function isBattleEffectRelevant(effect: BattleEffect, participant: Participant): boolean;
export declare function registerUse(effectName: string, p: ParticipantInstance): void;
export declare function canBattleEffectBeUsed(effect: BattleEffect | BattleAura, participant: ParticipantInstance): boolean;
export {};
