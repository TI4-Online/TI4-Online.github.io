"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnitMap = void 0;
exports.setupBattle = setupBattle;
exports.startBattle = startBattle;
exports.createParticipant = createParticipant;
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const times_1 = __importDefault(require("lodash/times"));
const query_params_1 = require("../util/query-params");
const util_object_1 = require("../util/util-object");
const battle_1 = require("./battle");
const battle_types_1 = require("./battle-types");
const battleEffects_1 = require("./battleeffect/battleEffects");
const unitUpgrades_1 = require("./battleeffect/unitUpgrades");
const enums_1 = require("./enums");
const faction_1 = require("./factions/faction");
const unit_1 = require("./unit");
function setupBattle(battle) {
    battle = (0, cloneDeep_1.default)(battle);
    return createBattleInstance(battle);
}
function startBattle(battle) {
    return (0, battle_1.doBattle)(battle);
}
function createBattleInstance(battle) {
    // How we create and apply battle effects is a bit complicated, due to two reasons:
    // First, one sides battle effects affect the other side, so we need to create both participants and then apply
    // battle effects to the opponent
    // Also, a battle effect (such as the flagships) can give units new battle effects. So unit battle effects needs
    // to be applied after all other effects.
    const attackerBattleEffects = getParticipantBattleEffects(battle.attacker, battle.place);
    const attacker = createParticipantInstance(battle.attacker, attackerBattleEffects, 'attacker', battle.place);
    const defenderBattleEffects = getParticipantBattleEffects(battle.defender, battle.place);
    const defender = createParticipantInstance(battle.defender, defenderBattleEffects, 'defender', battle.place);
    addOtherParticipantsBattleEffects(attacker, defenderBattleEffects, battle.place);
    addOtherParticipantsBattleEffects(defender, attackerBattleEffects, battle.place);
    fixUnitBattleEffects(battle.attacker, attacker, defender, battle.place);
    fixUnitBattleEffects(battle.defender, defender, attacker, battle.place);
    damageUnits(attacker, battle.attacker.damagedUnits);
    damageUnits(defender, battle.defender.damagedUnits);
    return {
        place: battle.place,
        attacker,
        defender,
        roundNumber: 1,
    };
}
function getParticipantUnits(participant) {
    const units = (0, util_object_1.objectEntries)(participant.units)
        .map(([unitType, number]) => {
        return (0, times_1.default)(number, () => {
            return (0, unit_1.createUnit)(unitType);
        });
    })
        .flat();
    return units;
}
function getParticipantBattleEffects(participant, place) {
    const allBattleEffects = (0, battleEffects_1.getAllBattleEffects)();
    // Say I select baron, choose their faction tech, then switch to arborec. Here we filter out unviable techs like that:
    const battleEffects = [];
    for (const effectName in participant.battleEffects) {
        const battleEffectCount = participant.battleEffects[effectName];
        if (battleEffectCount === undefined || battleEffectCount === 0) {
            continue;
        }
        const effect = allBattleEffects.find((e) => e.name === effectName);
        if (effect.faction === undefined ||
            effect.faction === participant.faction ||
            participant.faction === enums_1.Faction.nekro) {
            battleEffects.push(effect);
        }
    }
    const factionAbilities = (0, faction_1.getFactionBattleEffects)(participant).filter((effect) => effect.type === 'faction');
    battleEffects.push(...factionAbilities);
    (0, util_object_1.objectEntries)(participant.unitUpgrades).forEach(([unitType, upgraded]) => {
        if (upgraded) {
            const unitUpgrade = (0, unitUpgrades_1.getUnitUpgrade)(participant.faction, unitType);
            if (unitUpgrade) {
                battleEffects.push(unitUpgrade);
            }
        }
    });
    return battleEffects.filter((effect) => {
        return effect.place === 'both' || effect.place === place;
    });
}
function createParticipantInstance(participant, battleEffects, side, place) {
    const units = getParticipantUnits(participant);
    const participantInstance = {
        side,
        faction: participant.faction,
        units,
        unitUpgrades: participant.unitUpgrades,
        newUnits: [],
        allUnitTransform: [],
        beforeStartEffect: [],
        onStartEffect: [],
        onSustainEffect: [],
        onEnemySustainEffect: [],
        onRepairEffect: [],
        onCombatRoundEnd: [],
        onCombatRoundEndBeforeAssign: [],
        afterAfbEffect: [],
        onDeath: [],
        onHit: [],
        onBombardmentHit: [],
        onSpaceCannon: [],
        onBombardment: [],
        onAfb: [],
        onCombatRound: [],
        effects: {},
        riskDirectHit: participant.riskDirectHit,
        soakHits: 0,
        hitsToAssign: {
            hits: 0,
            hitsToNonFighters: 0,
            hitsAssignedByEnemy: 0,
        },
        afbHitsToAssign: {
            fighterHitsToAssign: 0,
            rollInfoList: [],
        },
        roundActionTracker: {},
        fightActionTracker: {},
    };
    applyBattleEffects(participant, participantInstance, battleEffects, place);
    return participantInstance;
}
function fixUnitBattleEffects(participant, participantInstance, other, place) {
    const participantUnitBattleEffects = participantInstance.units
        .filter((u) => !!u.battleEffects)
        .map((u) => u.battleEffects)
        .flat();
    applyBattleEffects(participant, participantInstance, participantUnitBattleEffects, place);
    addOtherParticipantsBattleEffects(other, participantUnitBattleEffects, place);
}
function addOtherParticipantsBattleEffects(participantInstance, battleEffects, place) {
    battleEffects.forEach((battleEffect) => {
        if (battleEffect.transformEnemyUnit) {
            participantInstance.allUnitTransform.push(battleEffect.transformEnemyUnit);
            participantInstance.units = participantInstance.units.map((u) => {
                return battleEffect.transformEnemyUnit(u, participantInstance, place, battleEffect.name);
            });
        }
    });
}
function applyBattleEffects(participant, participantInstance, battleEffects, place) {
    battleEffects
        .sort((a, b) => {
        var _a, _b;
        const prioDiff = ((_a = b.priority) !== null && _a !== void 0 ? _a : battle_types_1.EFFECT_DEFAULT_PRIORITY) - ((_b = a.priority) !== null && _b !== void 0 ? _b : battle_types_1.EFFECT_DEFAULT_PRIORITY);
        if (prioDiff === 0) {
            // faction abilities take priority
            return a.type === 'faction' ? -1 : 1;
        }
        return prioDiff;
    })
        .forEach((battleEffect) => {
        if (battleEffect.beforeStart) {
            participantInstance.beforeStartEffect.push(battleEffect);
        }
        if (battleEffect.onStart) {
            participantInstance.onStartEffect.push(battleEffect);
        }
        if (battleEffect.onSustain) {
            participantInstance.onSustainEffect.push(battleEffect);
        }
        if (battleEffect.onEnemySustain) {
            participantInstance.onEnemySustainEffect.push(battleEffect);
        }
        if (battleEffect.onRepair) {
            participantInstance.onRepairEffect.push(battleEffect);
        }
        if (battleEffect.onCombatRoundEnd) {
            participantInstance.onCombatRoundEnd.push(battleEffect);
        }
        if (battleEffect.onCombatRoundEndBeforeAssign) {
            participantInstance.onCombatRoundEndBeforeAssign.push(battleEffect);
        }
        if (battleEffect.afterAfb) {
            participantInstance.afterAfbEffect.push(battleEffect);
        }
        if (battleEffect.onDeath) {
            participantInstance.onDeath.push(battleEffect);
        }
        if (battleEffect.onSpaceCannon) {
            participantInstance.onSpaceCannon.push(battleEffect);
        }
        if (battleEffect.onBombardment) {
            participantInstance.onBombardment.push(battleEffect);
        }
        if (battleEffect.onAfb) {
            participantInstance.onAfb.push(battleEffect);
        }
        if (battleEffect.onCombatRound) {
            participantInstance.onCombatRound.push(battleEffect);
        }
        if (battleEffect.onHit) {
            participantInstance.onHit.push(battleEffect);
        }
        if (battleEffect.onBombardmentHit) {
            participantInstance.onBombardmentHit.push(battleEffect);
        }
        if (battleEffect.transformUnit) {
            participantInstance.allUnitTransform.push(battleEffect.transformUnit);
            participantInstance.units = participantInstance.units.map((u) => battleEffect.transformUnit(u, participantInstance, place, battleEffect.name));
        }
        const effectNumber = participant.battleEffects[battleEffect.name];
        if (effectNumber !== undefined) {
            participantInstance.effects[battleEffect.name] = effectNumber;
        }
    });
}
function createParticipant(side, faction, query) {
    const participant = {
        faction: faction !== null && faction !== void 0 ? faction : enums_1.Faction.barony_of_letnev,
        side,
        units: (0, exports.getUnitMap)(),
        unitUpgrades: {},
        damagedUnits: {},
        battleEffects: {},
        riskDirectHit: true,
    };
    if (query) {
        (0, query_params_1.applyQueryParams)(participant, query);
    }
    return participant;
}
const getUnitMap = (units) => {
    const unitMap = Object.assign({ flagship: 0, warsun: 0, dreadnought: 0, carrier: 0, cruiser: 0, destroyer: 0, fighter: 0, mech: 0, infantry: 0, pds: 0, other: 0, nonunit: 0 }, units);
    return unitMap;
};
exports.getUnitMap = getUnitMap;
function damageUnits(participant, damagedUnits) {
    (0, util_object_1.objectEntries)(damagedUnits).forEach(([unitType, n]) => {
        (0, times_1.default)(n, () => {
            const unit = participant.units.find((u) => {
                return u.type === unitType && u.sustainDamage && !u.takenDamage;
            });
            if (unit) {
                unit.takenDamage = true;
                unit.takenDamageRound = 0;
            }
        });
    });
}
//# sourceMappingURL=battleSetup.js.map