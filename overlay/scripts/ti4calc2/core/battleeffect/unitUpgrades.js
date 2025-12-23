"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUnitUpgrades = void 0;
exports.getUnitUpgrade = getUnitUpgrade;
const faction_1 = require("../factions/faction");
const unit_1 = require("../unit");
const destroyer = {
    name: 'destroyer upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.destroyer,
    transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.destroyer) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 8 }), afb: Object.assign(Object.assign({}, unit.afb), { hit: 6, count: 3 }) });
        }
        else {
            return unit;
        }
    },
};
const cruiser = {
    name: 'cruiser upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.cruiser,
    transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.cruiser) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 6 }) });
        }
        else {
            return unit;
        }
    },
};
const carrier = {
    name: 'carrier upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.carrier,
    transformUnit: (unit) => {
        return unit;
    },
};
const dreadnought = {
    name: 'dreadnought upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.dreadnought,
    transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.dreadnought) {
            return Object.assign(Object.assign({}, unit), { immuneToDirectHit: true });
        }
        else {
            return unit;
        }
    },
};
const fighter = {
    name: 'fighter upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.fighter,
    transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.fighter) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 8 }) });
        }
        else {
            return unit;
        }
    },
};
const infantry = {
    name: 'infantry upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.infantry,
    transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.infantry) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 7 }) });
        }
        else {
            return unit;
        }
    },
};
const pds = {
    name: 'pds upgrade',
    type: 'unit-upgrade',
    place: 'both',
    unit: unit_1.UnitType.pds,
    transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.pds) {
            return Object.assign(Object.assign({}, unit), { spaceCannon: Object.assign(Object.assign({}, unit.spaceCannon), { hit: 5 }) });
        }
        else {
            return unit;
        }
    },
};
const getAllUnitUpgrades = () => [
    destroyer,
    cruiser,
    carrier,
    dreadnought,
    fighter,
    infantry,
    pds,
];
exports.getAllUnitUpgrades = getAllUnitUpgrades;
function getUnitUpgrade(faction, unitType) {
    const factionTechs = (0, faction_1.getFactionBattleEffects)(faction).filter((effect) => effect.type === 'faction-tech');
    const factionTech = factionTechs.find((tech) => tech.unit === unitType);
    if (factionTech) {
        return factionTech;
    }
    else {
        return (0, exports.getAllUnitUpgrades)().find((unitUpgrade) => unitUpgrade.unit === unitType);
    }
}
//# sourceMappingURL=unitUpgrades.js.map