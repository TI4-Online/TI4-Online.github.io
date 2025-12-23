"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG = exports.ROLLS_BETWEEN_UI_UPDATE = exports.NUMBER_OF_ROLLS = exports.ROLLS_WHEN_BUILDING_TEST_DATA = void 0;
const util_debug_1 = require("../util/util-debug");
exports.ROLLS_WHEN_BUILDING_TEST_DATA = 1000000;
// This is the default number of simulatons when using the site. Make sure this is used when you are done with your PR.
exports.NUMBER_OF_ROLLS = 20000;
// Use this row when debugging. When only one fight is simulated, we log more data. See `LOG` variable below
// export const NUMBER_OF_ROLLS = 1 as number
// Sometimes it is a good idea to add a test simply to ensure that a mechanic isnt broken in the future.
// But then you want a "correct" simulation result to use in the test. Then use this number.
// When this high number is used, the final result is printed to the console when using the dev server.
// Then you can use that final number in your test, and future developers will notice if their change break your feature.
// export const NUMBER_OF_ROLLS = ROLLS_WHEN_BUILDING_TEST_DATA as number
exports.ROLLS_BETWEEN_UI_UPDATE = 1000;
exports.LOG = exports.NUMBER_OF_ROLLS === 1 && !(0, util_debug_1.isTest)();
//# sourceMappingURL=constant.js.map