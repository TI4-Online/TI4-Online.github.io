"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crimsonRebellion = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.crimsonRebellion = [
    {
        type: 'faction',
        name: 'Crimson Rebellion flagship',
        place: 'both',
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
        // TODO units should regain abilities when the flagship is destroyed. Currently they do not. If we fix so "battle aura" can affect all abilites, it should be used instead.
        name: 'Flagship active',
        description: "While this unit is in a system that contains an active breach, other players' units in systems with active breaches lose all their unit abilities.",
        type: 'faction-ability',
        place: 'both',
        faction: enums_1.Faction.crimson_rebellion,
        transformEnemyUnit: (unit, _p) => {
            return Object.assign(Object.assign({}, unit), { afb: undefined, bombardment: undefined, spaceCannon: undefined, sustainDamage: false, planetaryShield: false });
        },
    },
    {
        type: 'faction',
        name: 'Crimson Rebellion destroyers',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.destroyer) {
                unit.combat.hit = 8;
            }
            return unit;
        },
    },
    {
        type: 'faction-tech',
        name: 'Exile II',
        place: enums_1.Place.space,
        faction: enums_1.Faction.crimson_rebellion,
        unit: unit_1.UnitType.destroyer,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.destroyer) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 7 }), afb: Object.assign(Object.assign({}, unit.afb), { hit: 6, count: 3 }) });
            }
            return unit;
        },
    },
];
//# sourceMappingURL=crimsonRebellion.js.map