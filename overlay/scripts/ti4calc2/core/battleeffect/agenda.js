"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conventionsOfWar = exports.articlesOfWar = exports.prophecyOfIxth = exports.publicizeWeaponSchematics = void 0;
exports.getAgendas = getAgendas;
const battle_types_1 = require("../battle-types");
const enums_1 = require("../enums");
const unit_1 = require("../unit");
function getAgendas() {
    return [
        exports.publicizeWeaponSchematics,
        exports.prophecyOfIxth,
        // articlesOfWar,
        exports.conventionsOfWar,
    ];
}
exports.publicizeWeaponSchematics = {
    name: 'Publicize Weapon Schematics',
    description: 'All war suns lose SUSTAIN DAMAGE.',
    type: 'agenda',
    place: enums_1.Place.space,
    symmetrical: true,
    transformUnit: (u) => {
        if (u.type === unit_1.UnitType.warsun) {
            return Object.assign(Object.assign({}, u), { sustainDamage: false });
        }
        else {
            return u;
        }
    },
};
exports.prophecyOfIxth = {
    name: 'Prophecy of Ixth',
    description: "The owner of this card applies +1 to the result of their fighter's combat rolls.",
    type: 'agenda',
    place: enums_1.Place.space,
    transformUnit: (u) => {
        if (u.type === unit_1.UnitType.fighter) {
            return (0, unit_1.getUnitWithImproved)(u, 'combat', 'hit', 'permanent');
        }
        else {
            return u;
        }
    },
};
exports.articlesOfWar = {
    name: 'Articles of War',
    description: 'All mechs lose their printed abilities except for SUSTAIN DAMAGE.',
    type: 'agenda',
    place: 'both',
    symmetrical: true,
    // TODO
};
exports.conventionsOfWar = {
    name: 'Conventions of War',
    description: 'No BOMBARDMENT.',
    type: 'agenda',
    place: enums_1.Place.ground,
    symmetrical: true,
    priority: battle_types_1.EFFECT_LOW_PRIORITY,
    transformUnit: (u) => {
        if (u.bombardment) {
            return Object.assign(Object.assign({}, u), { bombardment: undefined });
        }
        else {
            return u;
        }
    },
};
//# sourceMappingURL=agenda.js.map