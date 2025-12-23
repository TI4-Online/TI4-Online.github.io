"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mahact = void 0;
const battle_types_1 = require("../battle-types");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.mahact = [
    {
        type: 'faction',
        name: 'Mahact flagship',
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
        type: 'faction-ability',
        name: 'Mahact flagship bonus',
        description: "Mahact flagship bonus. Flagship text is: During combat against an opponent whose command token is not in your fleet pool, apply +2 to the results of this unit's combat rolls.",
        place: enums_1.Place.space,
        faction: enums_1.Faction.mahact,
        priority: battle_types_1.EFFECT_LOW_PRIORITY,
        transformUnit: (u) => {
            if (u.type === unit_1.UnitType.flagship) {
                return (0, unit_1.getUnitWithImproved)(u, 'combat', 'hit', 'permanent', 2);
            }
            else {
                return u;
            }
        },
    },
];
//# sourceMappingURL=mahact.js.map