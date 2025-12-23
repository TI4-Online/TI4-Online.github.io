"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winnu = void 0;
const util_log_1 = require("../../util/util-log");
const battle_1 = require("../battle");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
// TODO fix test for flagship, since it has an aura...
exports.winnu = [
    {
        type: "faction",
        name: "Winnu flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 1 }), aura: [
                        {
                            name: "Winnu Flagship ability",
                            type: "other",
                            place: enums_1.Place.space,
                            transformUnit: (auraUnit, p, battle) => {
                                if (auraUnit.type === unit_1.UnitType.flagship) {
                                    const opponent = (0, battle_1.getOtherParticipant)(battle, p);
                                    const nonFighterShips = (0, unitGet_1.getNonFighterShips)(opponent);
                                    return Object.assign(Object.assign({}, auraUnit), { combat: Object.assign(Object.assign({}, auraUnit.combat), { count: nonFighterShips.length }) });
                                }
                                return auraUnit;
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
        type: "commander",
        description: "During combat: Apply +2 to the result of each of your unit's combat rolls in the Mecatol Rex system, your home system, and each system that contains a legendary planet.",
        name: "Winnu commander",
        place: "both",
        transformUnit: (u) => {
            return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "permanent", 2);
        },
    },
    {
        name: "Imperator",
        type: "faction-ability",
        description: "Winnu Breakthrough: Apply +1 to the results of each of your unit's combat rolls for each \"Support for the Throne\" in your opponent's play area.",
        place: "both",
        faction: enums_1.Faction.winnu,
        count: true,
        onStart: (p, _battle, _op, effectName) => {
            p.units.forEach((u) => {
                var _a, _b;
                if (u.combat) {
                    u.combat.hitBonus += (_a = p.effects[effectName]) !== null && _a !== void 0 ? _a : 0;
                    (0, util_log_1.logWrapper)(`${p.side} used Imperator to give all units a +${(_b = p.effects[effectName]) !== null && _b !== void 0 ? _b : 0} to hit.`);
                }
            });
        },
    },
];
//# sourceMappingURL=winnu.js.map