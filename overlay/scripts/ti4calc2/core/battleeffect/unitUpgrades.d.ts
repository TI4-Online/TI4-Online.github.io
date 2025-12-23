import { Faction } from '../enums';
import { UnitType } from '../unit';
import { BattleEffect } from './battleEffects';
export declare const getAllUnitUpgrades: () => import("./battleEffects").NormalBattleEffect[];
export declare function getUnitUpgrade(faction: Faction, unitType: UnitType): BattleEffect | undefined;
