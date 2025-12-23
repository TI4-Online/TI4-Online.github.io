"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defendingInNebula = exports.entropicScar = void 0;
exports.getAllBattleEffects = getAllBattleEffects;
exports.getOtherBattleEffects = getOtherBattleEffects;
exports.isBattleEffectRelevantForSome = isBattleEffectRelevantForSome;
exports.isBattleEffectRelevant = isBattleEffectRelevant;
exports.registerUse = registerUse;
exports.canBattleEffectBeUsed = canBattleEffectBeUsed;
const enums_1 = require("../enums");
const faction_1 = require("../factions/faction");
const actioncard_1 = require("./actioncard");
const agenda_1 = require("./agenda");
const relic_1 = require("./relic");
const tech_1 = require("./tech");
//A symmetrical effect that disables every text ability on units: AFB, bombard, space cannon, sustain, and planetary shield. Deploy needs to be done manually
//TODO: Write tests
exports.entropicScar = {
    name: 'Entropic Scar',
    description: 'All unit abilities (AFB, Bombardment, Space Cannon, Planetary Shield, Sustain Damage, Deploy) cannot be used by or against units inside of an entropic scar. Text abilities are unaffected.',
    type: 'general',
    place: 'both',
    symmetrical: true,
    transformUnit: (unit) => {
        return Object.assign(Object.assign({}, unit), { afb: undefined, bombardment: undefined, spaceCannon: undefined, sustainDamage: false, planetaryShield: false });
    },
};
exports.defendingInNebula = {
    name: 'Defending in nebula',
    description: 'If a space combat occurs in a nebula, the defender applies +1 to each combat roll of their ships during that combat.',
    type: 'general',
    side: 'defender',
    place: enums_1.Place.space,
    transformUnit: (unit) => {
        if (unit.combat) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hitBonus: unit.combat.hitBonus + 1 }) });
        }
        else {
            return unit;
        }
    },
};
function getAllBattleEffects() {
    const otherBattleEffects = getOtherBattleEffects();
    const techs = (0, tech_1.getTechBattleEffects)();
    const factionTechs = (0, faction_1.getFactionStuffNonUnit)();
    const promissary = (0, faction_1.getPromissary)();
    const agents = (0, faction_1.getAgent)();
    const commanders = (0, faction_1.getCommanders)();
    const general = (0, faction_1.getGeneralEffectFromFactions)();
    const actioncards = (0, actioncard_1.getActioncards)();
    const agendas = (0, agenda_1.getAgendas)();
    const relics = (0, relic_1.getRelics)();
    return [
        ...otherBattleEffects,
        ...techs,
        ...factionTechs,
        ...promissary,
        ...agents,
        ...commanders,
        ...general,
        ...actioncards,
        ...agendas,
        ...relics,
    ];
}
function getOtherBattleEffects() {
    return [exports.defendingInNebula, exports.entropicScar];
}
function isBattleEffectRelevantForSome(effect, participant) {
    return participant.some((p) => isBattleEffectRelevant(effect, p));
}
function isBattleEffectRelevant(effect, participant) {
    if (effect.side !== undefined && effect.side !== participant.side) {
        return false;
    }
    if (effect.type === 'faction' || effect.type === 'faction-ability') {
        if (participant.faction !== effect.faction) {
            return false;
        }
    }
    if (effect.type === 'faction-tech') {
        if (participant.faction !== effect.faction && participant.faction !== enums_1.Faction.nekro) {
            return false;
        }
    }
    return true;
}
function registerUse(effectName, p) {
    var _a, _b;
    p.roundActionTracker[effectName] = ((_a = p.roundActionTracker[effectName]) !== null && _a !== void 0 ? _a : 0) + 1;
    p.fightActionTracker[effectName] = ((_b = p.fightActionTracker[effectName]) !== null && _b !== void 0 ? _b : 0) + 1;
}
function canBattleEffectBeUsed(effect, participant) {
    if (effect.timesPerFight !== undefined) {
        const timesUsedThisFight = participant.fightActionTracker[effect.name];
        if (timesUsedThisFight !== undefined && timesUsedThisFight >= effect.timesPerFight) {
            return false;
        }
    }
    if (effect.timesPerRound !== undefined) {
        const timesUsedThisRound = participant.roundActionTracker[effect.name];
        if (timesUsedThisRound !== undefined && timesUsedThisRound >= effect.timesPerRound) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=battleEffects.js.map