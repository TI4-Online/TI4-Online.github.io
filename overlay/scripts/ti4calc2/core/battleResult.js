"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBattleResultUnitString = getBattleResultUnitString;
const unit_1 = require("./unit");
function getBattleResultUnitString(p) {
    return p.units
        .filter((u) => u.type !== unit_1.UnitType.other)
        .sort((a, b) => {
        var _a, _b;
        if (a.type === b.type) {
            if (a.takenDamage) {
                return 1;
            }
            else {
                return -1;
            }
        }
        return ((_a = a.diePriority) !== null && _a !== void 0 ? _a : 50) - ((_b = b.diePriority) !== null && _b !== void 0 ? _b : 50);
    })
        .map((u) => {
        if (u.takenDamage) {
            return `${getChar(u)}-`;
        }
        else {
            return getChar(u);
        }
    })
        .join('');
}
function getChar(u) {
    switch (u.type) {
        case unit_1.UnitType.flagship:
            return 'F';
        case unit_1.UnitType.warsun:
            return 'W';
        case unit_1.UnitType.dreadnought:
            return 'D';
        case unit_1.UnitType.carrier:
            return 'C';
        case unit_1.UnitType.cruiser:
            return 'c';
        case unit_1.UnitType.destroyer:
            return 'd';
        case unit_1.UnitType.fighter:
            return 'f';
        case unit_1.UnitType.mech:
            return 'M';
        case unit_1.UnitType.infantry:
            return 'i';
        case unit_1.UnitType.pds:
            return 'p';
        case unit_1.UnitType.other:
            return 'o'; // should never happen
        case unit_1.UnitType.nonunit:
            return 'n'; // should never happen
    }
}
//# sourceMappingURL=battleResult.js.map