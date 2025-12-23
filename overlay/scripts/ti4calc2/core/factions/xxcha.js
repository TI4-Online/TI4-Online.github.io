"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xxcha = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.xxcha = [
    {
        type: 'faction',
        name: 'Xxcha flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), spaceCannon: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 }) });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction',
        name: 'Xxcha mech',
        place: 'both',
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.mech) {
                return Object.assign(Object.assign({}, unit), { spaceCannon: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 8 }) });
            }
            else {
                return unit;
            }
        },
    },
];
//# sourceMappingURL=xxcha.js.map