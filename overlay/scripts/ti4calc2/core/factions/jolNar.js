"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jolNar = void 0;
/* eslint-disable @typescript-eslint/no-shadow */
const battle_types_1 = require("../battle-types");
const battleEffects_1 = require("../battleeffect/battleEffects");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.jolNar = [
    {
        type: "faction",
        name: "Jol-Nar flagship",
        place: enums_1.Place.space,
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 2 }), onHit: (_participant, _battle, _otherParticipant, hitInfo) => {
                        hitInfo.rollInfoList.forEach((rollInfo) => {
                            if (rollInfo.roll > 9) {
                                hitInfo.hits += 2;
                            }
                        });
                    } });
            }
            else {
                return unit;
            }
        },
    },
    {
        name: "Jol-Nar Fragile ability",
        type: "faction",
        place: "both",
        transformUnit: (u) => {
            return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "permanent", -1);
        },
    },
    {
        type: "faction",
        name: "Jol-Nar mech",
        place: enums_1.Place.ground,
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.mech) {
                return Object.assign(Object.assign({}, unit), { aura: [
                        {
                            name: "Jol-Nar mech aura",
                            place: enums_1.Place.ground,
                            onCombatRoundStart: (auraUnits, p, _battle, effectName) => {
                                for (const unit of auraUnits) {
                                    if (unit.type === unit_1.UnitType.infantry) {
                                        unit.combat.hitBonusTmp += 1;
                                    }
                                }
                                (0, battleEffects_1.registerUse)(effectName, p);
                            },
                            timesPerRound: 1,
                        },
                    ] });
            }
            else {
                return unit;
            }
        },
    },
    {
        name: "Jol-Nar commander",
        description: "After you roll dice for a unit ability: You may reroll any of those dice.",
        type: "commander",
        place: "both",
        transformUnit: (unit) => {
            if (unit.spaceCannon) {
                unit = (0, unit_1.getUnitWithImproved)(unit, "spaceCannon", "reroll", "permanent");
            }
            if (unit.afb) {
                unit = (0, unit_1.getUnitWithImproved)(unit, "afb", "reroll", "permanent");
            }
            if (unit.bombardment) {
                unit = (0, unit_1.getUnitWithImproved)(unit, "bombardment", "reroll", "permanent");
            }
            return unit;
        },
    },
];
//# sourceMappingURL=jolNar.js.map