"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.l1z1x = void 0;
const battle_1 = require("../battle");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.l1z1x = [
    {
        type: 'faction',
        name: 'L1z1x flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), aura: [
                        {
                            name: 'L1z1x flagship forcing shots on non-fighters',
                            place: enums_1.Place.space,
                            transformUnit: (auraUnit) => {
                                if (auraUnit.type === unit_1.UnitType.flagship || auraUnit.type === unit_1.UnitType.dreadnought) {
                                    return Object.assign(Object.assign({}, auraUnit), { assignHitsToNonFighters: true });
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
        name: 'L1z1x Harrow',
        place: enums_1.Place.ground,
        onCombatRoundEnd: (participant, battle, _otherParticipant) => {
            if (participant.side === 'attacker') {
                (0, battle_1.doBombardment)(battle, true);
            }
        },
    },
    {
        type: 'faction-tech',
        name: 'L1z1x dreadnought upgrade',
        place: 'both',
        faction: enums_1.Faction.l1z1x,
        unit: unit_1.UnitType.dreadnought,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.dreadnought) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 4 }), bombardment: Object.assign(Object.assign({}, unit.bombardment), { hit: 4 }) });
            }
            else {
                return unit;
            }
        },
    },
    // TODO add mech
    {
        type: 'commander',
        description: 'Units that have PLANETARY SHIELD do not prevent you from using Bombardment.',
        name: 'L1z1x commander',
        place: enums_1.Place.ground,
        transformEnemyUnit: (u) => {
            return Object.assign(Object.assign({}, u), { planetaryShield: false });
        },
    },
];
//# sourceMappingURL=l1z1x.js.map