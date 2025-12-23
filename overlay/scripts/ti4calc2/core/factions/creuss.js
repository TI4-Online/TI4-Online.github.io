"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creuss = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.creuss = [
    {
        type: 'faction',
        name: 'Creuss flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 1 }) });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction-tech',
        name: 'Dimensional Splicer',
        description: "At the start of space combat in a system that contains a wormhole and 1 or more of your ships, you may produce 1 hit and assign it to 1 of your opponent's ships.",
        place: enums_1.Place.space,
        faction: enums_1.Faction.creuss,
        onStart: (_participant, _battle, otherParticipant) => {
            otherParticipant.hitsToAssign.hitsAssignedByEnemy += 1;
        },
    },
];
//# sourceMappingURL=creuss.js.map