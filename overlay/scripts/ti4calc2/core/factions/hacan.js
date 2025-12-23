"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hacan = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const hacanTradeGoods = "Hacan flagship trade goods";
exports.hacan = [
    {
        type: "faction",
        name: "Hacan flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                const getNewOnHit = (oldOnHit) => {
                    const onHit = (participant, battle, otherParticipant, hitInfo) => {
                        var _a;
                        if (oldOnHit) {
                            oldOnHit(participant, battle, otherParticipant, hitInfo);
                        }
                        for (const rollInfo of hitInfo.rollInfoList) {
                            if (rollInfo.roll + 1 === rollInfo.hitOn &&
                                ((_a = participant.effects[hacanTradeGoods]) !== null && _a !== void 0 ? _a : 0) > 0) {
                                rollInfo.roll += 1;
                                hitInfo.hits += 1;
                                if (participant.effects[hacanTradeGoods] !== undefined) {
                                    participant.effects[hacanTradeGoods] -= 1;
                                }
                            }
                        }
                    };
                    return onHit;
                };
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), aura: [
                        {
                            name: "Hacan flagship aura",
                            place: enums_1.Place.space,
                            transformUnit: (auraUnit, _participant) => {
                                // our aura gives all friendly units an onHit-listener. Neat solution, right?
                                const newOnHit = getNewOnHit(auraUnit.onHit);
                                return Object.assign(Object.assign({}, auraUnit), { onHit: newOnHit });
                            },
                        },
                    ] });
            }
            else {
                return unit;
            }
        },
    },
    {
        name: hacanTradeGoods,
        description: "Trade goods to be used by flagship. Hacan flagship text: After you roll a die during a space combat in this system, you may spend 1 trade good to apply +1 to the result.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.hacan,
        count: true,
    },
];
//# sourceMappingURL=hacan.js.map