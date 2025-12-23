"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sol = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.sol = [
    {
        type: 'faction',
        name: 'Sol flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction',
        name: 'Sol infantry',
        place: enums_1.Place.ground,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.infantry) {
                unit.combat.hit = 7;
            }
            return unit;
        },
    },
    {
        type: 'faction-tech',
        name: 'Spec Ops II',
        place: enums_1.Place.ground,
        faction: enums_1.Faction.sol,
        unit: unit_1.UnitType.infantry,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.infantry) {
                unit.combat.hit = 6;
            }
            return unit;
        },
    },
    {
        type: 'faction-tech',
        name: 'Advanced Carrier II',
        place: enums_1.Place.space,
        faction: enums_1.Faction.sol,
        unit: unit_1.UnitType.carrier,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.carrier) {
                return Object.assign(Object.assign({}, unit), { sustainDamage: true, 
                    // really hard to determine sustain priority here... lets keep it low
                    useSustainDamagePriority: 25 });
            }
            return unit;
        },
    },
    {
        type: 'agent',
        description: 'At the start of a ground combat round: You may exhaust this card to choose 1 ground force in the active system; that ground force rolls 1 additional die during that combat round.',
        name: 'Sol agent',
        place: enums_1.Place.ground,
        onStart: (participant, battle) => {
            if (battle.place === enums_1.Place.ground) {
                const infantry = participant.units.find((u) => u.type === unit_1.UnitType.infantry && u.combat !== undefined);
                if (infantry) {
                    infantry.combat.countBonusTmp += 1;
                }
            }
        },
    },
];
//# sourceMappingURL=sol.js.map