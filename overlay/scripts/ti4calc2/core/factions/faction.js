"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactionBattleEffects = getFactionBattleEffects;
exports.getFactionStuffNonUnit = getFactionStuffNonUnit;
exports.getPromissary = getPromissary;
exports.getAgent = getAgent;
exports.getCommanders = getCommanders;
exports.getGeneralEffectFromFactions = getGeneralEffectFromFactions;
const enums_1 = require("../enums");
const arborec_1 = require("./arborec");
const argentFlight_1 = require("./argentFlight");
const baronyOfLetnev_1 = require("./baronyOfLetnev");
const clanOfSaar_1 = require("./clanOfSaar");
const creuss_1 = require("./creuss");
const crimsonRebellion_1 = require("./crimsonRebellion");
const deepwrought_1 = require("./deepwrought");
const empyrean_1 = require("./empyrean");
const hacan_1 = require("./hacan");
const jolNar_1 = require("./jolNar");
const keleres_1 = require("./keleres");
const l1z1x_1 = require("./l1z1x");
const mahact_1 = require("./mahact");
const mentak_1 = require("./mentak");
const muaat_1 = require("./muaat");
const naalu_1 = require("./naalu");
const naazRokha_1 = require("./naazRokha");
const nekro_1 = require("./nekro");
const neutral_1 = require("./neutral");
const nomad_1 = require("./nomad");
const sardakkNorr_1 = require("./sardakkNorr");
const sol_1 = require("./sol");
const titansOfUl_1 = require("./titansOfUl");
const vuilRaith_1 = require("./vuilRaith");
const winnu_1 = require("./winnu");
const xxcha_1 = require("./xxcha");
const yin_1 = require("./yin");
const yssaril_1 = require("./yssaril");
const FACTION_MAP = {
    Arborec: arborec_1.arborec,
    'Argent flight': argentFlight_1.argentFlight,
    'Barony of Letnev': baronyOfLetnev_1.baronyOfLetnev,
    'Clan of Saar': clanOfSaar_1.clanOfSaar,
    Creuss: creuss_1.creuss,
    'Crimson Rebellion': crimsonRebellion_1.crimsonRebellion,
    Deepwrought: deepwrought_1.deepwrought,
    Empyrean: empyrean_1.empyrean,
    Hacan: hacan_1.hacan,
    'Jol-Nar': jolNar_1.jolNar,
    Keleres: keleres_1.keleres,
    L1z1x: l1z1x_1.l1z1x,
    Mahact: mahact_1.mahact,
    Mentak: mentak_1.mentak,
    Muaat: muaat_1.muaat,
    'Naaz-Rokha': naazRokha_1.naazRokha,
    Naalu: naalu_1.naalu,
    Nekro: nekro_1.nekro,
    Neutral: neutral_1.neutral,
    Nomad: nomad_1.nomad,
    "Sardakk N'orr": sardakkNorr_1.sardarkkNorr,
    Sol: sol_1.sol,
    'Titans of Ul': titansOfUl_1.titansOfUl,
    "Vuil'Raith": vuilRaith_1.vuilRaith,
    Winnu: winnu_1.winnu,
    Xxcha: xxcha_1.xxcha,
    Yin: yin_1.yin,
    Yssaril: yssaril_1.yssaril,
};
function getFactionBattleEffects(p) {
    if (isParticipant(p)) {
        return FACTION_MAP[p.faction];
    }
    else {
        return FACTION_MAP[p];
    }
}
function isParticipant(p) {
    // eslint-disable-next-line
    if (p.battleEffects !== undefined) {
        return true;
    }
    else {
        return false;
    }
}
function getFactionStuffNonUnit() {
    return Object.values(enums_1.Faction)
        .map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => (effect.type === 'faction-tech' || effect.type === 'faction-ability') &&
            effect.unit === undefined);
    })
        .flat();
}
function getPromissary() {
    return Object.values(enums_1.Faction)
        .map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === 'promissary');
    })
        .flat();
}
function getAgent() {
    return Object.values(enums_1.Faction)
        .map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === 'agent');
    })
        .flat();
}
function getCommanders() {
    return Object.values(enums_1.Faction)
        .map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === 'commander');
    })
        .flat();
}
function getGeneralEffectFromFactions() {
    return Object.values(enums_1.Faction)
        .map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === 'general');
    })
        .flat();
}
//# sourceMappingURL=faction.js.map