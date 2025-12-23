import { OnHitEffect, ParticipantInstance } from './battle-types';
import { BattleAura, BattleEffect } from './battleeffect/battleEffects';
import { Place } from './enums';
export declare enum UnitType {
    cruiser = "cruiser",
    carrier = "carrier",
    destroyer = "destroyer",
    dreadnought = "dreadnought",
    fighter = "fighter",
    flagship = "flagship",
    infantry = "infantry",
    mech = "mech",
    pds = "pds",
    warsun = "warsun",
    other = "other",// Used by for example experimental battle station and titans hero
    nonunit = "nonunit"
}
export interface Unit {
    type: UnitType;
    combat?: Roll;
    bombardment?: Roll;
    afb?: Roll;
    spaceCannon?: Roll;
    sustainDamage: boolean;
    immuneToDirectHit?: boolean;
    planetaryShield: boolean;
    assignHitsToNonFighters?: boolean;
    preventEnemySustain?: boolean;
    preventEnemySustainOnPlanet?: boolean;
    isShip: boolean;
    isGroundForce: boolean;
    useSustainDamagePriority?: number;
    diePriority?: number;
    aura?: BattleAura[];
    battleEffects?: BattleEffect[];
    onHit?: OnHitEffect;
}
export interface UnitInstance extends Unit {
    takenDamage: boolean;
    usedSustain: boolean;
    takenDamageRound?: number;
    isDestroyed: boolean;
}
export interface UnitWithCombat extends UnitInstance {
    combat: Roll;
}
export interface Roll {
    hit: number;
    hitBonus: number;
    hitBonusTmp: number;
    count: number;
    countBonus: number;
    countBonusTmp: number;
    reroll: number;
    rerollBonus: number;
    rerollBonusTmp: number;
}
export declare const defaultRoll: Roll;
export declare const UNIT_MAP: Record<UnitType, Readonly<Unit>>;
export declare function getUnitWithImproved(unit: UnitInstance, rollType: 'combat' | 'bombardment' | 'spaceCannon' | 'afb', how: 'hit' | 'count' | 'reroll', duration: 'permanent' | 'temp', value?: number): UnitInstance;
export declare function createUnit(type: UnitType): UnitInstance;
/**
 * This function takes a `modify` function and returns `Readonly` since it will apply battle effects to the
 * unit, and all modifications needs to be done BEFORE battle effects.
 * So if you want to modify the unit, do it in the `modify` function.
 * `Readonly` is only to prevent accidental modification directly after using this function.
 */
export declare function createUnitAndApplyEffects(type: UnitType, participant: ParticipantInstance, place: Place, modify: (instance: UnitInstance) => void): Readonly<UnitInstance>;
