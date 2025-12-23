"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doBattle = doBattle;
exports.doBombardment = doBombardment;
exports.destroyUnit = destroyUnit;
exports.isBattleOngoing = isBattleOngoing;
exports.isParticipantAlive = isParticipantAlive;
exports.isSustainDisabled = isSustainDisabled;
exports.getOtherParticipant = getOtherParticipant;
/* eslint-disable @typescript-eslint/no-shadow */
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const util_log_1 = require("../util/util-log");
const battle_types_1 = require("./battle-types");
const battleEffects_1 = require("./battleeffect/battleEffects");
const battleResult_1 = require("./battleResult");
const constant_1 = require("./constant");
const enums_1 = require("./enums");
const roll_1 = require("./roll");
const unit_1 = require("./unit");
const unitGet_1 = require("./unitGet");
// TODO add retreat?
function doBattle(battle) {
    let isDuringCombat = false;
    const isDuringBombardment = false;
    battle.attacker.beforeStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.beforeStart(battle.attacker, battle, battle.defender, effect.name);
        }
    });
    battle.defender.beforeStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
            effect.beforeStart(battle.defender, battle, battle.attacker, effect.name);
        }
    });
    resolveHits(battle, isDuringCombat, isDuringBombardment);
    doBombardment(battle, isDuringCombat);
    doSpaceCannon(battle);
    resolveHits(battle, isDuringCombat, isDuringBombardment);
    battle.attacker.onStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.onStart(battle.attacker, battle, battle.defender, effect.name);
        }
    });
    battle.defender.onStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
            effect.onStart(battle.defender, battle, battle.attacker, effect.name);
        }
    });
    resolveHits(battle, isDuringCombat, isDuringBombardment);
    isDuringCombat = true;
    doAfb(battle);
    let battleResult = undefined;
    while (!battleResult) {
        doBattleRolls(battle);
        battle.attacker.onCombatRoundEndBeforeAssign.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
                effect.onCombatRoundEndBeforeAssign(battle.attacker, battle, battle.defender, effect.name);
            }
        });
        battle.defender.onCombatRoundEndBeforeAssign.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
                effect.onCombatRoundEndBeforeAssign(battle.defender, battle, battle.attacker, effect.name);
            }
        });
        resolveHits(battle, isDuringCombat, isDuringBombardment);
        doRepairStep(battle, isDuringCombat);
        battle.attacker.onCombatRoundEnd.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
                effect.onCombatRoundEnd(battle.attacker, battle, battle.defender, effect.name);
            }
        });
        battle.defender.onCombatRoundEnd.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
                effect.onCombatRoundEnd(battle.defender, battle, battle.attacker, effect.name);
            }
        });
        resolveHits(battle, isDuringCombat, isDuringBombardment);
        battle.roundNumber += 1;
        battle.attacker.roundActionTracker = {};
        battle.defender.roundActionTracker = {};
        if (battle.roundNumber === 400) {
            // I guess an infinite fight should be won by the defender, right? But who cares.
            console.warn("Infinite fight detected");
            return {
                winner: battle_types_1.BattleWinner.draw,
                units: "",
            };
        }
        addNewUnits(battle.attacker);
        addNewUnits(battle.defender);
        const attackerAlive = isParticipantAlive(battle.attacker, battle.place);
        const defenderAlive = isParticipantAlive(battle.defender, battle.place);
        if (attackerAlive && !defenderAlive) {
            battleResult = {
                winner: battle_types_1.BattleWinner.attacker,
                units: (0, battleResult_1.getBattleResultUnitString)(battle.attacker),
            };
        }
        else if (!attackerAlive && defenderAlive) {
            battleResult = {
                winner: battle_types_1.BattleWinner.defender,
                units: (0, battleResult_1.getBattleResultUnitString)(battle.defender),
            };
        }
        else if (!attackerAlive && !defenderAlive) {
            battleResult = {
                winner: battle_types_1.BattleWinner.draw,
                units: "",
            };
        }
    }
    (0, util_log_1.logWrapper)(`Battle resolved after ${battle.roundNumber - 1} rounds`);
    if (battleResult.winner === battle_types_1.BattleWinner.attacker) {
        (0, util_log_1.logWrapper)("Attacker won");
    }
    else if (battleResult.winner === battle_types_1.BattleWinner.defender) {
        (0, util_log_1.logWrapper)("Defender won");
    }
    else {
        (0, util_log_1.logWrapper)("Battle ended in a draw");
    }
    return battleResult;
}
function clearSustains(p) {
    p.units.forEach((u) => (u.usedSustain = false));
}
function addNewUnits(p) {
    if (p.newUnits.length > 0) {
        p.units = [...p.units, ...p.newUnits];
        p.newUnits = [];
    }
}
function doBombardment(battle, isDuringCombat) {
    const isDuringBombardment = true;
    if (battle.place !== enums_1.Place.ground) {
        return;
    }
    battle.attacker.onBombardment.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.onBombardment(battle.attacker, battle, battle.defender, effect.name);
        }
    });
    if (battle.defender.units.some((u) => u.planetaryShield)) {
        return;
    }
    const hits = battle.attacker.units
        .filter((u) => u.bombardment !== undefined)
        .map((u) => {
        logAttack(battle.attacker, u, "bombardment");
        return (0, roll_1.getHits)(u.bombardment);
    });
    battle.attacker.onBombardmentHit.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            hits.forEach((hit) => {
                effect.onBombardmentHit(battle.attacker, battle, battle.defender, hit);
            });
        }
    });
    const totalHits = hits.reduce((a, b) => {
        return a + b.hits;
    }, 0);
    (0, util_log_1.logWrapper)(`bombardment produced ${totalHits} hits.`);
    battle.defender.hitsToAssign.hits += totalHits;
    resolveHits(battle, isDuringCombat, isDuringBombardment);
}
function doSpaceCannon(battle) {
    if (battle.place === enums_1.Place.space) {
        const attackerHits = getSpaceCannonHits(battle.attacker, battle, battle.defender);
        if (constant_1.LOG && battle.attacker.units.some((u) => !!u.spaceCannon)) {
            logHits(battle.attacker, attackerHits, "spaceCannon");
        }
        battle.defender.hitsToAssign = attackerHits;
    }
    const defenderHits = getSpaceCannonHits(battle.defender, battle, battle.attacker);
    if (constant_1.LOG && battle.defender.units.some((u) => !!u.spaceCannon)) {
        logHits(battle.defender, defenderHits, "spaceCannon");
    }
    battle.attacker.hitsToAssign = defenderHits;
}
function getSpaceCannonHits(p, battle, otherParticipant) {
    p.onSpaceCannon.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
            effect.onSpaceCannon(p, battle, otherParticipant, effect.name);
        }
    });
    return p.units
        .map((u) => {
        logAttack(p, u, "spaceCannon");
        const hitInfo = u.spaceCannon
            ? (0, roll_1.getHits)(u.spaceCannon)
            : { hits: 0, rollInfoList: [] };
        const hits = hitInfo.hits;
        return {
            hits: u.assignHitsToNonFighters ? 0 : hits,
            hitsToNonFighters: u.assignHitsToNonFighters ? hits : 0,
            hitsAssignedByEnemy: 0, // I dont think any unit uses this, so I wont implement it now.
        };
    })
        .reduce((a, b) => {
        return {
            hits: a.hits + b.hits,
            hitsToNonFighters: a.hitsToNonFighters + b.hitsToNonFighters,
            hitsAssignedByEnemy: a.hitsAssignedByEnemy + b.hitsAssignedByEnemy,
        };
    }, {
        hits: 0,
        hitsToNonFighters: 0,
        hitsAssignedByEnemy: 0,
    });
}
function doAfb(battle) {
    if (battle.place !== enums_1.Place.space) {
        return;
    }
    battle.defender.afbHitsToAssign = getAfbHits(battle.attacker, battle, battle.defender);
    battle.attacker.afbHitsToAssign = getAfbHits(battle.defender, battle, battle.attacker);
    resolveAfbHits(battle.attacker);
    resolveAfbHits(battle.defender);
    battle.attacker.afterAfbEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.afterAfb(battle.attacker, battle, battle.defender, effect.name);
        }
    });
    battle.defender.afterAfbEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
            effect.afterAfb(battle.defender, battle, battle.attacker, effect.name);
        }
    });
    removeDeadUnits(battle.attacker, battle);
    removeDeadUnits(battle.defender, battle);
}
function getAfbHits(p, battle, otherParticipant) {
    p.onAfb.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
            effect.onAfb(p, battle, otherParticipant, effect.name);
        }
    });
    const hits = p.units.flatMap((u) => {
        logAttack(p, u, "afb");
        return u.afb ? [(0, roll_1.getHits)(u.afb)] : [];
    });
    const fighterHits = hits.reduce((a, b) => {
        return a + b.hits;
    }, 0);
    const rollInfoList = hits.flatMap((h) => h.rollInfoList);
    return {
        fighterHitsToAssign: fighterHits,
        rollInfoList: rollInfoList,
    };
}
function resolveAfbHits(p) {
    while (p.afbHitsToAssign.fighterHitsToAssign > 0) {
        const aliveFighter = p.units.find((u) => u.type === unit_1.UnitType.fighter && !u.isDestroyed);
        if (aliveFighter) {
            aliveFighter.isDestroyed = true;
            p.afbHitsToAssign.fighterHitsToAssign -= 1;
            (0, util_log_1.logWrapper)(`${p.side} lost fighter to anti fighter barrage`);
        }
        else {
            break;
        }
    }
}
function doBattleRolls(battle) {
    doParticipantBattleRolls(battle, battle.attacker, battle.defender);
    doParticipantBattleRolls(battle, battle.defender, battle.attacker);
}
function doParticipantBattleRolls(battle, p, otherParticipant) {
    const friendlyUnitTransformEffects = p.units
        .filter((unit) => !!unit.aura && unit.aura.length > 0)
        .map((unit) => unit.aura)
        .flat()
        .filter((aura) => aura.place === battle.place || aura.place === "both");
    const friendlyAuras = friendlyUnitTransformEffects.filter((effect) => !!effect.transformUnit);
    const onCombatRoundStartAura = friendlyUnitTransformEffects.filter((effect) => !!effect.onCombatRoundStart);
    const enemyAuras = otherParticipant.units
        .filter((unit) => !!unit.aura && unit.aura.length > 0)
        .map((unit) => unit.aura)
        .flat()
        .filter((effect) => !!effect.transformEnemyUnit)
        .filter((aura) => aura.place === battle.place || aura.place === "both");
    p.onCombatRound.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
            effect.onCombatRound(p, battle, otherParticipant, effect.name);
        }
    });
    let units;
    if (onCombatRoundStartAura.length > 0) {
        // clone units before we modify them with temporary effects
        units = (0, cloneDeep_1.default)(p.units);
        onCombatRoundStartAura.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
                effect.onCombatRoundStart(units, p, battle, effect.name);
            }
        });
    }
    else {
        units = p.units;
    }
    const hits = units
        .filter((unit) => (0, unitGet_1.doesUnitFitPlace)(unit, battle.place))
        .map((unit) => {
        friendlyAuras.forEach((effect) => {
            unit = effect.transformUnit(unit, p, battle);
        });
        enemyAuras.forEach((effect) => {
            unit = effect.transformEnemyUnit(unit, p, battle);
        });
        logAttack(p, unit, "combat");
        const hitInfo = unit.combat
            ? (0, roll_1.getHits)(unit.combat)
            : { hits: 0, rollInfoList: [] };
        if (unit.onHit) {
            unit.onHit(p, battle, otherParticipant, hitInfo);
        }
        p.onHit.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
                effect.onHit(battle.attacker, battle, battle.defender, hitInfo);
            }
        });
        const hits = hitInfo.hits;
        return {
            hits: unit.assignHitsToNonFighters ? 0 : hits,
            hitsToNonFighters: unit.assignHitsToNonFighters ? hits : 0,
            hitsAssignedByEnemy: 0, // I dont think any unit uses this, so I wont implement it now.
        };
    })
        .reduce((a, b) => {
        return {
            hits: a.hits + b.hits,
            hitsToNonFighters: a.hitsToNonFighters + b.hitsToNonFighters,
            hitsAssignedByEnemy: a.hitsAssignedByEnemy + b.hitsAssignedByEnemy,
        };
    }, {
        hits: 0,
        hitsToNonFighters: 0,
        hitsAssignedByEnemy: 0,
    });
    logHits(p, hits, "combat");
    otherParticipant.hitsToAssign = hits;
}
function resolveHits(battle, isDuringCombat, isDuringBombardment) {
    while (hasHitToAssign(battle.attacker) || hasHitToAssign(battle.defender)) {
        resolveParticipantHits(battle, battle.attacker, isDuringCombat, isDuringBombardment);
        resolveParticipantHits(battle, battle.defender, isDuringCombat, isDuringBombardment);
        removeDeadUnits(battle.attacker, battle);
        removeDeadUnits(battle.defender, battle);
    }
    clearSustains(battle.attacker);
    clearSustains(battle.defender);
}
function hasHitToAssign(p) {
    return (p.hitsToAssign.hits > 0 ||
        p.hitsToAssign.hitsToNonFighters > 0 ||
        p.hitsToAssign.hitsAssignedByEnemy > 0);
}
function resolveParticipantHits(battle, p, isDuringCombat, isDuringBombardment) {
    while (hasHitToAssign(p)) {
        if (p.soakHits > 0) {
            soakHit(p);
            continue;
        }
        if (p.hitsToAssign.hitsAssignedByEnemy > 0) {
            if (p.hitsToAssign.hitsAssignedByEnemy > 1) {
                // This currently cant happen, so lets not bother to implement it
                console.warn("hitsAssignedByEnemy is larger than one, we should assign them to best sustain unit! But that aint implemented!");
            }
            const highestWorthNonSustainUnit = (0, unitGet_1.getHighestWorthNonSustainUnit)(p, battle.place, true);
            if (highestWorthNonSustainUnit) {
                (0, util_log_1.logWrapper)(`${p.side} loses ${highestWorthNonSustainUnit.type} after hits assigned by opponent.`);
                highestWorthNonSustainUnit.isDestroyed = true;
            }
            else {
                // This happens when all units have sustain. We pick the best sustain unit in case we have direct hit.
                const highestWorthSustainUnit = (0, unitGet_1.getHighestWorthSustainUnit)(p, battle.place, true);
                if (highestWorthSustainUnit) {
                    doSustainDamage(battle, p, highestWorthSustainUnit, isDuringCombat);
                }
            }
            p.hitsToAssign.hitsAssignedByEnemy -= 1;
        }
        else if (p.hitsToAssign.hitsToNonFighters > 0) {
            const appliedHitToNonFighter = applyHit(battle, p, false, isDuringCombat, isDuringBombardment);
            if (!appliedHitToNonFighter) {
                applyHit(battle, p, true, isDuringCombat, isDuringBombardment);
            }
            p.hitsToAssign.hitsToNonFighters -= 1;
        }
        else {
            applyHit(battle, p, true, isDuringCombat, isDuringBombardment);
            p.hitsToAssign.hits -= 1;
        }
    }
}
function destroyUnit(battle, unit) {
    unit.isDestroyed = true;
    removeDeadUnits(battle.attacker, battle);
    removeDeadUnits(battle.defender, battle);
}
function removeDeadUnits(p, battle) {
    const deadUnits = p.units.filter((u) => u.isDestroyed);
    p.units = p.units.filter((u) => !u.isDestroyed);
    if (deadUnits.length > 0) {
        const otherParticipant = getOtherParticipant(battle, p);
        p.onDeath.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
                effect.onDeath(deadUnits, p, otherParticipant, battle, true, effect.name);
            }
        });
        otherParticipant.onDeath.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, otherParticipant)) {
                effect.onDeath(deadUnits, otherParticipant, p, battle, false, effect.name);
            }
        });
    }
}
function soakHit(p) {
    p.soakHits -= 1;
    if (p.hitsToAssign.hitsAssignedByEnemy > 0) {
        p.hitsToAssign.hitsAssignedByEnemy -= 1;
    }
    else if (p.hitsToAssign.hitsToNonFighters > 0) {
        p.hitsToAssign.hitsToNonFighters -= 1;
    }
    else if (p.hitsToAssign.hits > 0) {
        p.hitsToAssign.hits -= 1;
    }
    else {
        throw new Error("soak hits called without reason");
    }
    (0, util_log_1.logWrapper)(`${p.side} soaked a hit. ${p.soakHits} soaks remaining.`);
}
// returns if the hit was applied to a unit
function applyHit(battle, p, includeFighter, isDuringCombat, isDuringBombardment) {
    const sustainDisabled = isSustainDisabled(battle, p, isDuringBombardment);
    // If we ever desired to speed up the code, this could be done in a single passover of all units
    // Currently if we don't have riskDirectHit dreadnoughts will die before flagship sustains.
    // I guess that is okay, even though it is most likely not how a human would play.
    const bestSustainUnit = (0, unitGet_1.getLowestWorthSustainUnit)(p, battle.place, includeFighter);
    if (bestSustainUnit &&
        !sustainDisabled &&
        (battle.place === enums_1.Place.ground ||
            p.riskDirectHit ||
            bestSustainUnit.immuneToDirectHit)) {
        doSustainDamage(battle, p, bestSustainUnit, isDuringCombat);
        return true;
    }
    else {
        const bestDieUnit = (0, unitGet_1.getLowestWorthUnit)(p, battle.place, includeFighter);
        if (bestDieUnit) {
            if (!sustainDisabled &&
                bestDieUnit.sustainDamage &&
                !bestDieUnit.takenDamage &&
                !bestDieUnit.usedSustain) {
                doSustainDamage(battle, p, bestDieUnit, isDuringCombat);
            }
            else {
                bestDieUnit.isDestroyed = true;
                (0, util_log_1.logWrapper)(`${p.side} loses ${bestDieUnit.type}`);
            }
            return true;
        }
        return false;
    }
}
function doSustainDamage(battle, p, unit, isDuringCombat) {
    unit.takenDamage = true;
    unit.takenDamageRound = battle.roundNumber;
    unit.usedSustain = true;
    p.onSustainEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
            effect.onSustain(unit, p, battle, effect.name, isDuringCombat);
        }
    });
    const otherP = getOtherParticipant(battle, p);
    otherP.onEnemySustainEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, otherP)) {
            effect.onEnemySustain(unit, otherP, battle, effect.name, isDuringCombat);
        }
    });
    (0, util_log_1.logWrapper)(`${p.side} uses sustain on ${unit.type}`);
}
function doRepairStep(battle, isDuringCombat) {
    doRepairStepForParticipant(battle, battle.attacker, isDuringCombat);
    doRepairStepForParticipant(battle, battle.defender, isDuringCombat);
}
function doRepairStepForParticipant(battle, participant, isDuringCombat) {
    if (participant.onRepairEffect.length > 0) {
        participant.units.forEach((unit) => {
            participant.onRepairEffect.forEach((effect) => {
                if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, participant)) {
                    effect.onRepair(unit, participant, battle, effect.name, isDuringCombat);
                }
            });
        });
    }
}
function isBattleOngoing(battle) {
    return (isParticipantAlive(battle.attacker, battle.place) &&
        isParticipantAlive(battle.defender, battle.place));
}
function isParticipantAlive(p, place) {
    if (p.newUnits.length > 0) {
        return true;
    }
    return p.units.some((u) => {
        if (!(0, unitGet_1.doesUnitFitPlace)(u, place)) {
            return false;
        }
        return !u.isDestroyed;
    });
}
function isSustainDisabled(battle, p, isDuringBombardment) {
    const other = getOtherParticipant(battle, p);
    return other.units.some((u) => u.preventEnemySustain === true ||
        (!isDuringBombardment && u.preventEnemySustainOnPlanet === true));
}
function getOtherParticipant(battle, p) {
    return p.side === "attacker" ? battle.defender : battle.attacker;
}
/* eslint-disable no-console */
function logAttack(p, unit, rollType) {
    const roll = unit[rollType];
    if (constant_1.LOG && roll) {
        const hit = roll.hit - roll.hitBonus - roll.hitBonusTmp;
        const count = roll.count + roll.countBonus + roll.countBonusTmp;
        const reroll = roll.reroll + roll.rerollBonus + roll.rerollBonusTmp;
        if (count === 1 && reroll === 0) {
            console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}.`);
        }
        else if (reroll === 0) {
            console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}, using ${count} dices`);
        }
        else if (count === 1) {
            console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}, using ${reroll} rerolls`);
        }
        else {
            console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}, using ${count} dices and ${reroll} rerolls.`);
        }
    }
}
function logHits(p, hits, rollType) {
    if (constant_1.LOG) {
        if (hits.hits === 0 && hits.hitsToNonFighters === 0) {
            console.log(`${p.side} ${rollType} missed all`);
        }
        else if (hits.hitsToNonFighters === 0) {
            console.log(`${p.side} ${rollType} hits ${hits.hits} normal hits.`);
        }
        else if (hits.hits === 0) {
            console.log(`${p.side} ${rollType} hits ${hits.hitsToNonFighters} to non-fighters.`);
        }
        else {
            console.log(`${p.side} ${rollType} hits ${hits.hits} normal hits and ${hits.hitsToNonFighters} to non-fighters.`);
        }
    }
}
//# sourceMappingURL=battle.js.map