import { PartialRecord } from '../util/util-types';
import { BattleEffect } from './battleeffect/battleEffects';
import { Faction, Place } from './enums';
import { HitInfo, RollInfo } from './roll';
import { UnitInstance, UnitType } from './unit';
export type Side = 'attacker' | 'defender';
export declare function isSide(value: unknown): value is Side;
export type UnitEffect = (u: UnitInstance, p: ParticipantInstance, place: Place, effectName: string) => UnitInstance;
export type UnitAuraEffect = (auraUnit: UnitInstance, participant: ParticipantInstance, battle: BattleInstance) => UnitInstance;
export type UnitAuraGroupEffect = (auraUnits: UnitInstance[], participant: ParticipantInstance, battle: BattleInstance, effectName: string) => void;
export type UnitBattleEffect = (u: UnitInstance, participant: ParticipantInstance, battle: BattleInstance, effectName: string, isDuringCombat: boolean) => void;
export type ParticipantEffect = (participant: ParticipantInstance, battle: BattleInstance, otherParticipant: ParticipantInstance, effectName: string) => void;
export type OnHitEffect = (participant: ParticipantInstance, battle: BattleInstance, otherParticipant: ParticipantInstance, hitInfo: HitInfo) => void;
export type OnDeathEffect = (deadUnits: UnitInstance[], participant: ParticipantInstance, otherParticipant: ParticipantInstance, battle: BattleInstance, isOwnUnit: boolean, effectName: string) => void;
export interface Battle {
    place: Place;
    attacker: Participant;
    defender: Participant;
}
export interface Participant {
    faction: Faction;
    side: Side;
    units: {
        [key in UnitType]: number;
    };
    unitUpgrades: PartialRecord<UnitType, boolean>;
    damagedUnits: PartialRecord<UnitType, number>;
    battleEffects: Record<string, number | undefined>;
    riskDirectHit: boolean;
}
export interface BattleInstance {
    place: Place;
    attacker: ParticipantInstance;
    defender: ParticipantInstance;
    roundNumber: number;
}
export interface ParticipantInstance {
    side: Side;
    faction: Faction;
    units: UnitInstance[];
    unitUpgrades: PartialRecord<UnitType, boolean>;
    newUnits: UnitInstance[];
    allUnitTransform: UnitEffect[];
    beforeStartEffect: BattleEffect[];
    onStartEffect: BattleEffect[];
    onSustainEffect: BattleEffect[];
    onEnemySustainEffect: BattleEffect[];
    onRepairEffect: BattleEffect[];
    onCombatRoundEnd: BattleEffect[];
    onCombatRoundEndBeforeAssign: BattleEffect[];
    afterAfbEffect: BattleEffect[];
    onSpaceCannon: BattleEffect[];
    onBombardment: BattleEffect[];
    onAfb: BattleEffect[];
    onCombatRound: BattleEffect[];
    onDeath: BattleEffect[];
    onHit: BattleEffect[];
    onBombardmentHit: BattleEffect[];
    effects: Record<string, number>;
    riskDirectHit: boolean;
    soakHits: number;
    hitsToAssign: HitsToAssign;
    afbHitsToAssign: AfbHitsToAssign;
    roundActionTracker: PartialRecord<string, number>;
    fightActionTracker: PartialRecord<string, number>;
}
export interface HitsToAssign {
    hits: number;
    hitsToNonFighters: number;
    hitsAssignedByEnemy: number;
}
export interface AfbHitsToAssign {
    fighterHitsToAssign: number;
    rollInfoList: RollInfo[];
}
export interface BattleResult {
    winner: BattleWinner;
    units: string;
}
export declare enum BattleWinner {
    attacker = "attacker",
    draw = "draw",
    defender = "defender"
}
export declare const EFFECT_HIGH_PRIORITY = 75;
export declare const EFFECT_DEFAULT_PRIORITY = 50;
export declare const EFFECT_LOW_PRIORITY = 25;
