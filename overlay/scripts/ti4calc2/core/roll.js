"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHits = getHits;
/* eslint-disable @typescript-eslint/no-shadow */
const times_1 = __importDefault(require("lodash/times"));
function getHits(roll) {
    const count = roll.count + roll.countBonus + roll.countBonusTmp;
    const hit = roll.hit - roll.hitBonus - roll.hitBonusTmp;
    const rollInfo = [];
    const allResults = (0, times_1.default)(count, () => {
        let reroll = roll.reroll + roll.rerollBonus + roll.rerollBonusTmp;
        let result = false;
        while (!result && reroll >= 0) {
            const roll = Math.floor(Math.random() * 10 + 1);
            result = roll >= hit;
            reroll -= 1;
            rollInfo.push({
                roll,
                hitOn: hit,
            });
        }
        return result;
    }).filter((r) => r).length;
    roll.hitBonusTmp = 0;
    roll.countBonusTmp = 0;
    roll.rerollBonusTmp = 0;
    return { hits: allResults, rollInfoList: rollInfo };
}
//# sourceMappingURL=roll.js.map