"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nekro = void 0;
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.nekro = [
    {
        type: "faction",
        name: "Nekro flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), battleEffects: [
                        {
                            type: "other",
                            name: "Nekro flagship ability",
                            place: enums_1.Place.space,
                            transformUnit: (unit) => {
                                if (unit.isGroundForce) {
                                    return Object.assign(Object.assign({}, unit), { isShip: true });
                                }
                                else {
                                    return unit;
                                }
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
        type: "faction-ability",
        description: 'Nekro mech text is: During combat against an opponent who has an "X" or "Y" token on 1 or more of their technologies, apply +2 to the result of each of this unit\'s combat rolls.',
        place: "both",
        faction: enums_1.Faction.nekro,
        name: "Nekro mech bonus",
        transformUnit: (unit, _p) => {
            if (unit.type === unit_1.UnitType.mech) {
                return (0, unit_1.getUnitWithImproved)(unit, "combat", "hit", "permanent", 2);
            }
            else {
                return unit;
            }
        },
    },
    // TODO should we care about copying technology mid combat? No, right?
    // TODO should we fix so nekro can copy faction techs?
    // If we do, make sure nekro does not gain all faction unit-techs just by trying to upgrade any unit
];
//# sourceMappingURL=nekro.js.map