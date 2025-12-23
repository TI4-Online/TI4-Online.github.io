"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keleres = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.keleres = [
    {
        type: 'faction',
        name: 'Keleres flagship',
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
    {
        type: 'faction-ability',
        description: 'The faction tech I.I.H.Q. MODERNIZATION gives Mecatol Rex a space cannon that hits on 5.',
        name: 'I.I.H.Q. MODERNIZATION space cannon',
        place: 'both',
        faction: enums_1.Faction.keleres,
        beforeStart: (p, battle) => {
            const modify = (instance) => {
                instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 1 });
            };
            const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
            p.units.push(planetUnit);
        },
    },
];
//# sourceMappingURL=keleres.js.map