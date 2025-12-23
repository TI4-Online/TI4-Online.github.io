"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentak = void 0;
const enums_1 = require("../enums");
const roll_1 = require("../roll");
const unit_1 = require("../unit");
exports.mentak = [
    {
        // TODO test all auras that affects enemies
        // TODO test this ship with assault cannon for enemy. It should snipe the ship and retain sustain damage
        // test this ship with with assault cannon for us. It should snipe an enemy war sun
        type: 'faction',
        name: 'Mentak flagship',
        place: enums_1.Place.space,
        transformUnit: (unit) => {
            if (unit.type === unit_1.UnitType.flagship) {
                return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), preventEnemySustain: true });
            }
            else {
                return unit;
            }
        },
    },
    {
        name: 'Mentak mech',
        type: 'faction',
        place: enums_1.Place.ground,
        transformUnit: (u) => {
            if (u.type === unit_1.UnitType.mech) {
                return Object.assign(Object.assign({}, u), { preventEnemySustainOnPlanet: true });
            }
            else {
                return u;
            }
        },
    },
    {
        name: 'Ambush',
        type: 'faction',
        place: enums_1.Place.space,
        onStart: (participant, _battle, otherParticipant) => {
            const cruisers = participant.units.filter((u) => u.type === unit_1.UnitType.cruiser).slice(0, 2);
            const destroyers = participant.units
                .filter((u) => u.type === unit_1.UnitType.destroyer)
                .slice(0, 2 - cruisers.length);
            const ambushShips = [...cruisers, ...destroyers];
            let hits = 0;
            for (const ambushShip of ambushShips) {
                const hit = (0, roll_1.getHits)(Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: ambushShip.combat.hit }));
                hits += hit.hits;
            }
            otherParticipant.hitsToAssign.hits += hits;
        },
    },
    {
        name: 'Mentak hero',
        description: "At the start of space combat that you are participating in: You may purge this card; if you do, for each other player's ship that is destroyed during this combat, place 1 ship of that type from your reinforcements in the active system.",
        type: 'faction-ability',
        place: enums_1.Place.space,
        faction: enums_1.Faction.mentak,
        onDeath: (deadUnits, participant, _otherParticipant, battle, isOwnUnit) => {
            if (isOwnUnit) {
                return;
            }
            for (const rawUnit of deadUnits) {
                // We should only be able to steal a warsun if we have the warsun upgrade. But we don't track that.
                // And I dont want to clutter the interface more for such an extreme edge case. So lets ignore it.
                const unit = (0, unit_1.createUnitAndApplyEffects)(rawUnit.type, participant, battle.place, () => { });
                participant.newUnits.push(unit);
            }
        },
    },
];
//# sourceMappingURL=mentak.js.map