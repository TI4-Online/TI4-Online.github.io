"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDebugTimer = void 0;
exports.isTest = isTest;
const startDebugTimer = (taskName = "The task") => {
    const timer = {
        startTime: new Date(),
        end: () => {
            const timeMs = new Date().getTime() - timer.startTime.getTime();
            const tmp = Math.floor(timeMs / 100);
            const seconds = tmp / 10;
            if (seconds === 0) {
                console.log(`${taskName} took exactly ${timeMs} milliseconds`);
            }
            else if (seconds === Math.floor(seconds)) {
                console.log(`${taskName} took ${seconds}.0 seconds`);
            }
            else {
                console.log(`${taskName} took ${seconds} seconds`);
            }
        },
    };
    return timer;
};
exports.startDebugTimer = startDebugTimer;
function isTest() {
    var _a;
    return (typeof process !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((_a = process.env) === null || _a === void 0 ? void 0 : _a.JEST_WORKER_ID) !== undefined);
}
//# sourceMappingURL=util-debug.js.map