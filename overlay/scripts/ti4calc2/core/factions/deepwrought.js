"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepwrought = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.deepwrought = [
    {
        type: 'faction',
        name: 'Deepwrought flagship',
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
];
//# sourceMappingURL=deepwrought.js.map