"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHighestWorthUnit = getHighestWorthUnit;
exports.getNonFighterShips = getNonFighterShips;
exports.getHighestWorthSustainUnit = getHighestWorthSustainUnit;
exports.getLowestWorthSustainUnit = getLowestWorthSustainUnit;
exports.getHighestWorthNonSustainUnit = getHighestWorthNonSustainUnit;
exports.getLowestWorthNonSustainUndamagedUnit = getLowestWorthNonSustainUndamagedUnit;
exports.getLowestWorthUnit = getLowestWorthUnit;
exports.getWeakestCombatUnit = getWeakestCombatUnit;
exports.getUndamagedUnits = getUndamagedUnits;
exports.getUnits = getUnits;
exports.isHighestHitUnit = isHighestHitUnit;
exports.getHighestHitUnit = getHighestHitUnit;
exports.getHighestDiceCountUnit = getHighestDiceCountUnit;
exports.hasAttackType = hasAttackType;
exports.doesUnitFitPlace = doesUnitFitPlace;
const enums_1 = require("./enums");
const unit_1 = require("./unit");
// INFO: Always use these helper functions instead of "manually" getting units.
// Because these functions for example makes sure you never accidentally retrieve a unit of type "nonunit", and other stuff that is hard to keep track of
function getHighestWorthUnit(p, place, includeFighter) {
    const units = getUnits(p, place, includeFighter);
    if (units.length === 0) {
        return undefined;
    }
    return units.reduce((a, b) => {
        if (a.diePriority === b.diePriority) {
            if (a.takenDamage !== b.takenDamage) {
                return a.takenDamage ? b : a;
            }
            return a.usedSustain ? a : b;
        }
        return a.diePriority > b.diePriority ? b : a;
    });
}
function getNonFighterShips(p) {
    return getUnits(p, enums_1.Place.space, false);
}
function getHighestWorthSustainUnit(p, place, includeFighter) {
    const units = getUnits(p, place, includeFighter, true);
    if (units.length === 0) {
        return undefined;
    }
    else {
        // TODO should I replace all these reduces with a lodash maxby?
        return units.reduce((a, b) => {
            var _a, _b;
            return ((_a = a.useSustainDamagePriority) !== null && _a !== void 0 ? _a : 50) > ((_b = b.useSustainDamagePriority) !== null && _b !== void 0 ? _b : 50) ? b : a;
        });
    }
}
function getLowestWorthSustainUnit(p, place, includeFighter) {
    const units = getUnits(p, place, includeFighter, true);
    if (units.length === 0) {
        return undefined;
    }
    else {
        return units.reduce((a, b) => {
            var _a, _b;
            return ((_a = a.useSustainDamagePriority) !== null && _a !== void 0 ? _a : 50) > ((_b = b.useSustainDamagePriority) !== null && _b !== void 0 ? _b : 50) ? a : b;
        });
    }
}
function getHighestWorthNonSustainUnit(p, place, includeFighter) {
    const units = getUnits(p, place, includeFighter, false);
    if (units.length === 0) {
        return undefined;
    }
    return units.reduce((a, b) => {
        return a.diePriority > b.diePriority ? b : a;
    });
}
function getLowestWorthNonSustainUndamagedUnit(p, place, includeFighter) {
    const units = getUndamagedUnits(p, place, includeFighter, false);
    if (units.length === 0) {
        return undefined;
    }
    return units.reduce((a, b) => {
        return a.diePriority > b.diePriority ? a : b;
    });
}
function getLowestWorthUnit(p, place, includeFighter) {
    const units = getUnits(p, place, includeFighter);
    if (units.length === 0) {
        return undefined;
    }
    else {
        return units.reduce((a, b) => {
            if (a.diePriority === b.diePriority) {
                if (a.takenDamage !== b.takenDamage) {
                    return a.takenDamage && !b.usedSustain ? b : a;
                }
                return a.usedSustain ? b : a;
            }
            return a.diePriority > b.diePriority ? a : b;
        });
    }
}
function getWeakestCombatUnit(p, place, includeFighter) {
    const units = getUnits(p, place, includeFighter);
    if (units.length === 0) {
        return undefined;
    }
    return units.reduce((a, b) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (((_a = a.combat) === null || _a === void 0 ? void 0 : _a.hit) === ((_b = b.combat) === null || _b === void 0 ? void 0 : _b.hit)) {
            if (((_c = a.afb) === null || _c === void 0 ? void 0 : _c.hit) === ((_d = b.afb) === null || _d === void 0 ? void 0 : _d.hit)) {
                return a.sustainDamage > b.sustainDamage ? a : b;
            }
            return ((_f = (_e = a.afb) === null || _e === void 0 ? void 0 : _e.hit) !== null && _f !== void 0 ? _f : 10) > ((_h = (_g = b.afb) === null || _g === void 0 ? void 0 : _g.hit) !== null && _h !== void 0 ? _h : 10) ? a : b;
        }
        return ((_k = (_j = a.combat) === null || _j === void 0 ? void 0 : _j.hit) !== null && _k !== void 0 ? _k : 10) > ((_m = (_l = b.combat) === null || _l === void 0 ? void 0 : _l.hit) !== null && _m !== void 0 ? _m : 10) ? a : b;
    });
}
function getUndamagedUnits(p, place, includeFighter, withSustain) {
    return p.units.filter((u) => {
        if (!includeFighter && u.type === unit_1.UnitType.fighter) {
            return false;
        }
        if (place != null && !doesUnitFitPlace(u, place)) {
            return false;
        }
        if (u.isDestroyed) {
            return false;
        }
        if (u.type === 'nonunit') {
            return false;
        }
        if (withSustain === true) {
            return u.sustainDamage && !u.takenDamage && !u.usedSustain;
        }
        else if (withSustain === false) {
            return !u.sustainDamage && !u.takenDamage && !u.usedSustain;
        }
        else {
            return true;
        }
    });
}
function getUnits(p, place, includeFighter, withSustain) {
    return p.units.filter((u) => {
        if (!includeFighter && u.type === unit_1.UnitType.fighter) {
            return false;
        }
        if (place != null && !doesUnitFitPlace(u, place)) {
            return false;
        }
        if (u.isDestroyed) {
            return false;
        }
        if (u.type === 'nonunit') {
            return false;
        }
        if (withSustain === true) {
            return u.sustainDamage && !u.takenDamage && !u.usedSustain;
        }
        else if (withSustain === false) {
            return !u.sustainDamage || u.takenDamage || u.usedSustain;
        }
        else {
            return true;
        }
    });
}
function isHighestHitUnit(unit, p, attackType, place) {
    const highestHitUnit = getHighestHitUnit(p, attackType, place);
    if (!highestHitUnit) {
        return true;
    }
    const unitHit = unit[attackType].hit - unit[attackType].hitBonus - unit[attackType].hitBonusTmp;
    const bestHit = highestHitUnit[attackType].hit -
        highestHitUnit[attackType].hitBonus -
        highestHitUnit[attackType].hitBonusTmp;
    return unitHit <= bestHit;
}
function getHighestHitUnit(p, attackType, place) {
    const units = getUnits(p, place, true).filter((u) => !!u[attackType]);
    if (units.length === 0) {
        return undefined;
    }
    const bestUnit = units.reduce((a, b) => {
        if (a[attackType].hit - a[attackType].hitBonus - a[attackType].hitBonusTmp <
            b[attackType].hit - b[attackType].hitBonus - b[attackType].hitBonusTmp) {
            return a;
        }
        else {
            return b;
        }
    });
    return bestUnit;
}
function getHighestDiceCountUnit(p, attackType, place) {
    const units = getUnits(p, place, true).filter((u) => !!u[attackType]);
    if (units.length === 0) {
        return undefined;
    }
    const bestUnit = units.reduce((a, b) => {
        if (a[attackType].count + a[attackType].countBonus + a[attackType].countBonusTmp >
            b[attackType].count + b[attackType].countBonus + b[attackType].countBonusTmp) {
            return a;
        }
        else {
            return b;
        }
    });
    return bestUnit;
}
function hasAttackType(p, type) {
    return p.units.some((u) => u[type] !== undefined);
}
function doesUnitFitPlace(u, place) {
    if (place === enums_1.Place.space && !u.isShip) {
        return false;
    }
    if (place === enums_1.Place.ground && !u.isGroundForce) {
        return false;
    }
    return true;
}
//# sourceMappingURL=unitGet.js.map