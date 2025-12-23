"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sardarkkNorr = void 0;
const times_1 = __importDefault(require("lodash/times"));
const util_log_1 = require("../../util/util-log");
const battle_1 = require("../battle");
const battle_types_1 = require("../battle-types");
const battleEffects_1 = require("../battleeffect/battleEffects");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
exports.sardarkkNorr = [
    {
        type: 'faction',
        name: 'Sardakk Norr flagship',
        place: enums_1.Place.space,
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
            var _a;
            if (unit.type === unit_1.UnitType.flagship) {
                const flagshipBuff = {
                    name: 'Sardakk Norr flagship buff',
                    place: enums_1.Place.space,
                    transformUnit: (auraUnit) => {
                        // TODO this is a minor thing, but if there are two flagships they should buff each other. Currently, they dont.
                        // this could instead be implemented like the jolNar mechs. Just buff each flagship one less than number of participating flagships
                        if (auraUnit.combat && auraUnit.type !== unit_1.UnitType.flagship) {
                            // lol, it doesnt matter if  we have temp or permanent here, because how auras work
                            return (0, unit_1.getUnitWithImproved)(auraUnit, 'combat', 'hit', 'temp');
                        }
                        else {
                            return auraUnit;
                        }
                    },
                };
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 2 }), aura: [...((_a = unit.aura) !== null && _a !== void 0 ? _a : []), flagshipBuff] });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction',
        name: 'Sardakk mech ability',
        place: enums_1.Place.ground,
        onSustain: (u, participant, battle, _effectName, isDuringCombat) => {
            if (u.type === unit_1.UnitType.mech && isDuringCombat) {
                const otherParticipant = (0, battle_1.getOtherParticipant)(battle, participant);
                otherParticipant.hitsToAssign.hits += 1;
                (0, util_log_1.logWrapper)(`${participant.side} assigned hit to enemy due to mech sustain.`);
            }
        },
    },
    {
        type: 'faction',
        name: 'Sardakk Norr buff',
        place: 'both',
        transformUnit: (unit) => {
            if (unit.combat) {
                return (0, unit_1.getUnitWithImproved)(unit, 'combat', 'hit', 'permanent');
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction',
        name: 'Sardakk Norr dreadnoughts',
        place: 'both',
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.dreadnought) {
                unit.bombardment.hit = 4;
                unit.bombardment.count = 2;
            }
            return unit;
        },
    },
    {
        type: 'faction-tech',
        name: 'Exotrireme II',
        place: 'both',
        faction: enums_1.Faction.sardakk_norr,
        unit: unit_1.UnitType.dreadnought,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.dreadnought) {
                return Object.assign(Object.assign({}, unit), { immuneToDirectHit: true });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction-ability',
        name: 'Exotrireme II should suicide',
        description: 'If the Sardakk dreadnought is upgraded, it will activate its ability after the first combat round. The ability reads: "After a round of space combat, you may destroy this unit to destroy up to 2 ships in this system. Just enough ships will be sacrified to kill all enemy ships"',
        place: enums_1.Place.space,
        faction: enums_1.Faction.sardakk_norr,
        onCombatRoundEnd: (participant, battle, otherParticipant) => {
            if (participant.unitUpgrades[unit_1.UnitType.dreadnought] &&
                (0, battle_1.isParticipantAlive)(otherParticipant, battle.place)) {
                const enemyCount = (0, unitGet_1.getUnits)(otherParticipant, battle.place, true).length;
                const units = (0, unitGet_1.getUnits)(participant, battle.place, false);
                const dreadNoughtsToSuicide = units
                    .filter((u) => u.type === unit_1.UnitType.dreadnought)
                    .sort((u1) => (u1.takenDamage ? -1 : 1))
                    .slice(0, Math.ceil(enemyCount / 2));
                dreadNoughtsToSuicide.forEach((u) => {
                    (0, battle_1.destroyUnit)(battle, u);
                });
                (0, util_log_1.logWrapper)(`${participant.side} used Exotrireme II ability for ${dreadNoughtsToSuicide.length} ships.`);
                (0, times_1.default)(dreadNoughtsToSuicide.length * 2, () => {
                    const highestWorthUnit = (0, unitGet_1.getHighestWorthUnit)(otherParticipant, battle.place, true);
                    if (highestWorthUnit) {
                        (0, util_log_1.logWrapper)(`${highestWorthUnit.type} was destroyed by Exotrireme II ability.`);
                        (0, battle_1.destroyUnit)(battle, highestWorthUnit);
                    }
                });
            }
        },
    },
    {
        type: 'faction-tech',
        name: 'Valkyrie Particle Weave',
        description: 'After making combat rolls during a round of ground combat, if your opponent produced 1 or more hits, you produce 1 additional hit',
        place: enums_1.Place.ground,
        faction: enums_1.Faction.sardakk_norr,
        onDeath: (_deadUnits, participant, otherParticipant, _battle, isOwnUnit, effectName) => {
            if (!isOwnUnit) {
                return;
            }
            otherParticipant.hitsToAssign.hits += 1;
            (0, battleEffects_1.registerUse)(effectName, participant);
            (0, util_log_1.logWrapper)(`${participant.side} uses Valkyrie Particle Weave to produce 1 hit`);
        },
        onSustain: (_u, participant, battle, effectName) => {
            const otherParticipant = (0, battle_1.getOtherParticipant)(battle, participant);
            otherParticipant.hitsToAssign.hits += 1;
            (0, battleEffects_1.registerUse)(effectName, participant);
            (0, util_log_1.logWrapper)(`${participant.side} uses Valkyrie Particle Weave to produce 1 hit`);
        },
        timesPerRound: 1,
    },
    {
        type: 'promissary',
        name: 'Tekklar Legion',
        description: "At the start of an invasion combat: Apply +1 to the result of each of your unit's combat rolls during this combat.  If your opponent is the N'orr player, apply -1 to the result of each of his unit's combat rolls during this combat.",
        place: enums_1.Place.ground,
        onStart: (participant, _battle, otherParticipant) => {
            participant.units.forEach((unit) => {
                if (unit.combat) {
                    unit.combat.hitBonus += 1;
                }
            });
            if (otherParticipant.faction === enums_1.Faction.sardakk_norr) {
                otherParticipant.units.forEach((unit) => {
                    if (unit.combat) {
                        unit.combat.hitBonus -= 1;
                    }
                });
            }
        },
    },
];
//# sourceMappingURL=sardakkNorr.js.map