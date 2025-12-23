"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baronyOfLetnev = void 0;
/* eslint-disable @typescript-eslint/no-shadow */
const util_log_1 = require("../../util/util-log");
const battle_types_1 = require("../battle-types");
const battleEffects_1 = require("../battleeffect/battleEffects");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
exports.baronyOfLetnev = [
    {
        type: "faction",
        name: "Barony of Letnev flagship",
        place: "both",
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), bombardment: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 }), battleEffects: [
                        {
                            name: "Barony flagship remove planetary shield",
                            type: "other",
                            place: "both",
                            transformEnemyUnit: (u) => {
                                return Object.assign(Object.assign({}, u), { planetaryShield: false });
                            },
                        },
                        {
                            name: "Barony flagship repair",
                            type: "other",
                            place: enums_1.Place.space,
                            onCombatRound: (participant) => {
                                participant.units.forEach((unit) => {
                                    if (unit.type === unit_1.UnitType.flagship) {
                                        unit.takenDamage = false;
                                    }
                                });
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
        name: "Mech deploy",
        description: "At the start of a round of ground combat, you may spend 2 resources to replace 1 of your infantry in that combat with 1 mech.",
        type: "faction-ability",
        place: enums_1.Place.ground,
        faction: enums_1.Faction.barony_of_letnev,
        count: true,
        onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
            var _a;
            if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
                const infantryIndex = participant.units.findIndex((u) => u.type === unit_1.UnitType.infantry);
                if (infantryIndex !== -1) {
                    const infantry = participant.units[infantryIndex];
                    const genericMech = unit_1.UNIT_MAP[unit_1.UnitType.mech];
                    if (infantry && infantry.combat) {
                        participant.units[infantryIndex] = Object.assign(Object.assign({}, genericMech), { takenDamage: false, usedSustain: false, isDestroyed: false, combat: Object.assign(Object.assign({}, infantry.combat), { hit: genericMech.combat.hit }) });
                        (0, util_log_1.logWrapper)(`${participant.side} used mech deploy ability to transform an infantry into a mech`);
                    }
                }
                if (participant.effects[effectName] !== undefined) {
                    participant.effects[effectName] -= 1;
                }
            }
        },
    },
    {
        name: "Non-Euclidean Shielding",
        description: "When 1 of your units uses SUSTAIN DAMAGE, cancel 2 hits instead of 1.",
        type: "faction-tech",
        place: "both",
        faction: enums_1.Faction.barony_of_letnev,
        onSustain: (_unit, participant, _battle) => {
            if (participant.hitsToAssign.hitsToNonFighters > 0) {
                participant.hitsToAssign.hitsToNonFighters -= 1;
            }
            else if (participant.hitsToAssign.hits > 0) {
                participant.hitsToAssign.hits -= 1;
            }
        },
    },
    {
        name: "L4 Disruptors",
        description: "During an invasion, units cannot use SPACE CANNON against your units.",
        type: "faction-tech",
        place: enums_1.Place.ground,
        faction: enums_1.Faction.barony_of_letnev,
        priority: battle_types_1.EFFECT_LOW_PRIORITY,
        transformEnemyUnit: (unit) => {
            return Object.assign(Object.assign({}, unit), { spaceCannon: undefined });
        },
    },
    {
        name: "Munitions Reserves",
        description: "At the start of each round of space combat, you may spend 2 trade goods;  you may re-roll any number of your dice during that combat round.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.barony_of_letnev,
        count: true,
        onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
            var _a;
            if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
                participant.units.forEach((unit) => {
                    if (unit.combat) {
                        unit.combat.rerollBonusTmp += 1;
                    }
                });
                if (participant.effects[effectName] !== undefined) {
                    participant.effects[effectName] -= 1;
                }
            }
        },
    },
    {
        name: "War Funding",
        // TODO this could use the "worse than average" thingy
        description: "After you and your opponent roll dice during space combat: You may reroll all of your opponent's dice.  You may reroll any number of your dice. In this simulation it only rerolls your dice.",
        type: "promissary",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            return (0, unit_1.getUnitWithImproved)(unit, "combat", "reroll", "temp");
        },
    },
    {
        name: "Barony Agent",
        description: "At the start of a Space Combat round: You may exhaust this card to choose 1 ship in the active system. That ship rolls 1 additional die during this combat round.",
        type: "agent",
        place: enums_1.Place.space,
        onCombatRound: (p, _battle, _otherParticipant, effectName) => {
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "combat", enums_1.Place.space);
            if (highestHitUnit && highestHitUnit.combat) {
                highestHitUnit.combat.countBonusTmp += 1;
                (0, battleEffects_1.registerUse)(effectName, p);
            }
        },
        timesPerFight: 1,
    },
    //TODO: Currently just picks the unit with the highest dice count. It could be smarter and include the "cap" on hit-bonus, reroll-value and stuff like that.
    {
        name: "Gravleash Maneuvers",
        description: "Barony Breakthrough: Before you roll dice during space combat, apply +X to the results of 1 of your ship's rolls, where X is the number of ship types you have in the combat.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.barony_of_letnev,
        onStart: (p, _b, _op) => {
            const highestDiceCountUnit = (0, unitGet_1.getHighestDiceCountUnit)(p, "combat", enums_1.Place.space);
            if (highestDiceCountUnit && highestDiceCountUnit.combat) {
                const units = (0, unitGet_1.getUnits)(p, enums_1.Place.space, true);
                const numUniqueUnits = [
                    ...new Set(units.map((unit) => unit.type)),
                ].length;
                highestDiceCountUnit.combat.hitBonus += numUniqueUnits;
                (0, util_log_1.logWrapper)(`${p.side} used Gravleash Maneuvers to give ${highestDiceCountUnit.type} with their ${highestDiceCountUnit.combat.count + highestDiceCountUnit.combat.countBonus + highestDiceCountUnit.combat.countBonusTmp} dice a +${numUniqueUnits} to hit.`);
            }
        },
        priority: battle_types_1.EFFECT_LOW_PRIORITY,
    },
];
//# sourceMappingURL=baronyOfLetnev.js.map