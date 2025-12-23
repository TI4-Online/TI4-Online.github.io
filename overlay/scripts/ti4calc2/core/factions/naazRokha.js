"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naazRokha = void 0;
const util_log_1 = require("../../util/util-log");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.naazRokha = [
    {
        type: 'faction',
        name: 'Naaz-Rokha flagship',
        place: 'both',
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), aura: [
                        {
                            name: 'Naaz-Rokha flagship aura',
                            type: 'other',
                            place: 'both',
                            transformUnit: (auraUnit) => {
                                if (auraUnit.type === unit_1.UnitType.mech) {
                                    return (0, unit_1.getUnitWithImproved)(auraUnit, 'combat', 'count', 'temp');
                                }
                                else {
                                    return auraUnit;
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
        type: 'faction',
        name: 'Naaz-Rokha mech',
        place: 'both',
        transformUnit: (unit, _p, place) => {
            if (unit.type === unit_1.UnitType.mech) {
                if (place === enums_1.Place.space) {
                    return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 8, count: 2 }), sustainDamage: false, isShip: true, isGroundForce: false });
                }
                else {
                    return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 2 }), sustainDamage: true, isShip: false, isGroundForce: true });
                }
            }
            else {
                return unit;
            }
        },
    },
    {
        name: 'Supercharge',
        description: "At the start of a combat round, you may exhaust this card to apply +1 to the result of each of your unit's combat rolls during this combat round",
        type: 'faction-tech',
        place: 'both',
        faction: enums_1.Faction.naaz_rokha,
        transformUnit: (unit) => {
            return (0, unit_1.getUnitWithImproved)(unit, 'combat', 'hit', 'temp');
        },
    },
    // TODO: Cannot be assigned hits from Unit abilities. Suggestion: Add "immuneToabilities" property to units and check for that in all relevant places
    {
        name: 'Eidolon Maximum',
        description: 'Naaz-Rokha Breakthrough: This unit is both a ship and a ground force. It cannot be assigned hits from unit abilities. Repair it at the start of every combat round. WARNING: Immunity to abilities is not yet implemented',
        type: 'faction-ability',
        place: 'both',
        faction: enums_1.Faction.naaz_rokha,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.mech) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 4, count: 4 }), sustainDamage: true, isShip: true, isGroundForce: true, battleEffects: [
                        {
                            name: 'Eidolon Maximum repair',
                            type: 'other',
                            place: 'both',
                            onCombatRound: (p) => {
                                p.units.forEach((u) => {
                                    if (u.type === unit_1.UnitType.mech) {
                                        (0, util_log_1.logWrapper)(`Eidolon Maximum repaired!`);
                                        u.takenDamage = false;
                                        u.takenDamageRound = undefined;
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
];
//# sourceMappingURL=naazRokha.js.map