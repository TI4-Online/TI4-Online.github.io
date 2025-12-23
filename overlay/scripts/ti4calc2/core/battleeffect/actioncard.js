"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waylay = exports.solarFlare = exports.scrambleFrequency = exports.reflectiveShielding = exports.blitz = exports.shieldsHolding = exports.moraleBoost = exports.maneuveringJets = exports.fireTeam = exports.fighterPrototype = exports.experimentalBattlestation = exports.emergencyRepairs = exports.disable = exports.directHit = exports.courageousToTheEnd = exports.bunker = void 0;
exports.getActioncards = getActioncards;
const times_1 = __importDefault(require("lodash/times"));
const util_log_1 = require("../../util/util-log");
const battle_1 = require("../battle");
const battle_types_1 = require("../battle-types");
const enums_1 = require("../enums");
const roll_1 = require("../roll");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
const battleEffects_1 = require("./battleEffects");
function getActioncards() {
    return [
        exports.bunker,
        exports.courageousToTheEnd,
        exports.directHit,
        exports.disable,
        exports.emergencyRepairs,
        exports.experimentalBattlestation,
        exports.fighterPrototype,
        exports.fireTeam,
        // maneuveringJets,
        exports.moraleBoost,
        exports.shieldsHolding,
        exports.blitz,
        exports.reflectiveShielding,
        // scrambleFrequency,
        exports.solarFlare,
        // waylay,
    ];
}
exports.bunker = {
    name: "Bunker",
    description: "During this invasion, apply -4 to the result of each BOMBARDMENT roll against planets you control.",
    type: "action-card",
    side: "defender",
    place: enums_1.Place.ground,
    transformEnemyUnit: (u) => {
        if (u.bombardment) {
            return (0, unit_1.getUnitWithImproved)(u, "bombardment", "hit", "permanent", -4);
        }
        else {
            return u;
        }
    },
};
exports.courageousToTheEnd = {
    name: "Courageous to the End",
    description: "After 1 of your ships is destroyed during a space combat: Roll 2 dice. For each result equal to or greater than that ship's combat value, your opponent must choose and destroy 1 of their ships. It will be played as soon as possible, even if it is just a fighter that is destroyed.",
    type: "action-card",
    place: enums_1.Place.space,
    onDeath: (deadUnits, participant, otherParticipant, battle, isOwnUnit, effectName) => {
        if (!isOwnUnit) {
            return;
        }
        const bestDeadUnit = deadUnits.reduce((a, b) => {
            var _a, _b, _c, _d;
            return ((_b = (_a = a.combat) === null || _a === void 0 ? void 0 : _a.hit) !== null && _b !== void 0 ? _b : 10) > ((_d = (_c = b.combat) === null || _c === void 0 ? void 0 : _c.hit) !== null && _d !== void 0 ? _d : 10) ? a : b;
        });
        if (!bestDeadUnit.combat) {
            return;
        }
        const roll = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: bestDeadUnit.combat.hit, count: 2 });
        const hits = (0, roll_1.getHits)(roll);
        (0, util_log_1.logWrapper)(`${participant.side} plays Courageous to the End on death of ${bestDeadUnit.type} and makes ${hits.hits} kill(s).`);
        (0, times_1.default)(hits.hits, () => {
            const lowestWorthUnit = (0, unitGet_1.getLowestWorthUnit)(otherParticipant, battle.place, true);
            if (lowestWorthUnit) {
                (0, battle_1.destroyUnit)(battle, lowestWorthUnit);
                (0, util_log_1.logWrapper)(`Courageous to the End destroyed ${lowestWorthUnit.type}`);
            }
        });
        (0, battleEffects_1.registerUse)(effectName, participant);
    },
    timesPerFight: 1,
};
// TODO maybe add a test to direct hit
// TODO also test riskDirectHit and that stuff there
exports.directHit = {
    name: "Direct Hit",
    description: "After another player's ship uses SUSTAIN DAMAGE to cancel a hit produced by your units or abilities: Destroy that ship.",
    type: "action-card",
    place: enums_1.Place.space,
    count: true,
    onEnemySustain: (u, participant, _battle, effectName) => {
        var _a;
        if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
            if (!u.immuneToDirectHit && !u.isDestroyed) {
                u.isDestroyed = true;
                (0, util_log_1.logWrapper)(`${participant.side} used direct hit to destroy ${u.type}`);
                if (participant.effects[effectName] !== undefined) {
                    participant.effects[effectName] -= 1;
                }
            }
        }
    },
};
exports.disable = {
    name: "Disable",
    description: "Your opponents' PDS units lose Planetary Shield and Space Cannon during this invasion.",
    type: "action-card",
    place: enums_1.Place.ground,
    side: "attacker",
    priority: battle_types_1.EFFECT_LOW_PRIORITY,
    transformEnemyUnit: (u) => {
        if (u.type === unit_1.UnitType.pds) {
            return Object.assign(Object.assign({}, u), { planetaryShield: false, spaceCannon: undefined });
        }
        else {
            return u;
        }
    },
};
exports.emergencyRepairs = {
    name: "Emergency Repairs",
    description: "At the start or end of a combat round: Repair all of your units that have SUSTAIN DAMAGE in the active system.",
    type: "action-card",
    place: "both",
    onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
        if (participant.units.some((u) => u.takenDamage && u.sustainDamage)) {
            participant.units.forEach((u) => {
                u.takenDamage = false;
            });
            (0, util_log_1.logWrapper)(`${participant.side} used Emergency repair`);
            (0, battleEffects_1.registerUse)(effectName, participant);
        }
    },
    onCombatRoundEnd: (participant, _battle, _otherParticipant, effectName) => {
        if (participant.units.some((u) => u.takenDamage && u.sustainDamage)) {
            participant.units.forEach((u) => {
                u.takenDamage = false;
            });
            (0, util_log_1.logWrapper)(`${participant.side} used Emergency repair`);
            (0, battleEffects_1.registerUse)(effectName, participant);
        }
    },
    timesPerFight: 1,
};
exports.experimentalBattlestation = {
    name: "Experimental Battlestation",
    description: "After another player moves ships into a system during a tactical action: Choose 1 of your space docks that is either in or adjacent to that system. That space dock uses Space Cannon 5 (x3) against ships in the active system.",
    type: "action-card",
    place: enums_1.Place.space,
    beforeStart: (p, battle) => {
        const modify = (instance) => {
            instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 });
        };
        const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
        p.units.push(planetUnit);
    },
};
exports.fighterPrototype = {
    name: "Fighter Prototype",
    description: "At the start of the first round of a space combat: Apply +2 to the result of each of your fighters' combat rolls during this combat round.",
    type: "action-card",
    place: enums_1.Place.space,
    transformUnit: (u) => {
        if (u.type === unit_1.UnitType.fighter) {
            return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "temp", 2);
        }
        else {
            return u;
        }
    },
};
exports.fireTeam = {
    name: "Fire Team",
    description: "After your ground forces make combat rolls during a round of ground combat: Reroll any number of your dice.",
    type: "action-card",
    place: enums_1.Place.ground,
    transformUnit: (u) => {
        if (u.type === unit_1.UnitType.infantry || u.type === unit_1.UnitType.mech) {
            return (0, unit_1.getUnitWithImproved)(u, "combat", "reroll", "temp", 1);
        }
        else {
            return u;
        }
    },
};
exports.maneuveringJets = {
    name: "Maneuvering Jets",
    description: "Before you assign hits produced by another player's Space Cannon roll: Cancel 1 hit.",
    type: "action-card",
    place: "both",
    // TODO
};
exports.moraleBoost = {
    name: "Morale Boost",
    description: "At the start of a combat round: Apply +1 to the result of each of your unit's combat rolls during this combat round.",
    type: "action-card",
    place: "both",
    count: true,
    onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
        var _a;
        if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
            participant.units.forEach((u) => {
                if (u.combat) {
                    u.combat.hitBonusTmp += 1;
                }
            });
            if (participant.effects[effectName] !== undefined) {
                participant.effects[effectName] -= 1;
            }
        }
    },
};
exports.shieldsHolding = {
    name: "Shields Holding",
    description: "Before you assign hits to your ships during a space combat: Cancel up to 2 hits.",
    type: "action-card",
    place: enums_1.Place.space,
    count: true,
    timesPerRound: 1,
    onCombatRoundEndBeforeAssign: (participant, _battle, _otherParticipant, effectName) => {
        var _a;
        if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) === 0) {
            return;
        }
        if (participant.hitsToAssign.hitsAssignedByEnemy > 0 ||
            participant.hitsToAssign.hitsToNonFighters > 0 ||
            participant.hitsToAssign.hits > 0) {
            let cancel = 2;
            const cancelHitsAssignedByEnemy = Math.min(cancel, participant.hitsToAssign.hitsAssignedByEnemy);
            cancel -= cancelHitsAssignedByEnemy;
            participant.hitsToAssign.hitsAssignedByEnemy -= cancelHitsAssignedByEnemy;
            const cancelHitsToNonFighters = Math.min(cancel, participant.hitsToAssign.hitsToNonFighters);
            cancel -= cancelHitsToNonFighters;
            participant.hitsToAssign.hitsToNonFighters -= cancelHitsToNonFighters;
            const cancelHits = Math.min(cancel, participant.hitsToAssign.hits);
            cancel -= cancelHits;
            participant.hitsToAssign.hits -= cancelHits;
            (0, battleEffects_1.registerUse)(effectName, participant);
            if (participant.effects[effectName] !== undefined) {
                participant.effects[effectName] -= 1;
            }
        }
    },
};
exports.blitz = {
    name: "Blitz",
    description: "At the start of an invasion: Each of your non-fighter ships in the active system that do not have BOMBARDMENT gain BOMBARDMENT 6 until the end of the invasion.",
    type: "action-card",
    place: enums_1.Place.ground,
    side: "attacker",
    transformUnit: (u, _p, place) => {
        if (!(0, unitGet_1.doesUnitFitPlace)(u, place) &&
            u.type !== unit_1.UnitType.fighter &&
            !u.bombardment) {
            return Object.assign(Object.assign({}, u), { bombardment: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6 }) });
        }
        else {
            return u;
        }
    },
};
exports.reflectiveShielding = {
    name: "Reflective Shielding",
    description: "When one of your ships uses SUSTAIN DAMAGE during combat: Produce 2 hits against your opponent's ships in the active system.",
    type: "action-card",
    place: enums_1.Place.space,
    onSustain: (u, participant, battle, effectName) => {
        const otherParticipant = (0, battle_1.getOtherParticipant)(battle, participant);
        if (otherParticipant) {
            otherParticipant.hitsToAssign.hits += 2;
            (0, battleEffects_1.registerUse)(effectName, participant);
            (0, util_log_1.logWrapper)(`${participant.side} sustained damage on ${u.type} and played Reflective Shielding.`);
        }
    },
    timesPerFight: 1,
};
exports.scrambleFrequency = {
    name: "Scramble Frequency",
    description: "After another player makes a BOMBARDMENT, SPACE CANNON, or ANTI-FIGHTER BARRAGE roll: That player rerolls all of their dice.",
    type: "action-card",
    place: "both",
    // TODO another thing that would require "worse than average" detection
};
exports.solarFlare = {
    name: "Solar Flare",
    description: "After you activate a system: During this movement, other players cannot use SPACE CANNON against your ships.",
    type: "action-card",
    place: enums_1.Place.space,
    priority: battle_types_1.EFFECT_LOW_PRIORITY,
    transformEnemyUnit: (u) => {
        if (u.spaceCannon) {
            return Object.assign(Object.assign({}, u), { spaceCannon: undefined });
        }
        else {
            return u;
        }
    },
};
exports.waylay = {
    name: "Waylay",
    description: "Before you roll dice for ANTI-FIGHTER BARRAGE: Hits from this roll are produced against all ships (not just fighters).",
    type: "action-card",
    place: enums_1.Place.space,
    // TODO
};
//# sourceMappingURL=actioncard.js.map