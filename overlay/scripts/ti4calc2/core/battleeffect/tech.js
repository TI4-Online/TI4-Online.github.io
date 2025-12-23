"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gravitonLaserSystem = exports.antimassDeflectors = exports.x89BacterialWeapon = exports.assaultCannon = exports.duraniumArmor = exports.magenDefenseGrid = exports.plasmaScoring = void 0;
exports.getTechBattleEffects = getTechBattleEffects;
const util_log_1 = require("../../util/util-log");
const battle_1 = require("../battle");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
const unitGet_1 = require("../unitGet");
const battleEffects_1 = require("./battleEffects");
function getTechBattleEffects() {
    return [
        exports.plasmaScoring,
        exports.magenDefenseGrid,
        exports.duraniumArmor,
        exports.assaultCannon,
        exports.x89BacterialWeapon,
        exports.antimassDeflectors,
        exports.gravitonLaserSystem,
    ];
}
exports.plasmaScoring = {
    name: 'Plasma Scoring',
    description: 'When 1 or more of your units use BOMBARDMENT or SPACE CANNON, 1 of those units may roll 1 additional die.',
    type: 'tech',
    place: 'both',
    beforeStart: (participant) => {
        // TODO doing this on beforeStart might not be correct... maybe this unit is destroyed by some other effect before the relevant step.
        // It would be more correct to do it at the appropriate time. Like onBombard and onSpaceCannon
        const bestBomber = (0, unitGet_1.getHighestHitUnit)(participant, 'bombardment', undefined);
        if (bestBomber === null || bestBomber === void 0 ? void 0 : bestBomber.bombardment) {
            bestBomber.bombardment.countBonus += 1;
        }
        const bestSpacecannon = (0, unitGet_1.getHighestHitUnit)(participant, 'spaceCannon', undefined);
        if (bestSpacecannon === null || bestSpacecannon === void 0 ? void 0 : bestSpacecannon.spaceCannon) {
            bestSpacecannon.spaceCannon.countBonus += 1;
        }
    },
};
exports.magenDefenseGrid = {
    name: 'Magen Defense Grid',
    description: "When any player activates a system that contains 1 or more of your structures, place 1 infantry from your reinforcements with each of those structures. At the start of ground combat on a planet that contains 1 or more of your structures, produce 1 hit and assign it to 1 of your opponent's ground forces.\nPLEASE NOTE: We dont place extra infantry, increase the count yourself. Checking this assumes you have at least one structure.",
    type: 'tech',
    place: enums_1.Place.ground,
    side: 'defender',
    onStart: (_participant, _battle, otherParticipant) => {
        otherParticipant.hitsToAssign.hitsAssignedByEnemy += 1;
    },
};
exports.duraniumArmor = {
    name: 'Duranium Armor',
    description: 'During each combat round, after you assign hits to your units, repair 1 of your damaged units that did not use SUSTAIN DAMAGE during this combat round.',
    type: 'tech',
    place: 'both',
    onRepair: (unit, participant, battle, effectName) => {
        if (unit.takenDamage && unit.takenDamageRound !== battle.roundNumber) {
            // make sure we dont repair something that is not participating in battle
            if (!unit.isGroundForce && battle.place === enums_1.Place.ground) {
                return;
            }
            if (!unit.isShip && battle.place === enums_1.Place.space) {
                return;
            }
            unit.takenDamage = false;
            (0, battleEffects_1.registerUse)(effectName, participant);
            (0, util_log_1.logWrapper)(`${participant.side} used duranium armor in round ${battle.roundNumber}`);
        }
    },
    timesPerRound: 1,
};
exports.assaultCannon = {
    name: 'Assault Cannon',
    description: 'At the start of a space combat in a system that contains 3 or more of your non-fighter ships, your opponent must destroy 1 of their non-fighter ships.',
    type: 'tech',
    place: enums_1.Place.space,
    onStart: (participant, battle, otherParticipant) => {
        if ((0, unitGet_1.getNonFighterShips)(participant).length >= 3) {
            const worstShip = (0, unitGet_1.getLowestWorthUnit)(otherParticipant, enums_1.Place.space, false);
            if (worstShip) {
                (0, battle_1.destroyUnit)(battle, worstShip);
                (0, util_log_1.logWrapper)(`Assault cannon destroyed ${worstShip.type}`);
            }
        }
    },
};
exports.x89BacterialWeapon = {
    name: 'X-89 Bacterial Weapon',
    description: "Double the hits produced by your units' BOMBARDMENT and ground combat rolls. Exhaust each planet you use BOMBARDMENT against.",
    type: 'tech',
    place: enums_1.Place.ground,
    onBombardmentHit: (_participant, _battle, _otherParticipant, hitInfo) => {
        if (hitInfo.hits > 0) {
            (0, util_log_1.logWrapper)(`X-89 Bacterial Weapon adds ${hitInfo.hits} hits to bombardment`);
            hitInfo.hits *= 2;
        }
    },
    onHit: (_participant, _battle, _otherParticipant, hitInfo) => {
        if (hitInfo.hits > 0) {
            (0, util_log_1.logWrapper)(`X-89 Bacterial Weapon adds ${hitInfo.hits} hits to ground combat hit.`);
            hitInfo.hits *= 2;
        }
    },
};
exports.antimassDeflectors = {
    name: 'Antimass Deflectors',
    description: 'When other players’ units use SPACE CANNON against your units, apply -1 to the result of each die roll.',
    type: 'tech',
    place: 'both',
    transformEnemyUnit: (u) => {
        if (u.spaceCannon) {
            return (0, unit_1.getUnitWithImproved)(u, 'spaceCannon', 'hit', 'permanent', -1);
        }
        else {
            return u;
        }
    },
};
// In theory graviton could cause problems. It gives permanent 'assignHitsToNonFighters' which is incorrect.
exports.gravitonLaserSystem = {
    name: 'Graviton Laser System',
    description: 'You may exhaust this card before 1 or more of your units uses SPACE CANNON; hits produced by those units must be assigned to non-fighter ships if able.',
    type: 'tech',
    place: enums_1.Place.space,
    transformUnit: (u) => {
        // TODO if a carrier is destroyed here, the fighters should be destroyed prior to combat.
        if (u.spaceCannon) {
            u.assignHitsToNonFighters = true;
            return u;
        }
        else {
            return u;
        }
    },
};
//# sourceMappingURL=tech.js.map