"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIT_MAP = exports.defaultRoll = exports.UnitType = void 0;
exports.getUnitWithImproved = getUnitWithImproved;
exports.createUnit = createUnit;
exports.createUnitAndApplyEffects = createUnitAndApplyEffects;
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const util_log_1 = require("../util/util-log");
const enums_1 = require("./enums");
var UnitType;
(function (UnitType) {
    UnitType["cruiser"] = "cruiser";
    UnitType["carrier"] = "carrier";
    UnitType["destroyer"] = "destroyer";
    UnitType["dreadnought"] = "dreadnought";
    UnitType["fighter"] = "fighter";
    UnitType["flagship"] = "flagship";
    UnitType["infantry"] = "infantry";
    UnitType["mech"] = "mech";
    UnitType["pds"] = "pds";
    UnitType["warsun"] = "warsun";
    UnitType["other"] = "other";
    UnitType["nonunit"] = "nonunit";
})(UnitType || (exports.UnitType = UnitType = {}));
exports.defaultRoll = {
    hit: 0,
    hitBonus: 0,
    hitBonusTmp: 0,
    count: 1,
    countBonus: 0,
    countBonusTmp: 0,
    reroll: 0,
    rerollBonus: 0,
    rerollBonusTmp: 0,
};
const carrier = {
    type: UnitType.carrier,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9 }),
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    diePriority: 60,
};
const cruiser = {
    type: UnitType.cruiser,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 7 }),
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    diePriority: 70,
};
const destroyer = {
    type: UnitType.destroyer,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9 }),
    afb: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9, count: 2 }),
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    diePriority: 80,
};
const dreadnought = {
    type: UnitType.dreadnought,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 5 }),
    bombardment: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 5 }),
    sustainDamage: true,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    useSustainDamagePriority: 100,
    diePriority: 40,
};
const fighter = {
    type: UnitType.fighter,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9 }),
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    diePriority: 100,
};
// flagship has minimal data, the factions modify it.
const flagship = {
    type: UnitType.flagship,
    sustainDamage: true,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    diePriority: 20,
    useSustainDamagePriority: 20,
};
const infantry = {
    type: UnitType.infantry,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 8 }),
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: true,
    isShip: false,
    diePriority: 80,
};
const mech = {
    type: UnitType.mech,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 6 }),
    sustainDamage: true,
    planetaryShield: false,
    isGroundForce: true,
    isShip: false,
    diePriority: 50,
    useSustainDamagePriority: 50,
};
const pds = {
    type: UnitType.pds,
    spaceCannon: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 6 }),
    sustainDamage: false,
    planetaryShield: true,
    isGroundForce: false,
    isShip: false,
};
const warsun = {
    type: UnitType.warsun,
    combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 3, count: 3 }),
    bombardment: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 3, count: 3 }),
    sustainDamage: true,
    planetaryShield: false,
    isGroundForce: false,
    isShip: true,
    diePriority: 10,
    useSustainDamagePriority: 10,
    battleEffects: [
        {
            name: 'warsun remove planetary shield',
            type: 'other',
            place: enums_1.Place.ground,
            transformEnemyUnit: (u) => {
                return Object.assign(Object.assign({}, u), { planetaryShield: false });
            },
        },
    ],
};
const other = {
    type: UnitType.other,
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: false,
    isShip: false,
};
const nonunit = {
    type: UnitType.nonunit,
    sustainDamage: false,
    planetaryShield: false,
    isGroundForce: false,
    isShip: false,
};
exports.UNIT_MAP = {
    carrier,
    cruiser,
    destroyer,
    dreadnought,
    fighter,
    flagship,
    infantry,
    mech,
    pds,
    warsun,
    other,
    nonunit,
};
function getUnitWithImproved(unit, rollType, how, duration, value = 1) {
    if (unit[rollType] === undefined) {
        console.warn(`Tried to improve ${rollType} on unit ${unit.type} but failed.`);
        return unit;
    }
    const bonus = `${how}Bonus${duration === 'temp' ? 'Tmp' : ''}`;
    return Object.assign(Object.assign({}, unit), { [rollType]: Object.assign(Object.assign({}, unit[rollType]), { [bonus]: unit[rollType][bonus] + value }) });
}
function createUnit(type) {
    const unit = (0, cloneDeep_1.default)(exports.UNIT_MAP[type]);
    const unitInstance = Object.assign(Object.assign({}, unit), { takenDamage: false, isDestroyed: false, usedSustain: false });
    return unitInstance;
}
/**
 * This function takes a `modify` function and returns `Readonly` since it will apply battle effects to the
 * unit, and all modifications needs to be done BEFORE battle effects.
 * So if you want to modify the unit, do it in the `modify` function.
 * `Readonly` is only to prevent accidental modification directly after using this function.
 */
function createUnitAndApplyEffects(type, participant, place, modify) {
    let unit = createUnit(type);
    modify(unit);
    participant.allUnitTransform.forEach((effect) => {
        unit = effect(unit, participant, place, effect.name);
    });
    (0, util_log_1.logWrapper)(`${participant.side} created a new unit: ${unit.type}`);
    return unit;
}
//# sourceMappingURL=unit.js.map