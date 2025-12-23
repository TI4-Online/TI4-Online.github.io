"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nomad = void 0;
const util_log_1 = require("../../util/util-log");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
exports.nomad = [
    {
        type: 'faction',
        name: 'Nomad flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), afb: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 8, count: 3 }) });
            }
            else {
                return unit;
            }
        },
    },
    {
        type: 'faction-tech',
        name: 'Nomad flagship upgrade',
        place: enums_1.Place.space,
        faction: enums_1.Faction.nomad,
        unit: unit_1.UnitType.flagship,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), afb: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 }) });
            }
            else {
                return unit;
            }
        },
    },
    {
        name: 'Memoria I',
        description: "At the start of a space combat against a player other than the Nomad: During this combat, treat 1 of your non-fighter ships as if it has the SUSTAIN DAMAGE ability, combat value, and ANTI-FIGHTER BARRAGE value of the Nomad's flagship",
        type: 'promissary',
        place: enums_1.Place.space,
        onStart: (participant, _battle, otherParticipant) => {
            if (otherParticipant.faction === enums_1.Faction.nomad) {
                return;
            }
            const worstNonFighterShip = (0, unitGet_1.getWeakestCombatUnit)(participant, enums_1.Place.space, false);
            if (!worstNonFighterShip) {
                return;
            }
            (0, util_log_1.logWrapper)(`${participant.side} used nomad promissary to transform ${worstNonFighterShip.type} into the Memoria I!`);
            worstNonFighterShip.combat = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 });
            worstNonFighterShip.afb = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 });
            worstNonFighterShip.sustainDamage = true;
        },
    },
    {
        name: 'Memoria II',
        description: "At the start of a space combat against a player other than the Nomad: During this combat, treat 1 of your non-fighter ships as if it has the SUSTAIN DAMAGE ability, combat value, and ANTI-FIGHTER BARRAGE value of the Nomad's flagship",
        type: 'promissary',
        place: enums_1.Place.space,
        onStart: (participant, _battle, otherParticipant) => {
            if (otherParticipant.faction === enums_1.Faction.nomad) {
                return;
            }
            const worstNonFighterShip = (0, unitGet_1.getWeakestCombatUnit)(participant, enums_1.Place.space, false);
            if (!worstNonFighterShip) {
                return;
            }
            (0, util_log_1.logWrapper)(`${participant.side} used nomad promissary to transform ${worstNonFighterShip.type} into the Memoria II!`);
            worstNonFighterShip.combat = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, countBonus: 2 });
            worstNonFighterShip.afb = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, countBonus: 3 });
            worstNonFighterShip.sustainDamage = true;
        },
    },
    {
        name: 'Nomad mech sustain in space battle ability',
        type: 'faction',
        place: enums_1.Place.space,
        onStart: (participant) => {
            const mechCount = participant.units.filter((u) => u.type === unit_1.UnitType.mech).length;
            participant.soakHits += mechCount;
        },
    },
    // TODO add agent? Would require "determine when round is worse than average" function and "redo round" function.
];
//# sourceMappingURL=nomad.js.map