"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalStorage = exports.setLocalStorage = exports.LS_SHOW_DETAILED_REPORT = exports.LS_DEFENDER_FACTION = exports.LS_ATTACKER_FACTION = void 0;
exports.LS_ATTACKER_FACTION = 'attacker.faction';
exports.LS_DEFENDER_FACTION = 'defender.faction';
exports.LS_SHOW_DETAILED_REPORT = 'show_detailed_report';
const setLocalStorage = (key, value) => {
    // eslint-disable-next-line
    if (localStorage) {
        localStorage.setItem(key, value);
    }
};
exports.setLocalStorage = setLocalStorage;
const getLocalStorage = (key) => {
    // eslint-disable-next-line
    if (localStorage) {
        const value = localStorage.getItem(key);
        if (value == null) {
            return undefined;
        }
        else {
            return value;
        }
    }
    else {
        return undefined;
    }
};
exports.getLocalStorage = getLocalStorage;
//# sourceMappingURL=localStorageWrapper.js.map