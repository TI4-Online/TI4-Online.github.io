"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empyrean = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.empyrean = [
    {
        type: "faction",
        name: "Empyrean flagship",
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
        type: "general",
        name: "Empyrean flagship repair",
        description: "Empyrean flagship text: After any player's unit in this system or an adjacent system uses SUSTAIN DAMAGE, you may spend 2 influence to repair that unit.",
        place: "both",
        count: true,
        onSustain: (u, participant, _battle, effectName) => {
            var _a;
            if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
                u.takenDamage = false;
                if (participant.effects[effectName] !== undefined) {
                    participant.effects[effectName] -= 1;
                }
            }
        },
    },
];
//# sourceMappingURL=empyrean.js.map