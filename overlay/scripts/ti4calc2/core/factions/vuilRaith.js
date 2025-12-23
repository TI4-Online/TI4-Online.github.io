"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuilRaith = void 0;
const unit_1 = require("../unit");
exports.vuilRaith = [
    {
        type: 'faction',
        name: "Vuil'Raith flagship",
        place: 'both',
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), bombardment: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5 }) });
            }
            else {
                return unit;
            }
        },
    },
];
//# sourceMappingURL=vuilRaith.js.map