"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yin = void 0;
const util_log_1 = require("../../util/util-log");
const battle_1 = require("../battle");
const battleEffects_1 = require("../battleeffect/battleEffects");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
exports.yin = [
    {
        type: 'faction',
        name: 'Yin flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), battleEffects: [
                        {
                            name: 'Yin flagship "kill everything" effect',
                            type: 'other',
                            place: enums_1.Place.space,
                            onDeath: (deadUnits, participant, otherParticipant, _battle, isOwnUnit) => {
                                if (isOwnUnit && deadUnits.some((u) => u.type === unit_1.UnitType.flagship)) {
                                    participant.units.forEach((u) => (u.isDestroyed = true));
                                    otherParticipant.units.forEach((u) => (u.isDestroyed = true));
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
        name: 'Devotion',
        description: "After each space battle round, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit and assign it to 1 of your opponent's ships in that system.",
        type: 'faction-ability',
        place: enums_1.Place.space,
        faction: enums_1.Faction.yin,
        onCombatRoundEnd: (participant, battle, otherParticipant) => {
            var _a;
            // Dont suicide if this is the last unit and all enemy units have sustain damage
            if (participant.units.length === 1 &&
                otherParticipant.units.every((u) => u.sustainDamage && !u.takenDamage)) {
                return;
            }
            // since this is at end of round, make sure opponent is not dead already
            if (!(0, battle_1.isParticipantAlive)(otherParticipant, battle.place)) {
                return;
            }
            const suicideUnit = (_a = participant.units.find((u) => u.type === unit_1.UnitType.destroyer)) !== null && _a !== void 0 ? _a : participant.units.find((u) => u.type === unit_1.UnitType.cruiser);
            if (suicideUnit) {
                (0, battle_1.destroyUnit)(battle, suicideUnit);
                otherParticipant.hitsToAssign.hitsAssignedByEnemy += 1;
                (0, util_log_1.logWrapper)(`${participant.side} uses devotion to destroy their own ${suicideUnit.type}`);
            }
        },
    },
    {
        name: 'Impulse Core',
        description: "At the start of a space combat, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit against your opponent's ships; that hit must be assigned by your opponent to 1 of their non-fighters ships if able.",
        type: 'faction-tech',
        place: enums_1.Place.space,
        faction: enums_1.Faction.yin,
        onStart: (participant, battle, otherParticipant) => {
            var _a;
            // Dont suicide if this is the last unit and all enemy units have sustain damage
            if (participant.units.length === 1 &&
                otherParticipant.units.every((u) => u.sustainDamage && !u.takenDamage)) {
                return;
            }
            const suicideUnit = (_a = participant.units.find((u) => u.type === unit_1.UnitType.destroyer)) !== null && _a !== void 0 ? _a : participant.units.find((u) => u.type === unit_1.UnitType.cruiser);
            if (suicideUnit) {
                (0, battle_1.destroyUnit)(battle, suicideUnit);
                otherParticipant.hitsToAssign.hitsToNonFighters += 1;
            }
        },
    },
    {
        name: 'Yin agent',
        description: "After a player's unit is destroyed: You may exhaust this card to allow that player to place 2 fighters in the destroyed unit's system if it was a ship, or 2 infantry on its planet if it was a ground force.",
        type: 'agent',
        place: 'both',
        onDeath: (_deadUnits, participant, _otherParticipant, battle, isOwnUnit, effectName) => {
            if (!isOwnUnit) {
                return;
            }
            if (battle.place === enums_1.Place.space) {
                const newFigher1 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.fighter, participant, battle.place, () => { });
                const newFigher2 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.fighter, participant, battle.place, () => { });
                participant.newUnits.push(newFigher1);
                participant.newUnits.push(newFigher2);
                (0, util_log_1.logWrapper)(`${participant.side} uses Yin agent to summon two fighters when a unit was destroyed`);
            }
            else {
                const newInfantry1 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.infantry, participant, battle.place, () => { });
                const newInfantry2 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.infantry, participant, battle.place, () => { });
                participant.newUnits.push(newInfantry1);
                participant.newUnits.push(newInfantry2);
                (0, util_log_1.logWrapper)(`${participant.side} uses Yin agent to summon two infantry when a unit was destroyed`);
            }
            (0, battleEffects_1.registerUse)(effectName, participant);
        },
        timesPerFight: 1,
    },
];
//# sourceMappingURL=yin.js.map