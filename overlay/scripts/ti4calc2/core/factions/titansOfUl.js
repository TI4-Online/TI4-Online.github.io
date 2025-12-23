"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titansOfUl = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.titansOfUl = [
    {
        type: 'faction',
        name: 'Titans of Ul flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }) });
            }
            else {
                return unit;
            }
        },
    },
    // TODO add some tests...
    {
        type: 'faction',
        name: 'Titans of Ul pds',
        place: 'both',
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.pds) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7 }), isGroundForce: true, sustainDamage: true, useSustainDamagePriority: 20, diePriority: 20 });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction-tech',
        name: 'Titans of Ul pds upgrade',
        place: 'both',
        faction: enums_1.Faction.titans_of_ul,
        unit: unit_1.UnitType.pds,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.pds) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 6 }), spaceCannon: Object.assign(Object.assign({}, unit.spaceCannon), { hit: 5 }), isGroundForce: true, sustainDamage: true, useSustainDamagePriority: 20, diePriority: 20 });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction-tech',
        name: 'Titans of Ul cruiser upgrade',
        place: enums_1.Place.space,
        faction: enums_1.Faction.titans_of_ul,
        unit: unit_1.UnitType.cruiser,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.cruiser) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 6 }), useSustainDamagePriority: 200, sustainDamage: true });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'agent',
        description: 'When a hit is produced against a unit: You may exhaust this card to cancel that hit.',
        name: 'Titans agent',
        place: 'both',
        beforeStart: (p) => {
            p.soakHits += 1;
        },
    },
    {
        type: 'general',
        description: 'The Titans hero gives their home system planet SPACE CANNON 5 (x3) ability as if it were a unit.',
        name: 'Titans hero',
        place: 'both',
        beforeStart: (p, battle) => {
            const modify = (instance) => {
                instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 });
            };
            const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
            p.units.push(planetUnit);
        },
    },
];
//# sourceMappingURL=titansOfUl.js.map