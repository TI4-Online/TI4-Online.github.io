"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryParams = createQueryParams;
exports.applyQueryParams = applyQueryParams;
exports.hasSomeQueryParams = hasSomeQueryParams;
exports.hasQueryParamForFaction = hasQueryParamForFaction;
const battle_types_1 = require("../core/battle-types");
const battleEffects_1 = require("../core/battleeffect/battleEffects");
const enums_1 = require("../core/enums");
const unit_1 = require("../core/unit");
const util_object_1 = require("./util-object");
const allBattleEffects = (0, battleEffects_1.getAllBattleEffects)();
function createQueryParams(attacker, defender, place) {
    const params = new URLSearchParams();
    addParticipant(params, attacker, "attacker");
    addParticipant(params, defender, "defender");
    if (place !== enums_1.Place.space) {
        params.set("place", place);
    }
    if (hasUnits(attacker) || hasUnits(defender)) {
        const paramsNonEmpty = params.toString().length > 0;
        window.history.replaceState({}, "", `${location.pathname}${paramsNonEmpty ? "?" : ""}${params}`);
    }
    else {
        window.history.replaceState({}, "", location.pathname);
    }
}
function addParticipant(params, p, side) {
    params.set(side + "-faction", p.faction);
    for (const unit of (0, util_object_1.objectEntries)(p.units)) {
        if (unit[1] > 0) {
            params.set(`${side}-unit-${unit[0]}`, `${unit[1]}`);
        }
    }
    for (const unit of (0, util_object_1.objectEntries)(p.damagedUnits)) {
        const ownedUnits = p.units[unit[0]];
        const actualNumber = Math.min(unit[1], ownedUnits);
        if (actualNumber) {
            params.set(`${side}-damaged-${unit[0]}`, `${actualNumber}`);
        }
    }
    if (!p.riskDirectHit) {
        params.set(`${side}-risk-direct-hit`, "false");
    }
    for (const unitUpgrades of (0, util_object_1.objectEntries)(p.unitUpgrades)) {
        if (unitUpgrades[1]) {
            params.set(`${side}-upgrade-${unitUpgrades[0]}`, "true");
        }
    }
    for (const battleEffects of (0, util_object_1.objectEntries)(p.battleEffects)) {
        if (battleEffects[1] > 0) {
            const symmetrical = allBattleEffects.some((e) => e.name === battleEffects[0] && !!e.symmetrical);
            if (symmetrical) {
                params.set(`effect-${battleEffects[0]}`, `${battleEffects[1]}`);
            }
            else {
                params.set(`${side}-effect-${battleEffects[0]}`, `${battleEffects[1]}`);
            }
        }
    }
}
function applyQueryParams(participant, query) {
    (0, util_object_1.objectEntries)(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            console.warn(`value of ${key} was unexpected array: ${JSON.stringify(value)}`);
            return;
        }
        const factionMatch = key.match(/(attacker|defender)-faction/);
        if (factionMatch) {
            const side = factionMatch[1];
            if (!(0, battle_types_1.isSide)(side)) {
                console.warn(`failed to identify Side: ${side}`);
                return;
            }
            const faction = value;
            if (!Object.values(enums_1.Faction).includes(faction)) {
                console.warn(`Unknown faction found: ${faction}`);
                return;
            }
            else if (side === participant.side) {
                participant.faction = faction;
            }
        }
        const unitMatch = key.match(/(attacker|defender)-unit-(.*)/);
        if (unitMatch) {
            const side = unitMatch[1];
            const unit = unitMatch[2];
            if (!(0, battle_types_1.isSide)(side)) {
                console.warn(`failed to identify Side: ${side}`);
                return;
            }
            if (!Object.values(unit_1.UnitType).includes(unit)) {
                console.warn(`Unknown unit found: ${unit}`);
                return;
            }
            const num = parseInt(value);
            if (isNaN(num)) {
                console.warn(`Unit number was not number for ${unit}: ${value}`);
                return;
            }
            else if (side === participant.side) {
                participant.units[unit] = num;
            }
        }
        const unitDamagedMatch = key.match(/(attacker|defender)-damaged-(.*)/);
        if (unitDamagedMatch) {
            const side = unitDamagedMatch[1];
            const unit = unitDamagedMatch[2];
            if (!(0, battle_types_1.isSide)(side)) {
                console.warn(`failed to identify Side: ${side}`);
                return;
            }
            if (!Object.values(unit_1.UnitType).includes(unit)) {
                console.warn(`Unknown unit found: ${unit}`);
                return;
            }
            const num = parseInt(value);
            if (isNaN(num)) {
                console.warn(`Unit damaged number was not number for ${unit}: ${value}`);
                return;
            }
            else if (side === participant.side) {
                participant.damagedUnits[unit] = num;
            }
        }
        const riskDirectHitMatch = key.match(/(attacker|defender)-risk-direct-hit/);
        if (riskDirectHitMatch) {
            const side = riskDirectHitMatch[1];
            if (!(0, battle_types_1.isSide)(side)) {
                console.warn(`failed to identify Side: ${side}`);
                return;
            }
            const bool = value === "true";
            if (side === participant.side) {
                participant.riskDirectHit = bool;
            }
        }
        const upgradeMatch = key.match(/(attacker|defender)-upgrade-(.*)/);
        if (upgradeMatch) {
            const side = upgradeMatch[1];
            const unit = upgradeMatch[2];
            if (!(0, battle_types_1.isSide)(side)) {
                console.warn(`failed to identify Side: ${side}`);
                return;
            }
            if (!Object.values(unit_1.UnitType).includes(unit)) {
                console.warn(`Unknown unit upgrade found: ${unit}`);
                return;
            }
            const bool = value === "true";
            if (side === participant.side) {
                participant.unitUpgrades[unit] = bool;
            }
        }
        const effectMatch = key.match(/(attacker|defender|)-?effect-(.*)/);
        if (effectMatch) {
            const side = effectMatch[1];
            const effect = effectMatch[2];
            if (!effect) {
                console.warn(`failed to identify effect from ${key}`);
                return;
            }
            if (!(0, battle_types_1.isSide)(side) && side !== "") {
                console.warn(`failed to identify Side: ${side}`);
                return;
            }
            const num = parseInt(value);
            if (isNaN(num)) {
                console.warn(`Effect number was not number for ${effect}: ${value}`);
                return;
            }
            else if (side === participant.side || side === "") {
                participant.battleEffects[effect] = num;
            }
        }
    });
}
function hasUnits(p) {
    return Object.values(p.units).some((val) => val > 0);
}
function hasSomeQueryParams(query) {
    return Object.entries(query).length > 0;
}
function hasQueryParamForFaction(query, side) {
    return Object.keys(query).some((key) => key === `${side}-faction`);
}
//# sourceMappingURL=query-params.js.map