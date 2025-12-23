"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const times_1 = __importDefault(require("lodash/times"));
// import { ErrorReportUnsaved } from '../server/errorReportController'
const util_object_1 = require("../util/util-object");
const battle_types_1 = require("./battle-types");
const battleSetup_1 = require("./battleSetup");
const constant_1 = require("./constant");
//! To avoid isolatedModules error
exports.default = {};
const MIN_TIME_BETWEEN_SENDING_UPDATES = 250;
self.addEventListener("message", (e) => {
    const battle = e.data;
    try {
        doWork(battle);
    }
    catch (e) {
        reportError(battle, e);
    }
});
function doWork(battle) {
    const battleInstance = (0, battleSetup_1.setupBattle)(battle);
    const finalData = {
        attacker: 0,
        attackerSurvivers: {},
        draw: 0,
        defender: 0,
        defenderSurvivers: {},
        numberOfRolls: 0,
    };
    const parts = Math.ceil(constant_1.NUMBER_OF_ROLLS / constant_1.ROLLS_BETWEEN_UI_UPDATE);
    const partRolls = Math.ceil(constant_1.NUMBER_OF_ROLLS / parts);
    let lastMessageTime = 0;
    (0, times_1.default)(parts, (index) => {
        var _a, _b;
        const partialData = getPartialReport(battleInstance, partRolls);
        finalData.attacker += partialData.attacker;
        for (const [units, count] of (0, util_object_1.objectEntries)(partialData.attackerSurvivers)) {
            finalData.attackerSurvivers[units] =
                ((_a = finalData.attackerSurvivers[units]) !== null && _a !== void 0 ? _a : 0) + count;
        }
        finalData.draw += partialData.draw;
        finalData.defender += partialData.defender;
        for (const [units, count] of (0, util_object_1.objectEntries)(partialData.defenderSurvivers)) {
            finalData.defenderSurvivers[units] =
                ((_b = finalData.defenderSurvivers[units]) !== null && _b !== void 0 ? _b : 0) + count;
        }
        const currentTime = new Date().getTime();
        const lastIteration = parts === index;
        if (lastIteration ||
            currentTime > lastMessageTime + MIN_TIME_BETWEEN_SENDING_UPDATES) {
            lastMessageTime = currentTime;
            self.postMessage(finalData);
        }
    });
    if (constant_1.NUMBER_OF_ROLLS === constant_1.ROLLS_WHEN_BUILDING_TEST_DATA) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(finalData));
    }
}
function getPartialReport(battleInstance, times) {
    const data = {
        attacker: 0,
        attackerSurvivers: {},
        draw: 0,
        defender: 0,
        defenderSurvivers: {},
        numberOfRolls: 0,
    };
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
function reportError(battle, e) {
    var _a;
    let workerError;
    if (e instanceof Error) {
        workerError = {
            error: true,
            message: e.message,
            stack: (_a = e.stack) !== null && _a !== void 0 ? _a : "",
            battle,
        };
    }
    else {
        workerError = {
            error: true,
            message: "unknown error",
            stack: "",
            battle,
        };
    }
    self.postMessage(workerError);
}
//# sourceMappingURL=webworker.js.map