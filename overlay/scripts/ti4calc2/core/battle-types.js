"use strict";
// battle types is in their own file, because I got weird errors from jest
// the errors were enums being undefined, I guess it was dependency cycle related
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFFECT_LOW_PRIORITY = exports.EFFECT_DEFAULT_PRIORITY = exports.EFFECT_HIGH_PRIORITY = exports.BattleWinner = void 0;
exports.isSide = isSide;
function isSide(value) {
    return value === 'attacker' || value === 'defender';
}
var BattleWinner;
(function (BattleWinner) {
    BattleWinner["attacker"] = "attacker";
    BattleWinner["draw"] = "draw";
    BattleWinner["defender"] = "defender";
})(BattleWinner || (exports.BattleWinner = BattleWinner = {}));
// things that set combat to an absolute value should be done early, so high priority
// also things that add units should be high priority
exports.EFFECT_HIGH_PRIORITY = 75;
exports.EFFECT_DEFAULT_PRIORITY = 50;
// effects that removes spacecannon or bombardment should have low prio, so it happens after "+1 to spacecannon" stuff
exports.EFFECT_LOW_PRIORITY = 25;
//# sourceMappingURL=battle-types.js.map