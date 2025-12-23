"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPercentageNumber = toPercentageNumber;
exports.toPercentageString = toPercentageString;
function toPercentageNumber(total, n) {
    const percentage = n / total;
    return Math.round(percentage * 100);
}
function toPercentageString(total, n) {
    return `${toPercentageNumber(total, n)}%`;
}
//# sourceMappingURL=util-number.js.map