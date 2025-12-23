"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBattleReport = getBattleReport;
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const times_1 = __importDefault(require("lodash/times"));
const battle_types_1 = require("./battle-types");
const battleSetup_1 = require("./battleSetup");
function getBattleReport(attacker, defender, place, times, addToBattleReport) {
    if (attacker.side !== 'attacker' || defender.side !== 'defender') {
        throw new Error(`side error: ${attacker.side}, ${defender.side}`);
    }
    const battle = {
        attacker,
        defender,
        place,
    };
    const data = addToBattleReport !== null && addToBattleReport !== void 0 ? addToBattleReport : {
        attacker: 0,
        attackerSurvivers: {},
        draw: 0,
        defender: 0,
        defenderSurvivers: {},
        numberOfRolls: 0,
    };
    const battleInstance = (0, battleSetup_1.setupBattle)(battle);
    // TODO bunch of copied code from webworker...
    (0, times_1.default)(times, () => {
        const tmp = (0, cloneDeep_1.default)(battleInstance);
        const result = (0, battleSetup_1.startBattle)(tmp);
        switch (result.winner) {
            case battle_types_1.BattleWinner.attacker:
                data.attacker += 1;
                if (data.attackerSurvivers[result.units] === undefined) {
                    data.attackerSurvivers[result.units] = 1;
                }
                else {
                    data.attackerSurvivers[result.units] += 1;
                }
                break;
            case battle_types_1.BattleWinner.draw:
                data.draw += 1;
                break;
            case battle_types_1.BattleWinner.defender:
                data.defender += 1;
                if (data.defenderSurvivers[result.units] === undefined) {
                    data.defenderSurvivers[result.units] = 1;
                }
                else {
                    data.defenderSurvivers[result.units] += 1;
                }
                break;
        }
    });
    data.numberOfRolls += times;
    return data;
}
//# sourceMappingURL=index.js.map