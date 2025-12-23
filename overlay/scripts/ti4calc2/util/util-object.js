"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectKeys = objectKeys;
exports.objectEntries = objectEntries;
/**
 * Object.keys but keeps type safety
 */
function objectKeys(obj) {
    const entries = Object.keys(obj);
    return entries;
}
/**
 * Object.entries but keeps type safety
 */
function objectEntries(obj) {
    const entries = Object.entries(obj);
    return entries;
}
//# sourceMappingURL=util-object.js.map