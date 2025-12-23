"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaliVoidArmaments = exports.metaliVoidShielding = exports.lightrailOrdnance = void 0;
exports.getRelics = getRelics;
const times_1 = __importDefault(require("lodash/times"));
const util_log_1 = require("../../util/util-log");
const battle_types_1 = require("../battle-types");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
function getRelics() {
    return [exports.lightrailOrdnance, exports.metaliVoidShielding, exports.metaliVoidArmaments];
}
// Does effectively the same thing as Experimental Battlestation, just with a count.
exports.lightrailOrdnance = {
    name: "Lightrail Ordnance",
    description: "Your space docks gain SPACE CANNON 5 (x2). You may use your space dock's SPACE CANNON against ships that are adjacent to their system.",
    type: "relic",
    place: "both",
    count: true,
    beforeStart: (p, battle, _op, effectName) => {
        var _a;
        // Make sure only one Space Dock rolls for Space Cannon in ground combat
        let spacedockCount = 0;
        if (battle.place === enums_1.Place.ground) {
            spacedockCount = 1;
        }
        else {
            spacedockCount = (_a = p.effects[effectName]) !== null && _a !== void 0 ? _a : 0;
        }
        const modify = (instance) => {
            instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 });
        };
        (0, times_1.default)(spacedockCount, () => {
            const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
            p.units.push(planetUnit);
        });
    },
};
// Generously grants the lowest worth, non-fighter, undamaged ship without sustain a very high Sustain Damage priority to force the battle code to sustain it.
exports.metaliVoidShielding = {
    name: "Metali Void Shielding",
    description: "Each time hits are produced against 1 of your non-fighter ships, 1 of those ships may use SUSTAIN DAMAGE as if it had that ability.",
    type: "relic",
    place: enums_1.Place.space,
    onCombatRoundEndBeforeAssign: (p, battle, _op) => {
        const bestShieldingTarget = (0, unitGet_1.getLowestWorthNonSustainUndamagedUnit)(p, battle.place, false);
        if (bestShieldingTarget && p.hitsToAssign.hits > 0) {
            bestShieldingTarget.useSustainDamagePriority = 500;
            bestShieldingTarget.sustainDamage = true;
            (0, util_log_1.logWrapper)(`${p.side} uses Metali Void Shielding to sustain ${bestShieldingTarget.type}!`);
        }
    },
    timesPerRound: 1,
};
//Does an AFB 6x3 by analogy to Experimental Battlestation (i.e., giving the planet AFB 6x3).
exports.metaliVoidArmaments = {
    name: "Metali Void Armaments",
    description: 'During the "Anti Fighter Barrage" step of space combat, you may resolve ANTI-FIGHTER BARRAGE 6 (x3) against your opponent\'s units.',
    type: "relic",
    place: enums_1.Place.space,
    onAfb: (p, battle) => {
        const modify = (instance) => {
            instance.afb = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 3 });
        };
        const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.nonunit, p, battle.place, modify);
        p.units.push(planetUnit);
    },
    priority: battle_types_1.EFFECT_HIGH_PRIORITY,
};
//# sourceMappingURL=relic.js.map