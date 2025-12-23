"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naalu = void 0;
/* eslint-disable @typescript-eslint/no-shadow */
const battle_1 = require("../battle");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.naalu = [
    {
        type: "faction",
        name: "Naalu flagship",
        place: "both",
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), battleEffects: [
                        {
                            name: "Naalu flagship ability",
                            type: "other",
                            place: enums_1.Place.ground,
                            transformUnit: (unit, p) => {
                                if (unit.type === unit_1.UnitType.fighter && p.side === "attacker") {
                                    return Object.assign(Object.assign({}, unit), { isGroundForce: true });
                                }
                                else {
                                    return unit;
                                }
                            },
                            onCombatRoundEnd: (participant, battle) => {
                                // TODO there is a complicated situation here. If fighters are upgraded, they are better than infantry but are killed first.
                                // Optimal strategy is to kill all but one infantry, and then fighters, but our model does not support that.
                                // return fighters to space!
                                if (!(0, battle_1.isBattleOngoing)(battle)) {
                                    participant.units.forEach((unit) => {
                                        if (unit.type === unit_1.UnitType.fighter) {
                                            unit.isGroundForce = false;
                                        }
                                    });
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
        name: "Naalu fighters",
        place: "both",
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.fighter) {
                unit.combat.hit = 8;
            }
            return unit;
        },
    },
    {
        type: "faction-tech",
        name: "Hybrid Crystal Fighter II",
        place: "both",
        faction: enums_1.Faction.naalu,
        unit: unit_1.UnitType.fighter,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.fighter) {
                unit.combat.hit = 7;
            }
            return unit;
        },
    },
    {
        type: "faction-ability",
        name: "Codex mech",
        description: "Use Naalu's Codex III Mech: Other players cannot use ANTI-FIGHTER BARRAGE against your units in this system.",
        place: "both",
        faction: enums_1.Faction.naalu,
        transformUnit: (unit, _p) => {
            if (unit.type === unit_1.UnitType.mech) {
                return Object.assign(Object.assign({}, unit), { battleEffects: [
                        {
                            name: "Naalu mech remove afb",
                            type: "other",
                            place: "both",
                            transformEnemyUnit: (u) => {
                                return Object.assign(Object.assign({}, u), { afb: undefined });
                            },
                        },
                    ] });
            }
            else {
                return unit;
            }
        },
    },
];
//# sourceMappingURL=naalu.js.map