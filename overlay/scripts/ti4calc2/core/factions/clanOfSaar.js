"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clanOfSaar = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.clanOfSaar = [
    {
        type: 'faction',
        name: 'Clan of Saar flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), afb: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 4 }) });
            }
            else {
                return unit;
            }
        },
    },
];
//# sourceMappingURL=clanOfSaar.js.map