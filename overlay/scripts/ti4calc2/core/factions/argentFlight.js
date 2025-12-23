"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argentFlight = void 0;
/* eslint-disable @typescript-eslint/no-shadow */
const times_1 = __importDefault(require("lodash/times"));
const util_log_1 = require("../../util/util-log");
const battleEffects_1 = require("../battleeffect/battleEffects");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
exports.argentFlight = [
    {
        type: "faction",
        name: "Argent Flight flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), battleEffects: [
                        {
                            name: "Argent Flight flagship preventing pds",
                            type: "other",
                            place: enums_1.Place.space,
                            transformEnemyUnit: (unit, _participant, place) => {
                                if (place === enums_1.Place.space) {
                                    return Object.assign(Object.assign({}, unit), { spaceCannon: undefined });
                                }
                                else {
                                    return unit;
                                }
                            },
                        },
                    ] });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: "faction",
        name: "Argent Flight destroyers",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.destroyer) {
                unit.combat.hit = 8;
            }
            return unit;
        },
        afterAfb: (p, battle, otherParticipant) => {
            // raid formation
            (0, times_1.default)(otherParticipant.afbHitsToAssign.fighterHitsToAssign, () => {
                const bestSustainUnit = (0, unitGet_1.getLowestWorthSustainUnit)(otherParticipant, battle.place, true);
                if (bestSustainUnit) {
                    (0, util_log_1.logWrapper)(`${p.side === "attacker" ? "defender" : "attacker"} used sustain damage from Argent anti fighter barrage`);
                    bestSustainUnit.takenDamage = true;
                    bestSustainUnit.takenDamageRound = 0;
                }
            });
        },
    },
    {
        type: "faction-tech",
        name: "Strike Wing Alpha II",
        place: enums_1.Place.space,
        faction: enums_1.Faction.argent_flight,
        unit: unit_1.UnitType.destroyer,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.destroyer) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 7 }), afb: Object.assign(Object.assign({}, unit.afb), { hit: 6, count: 3 }) });
            }
            return unit;
        },
        afterAfb: (p, battle, otherParticipant) => {
            // raid formation
            (0, times_1.default)(otherParticipant.afbHitsToAssign.fighterHitsToAssign, () => {
                const bestSustainUnit = (0, unitGet_1.getLowestWorthSustainUnit)(otherParticipant, battle.place, true);
                if (bestSustainUnit) {
                    (0, util_log_1.logWrapper)(`${p.side === "attacker" ? "defender" : "attacker"} used sustain damage from Argent anti fighter barrage`);
                    bestSustainUnit.takenDamage = true;
                    bestSustainUnit.takenDamageRound = 0;
                }
            });
            // strike wing alpha II
            for (const rollInfo of otherParticipant.afbHitsToAssign.rollInfoList) {
                if (rollInfo.roll >= 9) {
                    const infantryToDestroy = (0, unitGet_1.getUnits)(otherParticipant, undefined, false) // place must be undefined or infantry are filtered out
                        .find((u) => u.type === unit_1.UnitType.infantry && !u.isDestroyed);
                    if (infantryToDestroy) {
                        (0, util_log_1.logWrapper)(`${p.side === "attacker" ? "defender" : "attacker"} destroyed infantry from Strike Wing Alpha II`);
                        infantryToDestroy.isDestroyed = true;
                    }
                }
            }
        },
    },
    {
        type: "promissary",
        description: "When 1 or more of your units make a roll for a unit ability: Choose 1 of those units to roll 1 additional die",
        name: "Strike Wing Ambuscade",
        place: "both",
        onSpaceCannon: (p, _battle, _otherP, effectName) => {
            // TODO say in theory that pds is disabled. Would strike wing ambuscade still be used here, if it could be used for afb instead?
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "spaceCannon", undefined);
            if (highestHitUnit) {
                highestHitUnit.spaceCannon.countBonusTmp += 1;
                (0, battleEffects_1.registerUse)(effectName, p);
            }
        },
        onAfb: (p, _battle, _otherP, effectName) => {
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "afb", undefined);
            if (highestHitUnit) {
                highestHitUnit.afb.countBonusTmp += 1;
                (0, battleEffects_1.registerUse)(effectName, p);
            }
        },
        onBombardment: (p, battle, _otherP, effectName) => {
            if (p.side === "attacker" && battle.place === enums_1.Place.ground) {
                const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "bombardment", undefined);
                if (highestHitUnit) {
                    highestHitUnit.bombardment.countBonusTmp += 1;
                    (0, battleEffects_1.registerUse)(effectName, p);
                }
            }
        },
        timesPerFight: 1,
    },
    {
        type: "commander",
        description: "When 1 or more of your units make a roll for a unit ability: You may choose 1 of those units to roll 1 additional die.",
        name: "Argent Flight Commander",
        place: "both",
        onAfb: (p) => {
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "afb", undefined);
            if (highestHitUnit) {
                highestHitUnit.afb.countBonusTmp += 1;
            }
        },
        onSpaceCannon: (p) => {
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "spaceCannon", undefined);
            if (highestHitUnit) {
                highestHitUnit.spaceCannon.countBonusTmp += 1;
            }
        },
        onBombardment: (p) => {
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "bombardment", undefined);
            if (highestHitUnit) {
                highestHitUnit.bombardment.countBonusTmp += 1;
            }
        },
    },
];
//# sourceMappingURL=argentFlight.js.map