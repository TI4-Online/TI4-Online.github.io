"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWrapper = logWrapper;
const constant_1 = require("../core/constant");
function logWrapper(...args) {
    if (constant_1.LOG) {
        // eslint-disable-next-line no-console
        console.log(args);
    }
}
//# sourceMappingURL=util-log.js.map