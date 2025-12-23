"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arborec = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.arborec = [
    {
        type: 'faction',
        name: 'Arborec flagship',
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
        type: 'faction',
        name: 'Arborec mech',
        place: 'both',
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.mech) {
                return Object.assign(Object.assign({}, unit), { planetaryShield: true });
            }
            else {
                return unit;
            }
        },
    },
];
//# sourceMappingURL=arborec.js.map