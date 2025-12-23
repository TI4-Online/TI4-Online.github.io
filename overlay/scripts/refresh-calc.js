"use strict";

const { Faction } = require("./ti4calc2/core/enums");
const { Place } = require("./ti4calc2/core/enums");
const { UnitType } = require("./ti4calc2/core/unit");

class Calc {
  static getInstance() {
    if (!Calc.__instance) {
      Calc.__instance = new Calc();
    }
    return Calc.__instance;
  }

  constructor() {
    let elementId = "calc";
    this._div = document.getElementById(elementId);
    if (!this._div) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    elementId = "calc-map";
    const mapCanvas = document.getElementById(elementId);
    if (!mapCanvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    const w = Math.floor(mapCanvas.parentNode.offsetWidth * 1.45); // x2 MSAA
    this._mapUtil = new MapUtil(mapCanvas, w);

    // Cache per-tile results.
    this._tileToRegionToSimulation = {};

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    // Reset.
    let regionNameTDs = document.getElementsByClassName("calc-region");
    regionNameTDs = [...regionNameTDs];
    regionNameTDs.forEach((td) => (td.innerText = "-"));

    let regionResultTDs = document.getElementsByClassName("calc-result");
    regionResultTDs = [...regionResultTDs];
    const regionResultEntries = regionResultTDs.map((td) => {
      const attackerDiv = td.getElementsByClassName("calc-attacker")[0];
      const attackerValue = td.getElementsByClassName("value-attacker")[0];
      const defenderDiv = td.getElementsByClassName("calc-defender")[0];
      const defenderValue = td.getElementsByClassName("value-defender")[0];

      td.style.backgroundColor = "unset";

      attackerDiv.style.backgroundColor = "unset";
      attackerDiv.style.width = "0px";
      attackerValue.innerText = "";

      defenderDiv.style.backgroundColor = "unset";
      defenderDiv.style.width = "0px";
      defenderValue.innerText = "";

      return {
        td,
        w: td.offsetWidth - 4,
        attackerDiv,
        attackerValue,
        defenderDiv,
        defenderValue,
      };
    });

    // Get player data.
    const colorNameToPlayerData = {};
    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      colorNameToPlayerData[colorName] = playerData;
    }

    const activePlayerColorName =
      GameDataUtil.parseCurrentTurnColorName(gameData);
    const activePlayerData = colorNameToPlayerData[activePlayerColorName];

    // Get active system hex summary.
    const activeSystem = GameDataUtil.parseActiveSystem(gameData);
    if (!activeSystem) {
      return;
    }
    const hexSummary = GameDataUtil.parseHexSummary(gameData);
    let tileHexSummary = hexSummary.filter((entry) => {
      return entry.tile === activeSystem.tile;
    })[0];
    if (!tileHexSummary) {
      tileHexSummary = { tile: 0, regions: [] };
    }

    const { tileWidth, tileHeight, canvasWidth, canvasHeight } =
      this._mapUtil.getSizes();
    const x = Math.floor((canvasWidth - tileWidth) / 2);
    const y = -Math.floor((canvasHeight - tileHeight) / 2);

    // Draw map.
    this._mapUtil.clear();
    this._mapUtil.drawTile(x, y, tileHexSummary);
    tileHexSummary.regions.forEach((region, regionIndex) => {
      this._mapUtil.drawOccupants(x, y, tileHexSummary, regionIndex);
    });

    // Abort if no active player or zero tile.
    if (!activePlayerData || tileHexSummary.tile <= 0) {
      return;
    }

    // Simulate!
    for (let regionIndex = 0; regionIndex < 4; regionIndex++) {
      const region = tileHexSummary.regions[regionIndex] || {};
      const regionName =
        regionIndex === 0
          ? "SPACE"
          : activeSystem.planets[regionIndex - 1] || "-";

      if (regionIndex > activeSystem.planets.length) {
        break;
      }

      const battle = {
        place: regionIndex === 0 ? Place.space : Place.ground,
        attacker: {},
        defender: {},
      };

      const peerColorName = this._getPeerColor(region, activePlayerColorName);
      const peerPlayerData = colorNameToPlayerData[peerColorName];

      // Continue with simulation even if only one player present.
      //if (!peerPlayerData) {
      //  continue;
      //}

      this._fillCalcFaction(battle.attacker, activePlayerData);
      this._fillCalcFleet(battle.attacker, region, activePlayerColorName);
      this._fillCalcUnitUpgrades(battle.attacker, activePlayerData);
      this._fillCalcModifiers(battle.attacker, gameData, activePlayerData);

      if (peerPlayerData) {
        this._fillCalcFaction(battle.defender, peerPlayerData);
        this._fillCalcFleet(battle.defender, region, peerColorName);
        this._fillCalcUnitUpgrades(battle.defender, peerPlayerData);
        this._fillCalcModifiers(battle.defender, gameData, peerPlayerData);
      }

      let regionToSimulation =
        this._tileToRegionToSimulation[tileHexSummary.tile];
      if (!regionToSimulation) {
        regionToSimulation = {};
        this._tileToRegionToSimulation[tileHexSummary.tile] =
          regionToSimulation;
      }
      let simulation = regionToSimulation[regionIndex];
      if (!simulation) {
        simulation = {};
        regionToSimulation[regionIndex] = simulation;
      }

      // Deterministic stringify (sort keys).
      const allKeys = new Set();
      JSON.stringify(battle, (key, value) => (allKeys.add(key), value));
      const simulationKey = JSON.stringify(battle, Array.from(allKeys).sort());

      // Only update result if something changed.
      if (simulation.key !== simulationKey) {
        simulation.key = simulationKey;

        const start = Date.now();

        simulation.attacker = 0;
        simulation.defender = 0;
        simulation.draw = 0;
        const numSimulations = 2000;
        for (let i = 0; i < numSimulations; i++) {
          const battleInstance = setupBattle(battle);
          const battleResult = doBattle(battleInstance);
          if (battleResult.winner === "attacker") {
            simulation.attacker += 1;
          } else if (battleResult.winner === "defender") {
            simulation.defender += 1;
          } else {
            simulation.draw += 1;
          }
        }
        simulation.attacker = Math.round(
          (simulation.attacker * 1000) / numSimulations / 10
        );
        simulation.defender = Math.round(
          (simulation.defender * 1000) / numSimulations / 10
        );
        simulation.draw = 100 - (simulation.attacker + simulation.defender);

        simulation.msecs = Date.now() - start;

        if (
          !peerColorName ||
          !battle.defender.units ||
          Object.entries(battle.defender.units).length === 0
        ) {
          simulation.attacker = 100;
          simulation.defender = 0;
          simulation.draw = 0;
        }

        //console.log(regionName + ": " + JSON.stringify(simulation));
      }

      regionNameTDs[regionIndex].innerText = regionName.toUpperCase();

      const { td, w, attackerDiv, attackerValue, defenderDiv, defenderValue } =
        regionResultEntries[regionIndex];

      td.style.backgroundColor = "#aaa";

      attackerDiv.style.backgroundColor = GameDataUtil.colorNameToHex(
        activePlayerColorName
      );
      attackerDiv.style.width = `${Math.floor(
        (w * simulation.attacker) / 100
      )}px`;
      attackerValue.innerText = `${simulation.attacker}%`;

      defenderDiv.style.backgroundColor = peerColorName
        ? GameDataUtil.colorNameToHex(peerColorName)
        : "black";
      defenderDiv.style.width = `${Math.floor(
        (w * simulation.defender) / 100
      )}px`;
      defenderValue.innerText = `${simulation.defender}%`;
    }
  }

  _getPeerColor(region, activePlayerColorName) {
    for (const [unitColorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount || {}
    )) {
      if (unitColorName !== activePlayerColorName) {
        return unitColorName;
      }
    }
  }

  _fillCalcFaction(participant, playerData) {
    const factionToCalc = {
      arborec: Faction.arborec,
      creuss: Faction.creuss,
      hacan: Faction.hacan,
      jolnar: Faction.jol_nar,
      l1z1x: Faction.l1z1x,
      letnev: Faction.barony_of_letnev,
      mentak: Faction.mentak,
      muaat: Faction.muaat,
      naalu: Faction.naalu,
      saar: Faction.clan_of_saar,
      norr: Faction.sardakk_norr,
      sol: Faction.sol,
      nekro: Faction.nekro,
      winnu: Faction.winnu,
      xxcha: Faction.xxcha,
      yin: Faction.yin,
      yssaril: Faction.yssaril,
      // pok
      argent: Faction.argent_flight,
      vuilraith: Faction.vuil_raith,
      empyrean: Faction.empyrean,
      mahact: Faction.mahact,
      naazrokha: Faction.naaz_rokha,
      nomad: Faction.nomad,
      ul: Faction.titans_of_ul,
      // codex 3
      keleres: Faction.keleres,
      // thunders edge
      //bastion: Faction.bastion,
      deepwrought: Faction.deepwrought,
      //firmament: Faction.firmament,
      //obsidian: Faction.obsidian,
      //ralnel: Faction.ralnel,
      rebellion: Faction.crimson_rebellion,
    };
    const faction = GameDataUtil.parsePlayerFaction(playerData);
    const calcFaction = factionToCalc[faction];
    if (!calcFaction) {
      console.log(`Calc._fillCalcFaction: unknown "${faction}"`);
      participant.faction = Faction.arborec;
      return false;
    }
    participant.faction = calcFaction;
    return true;
  }

  _fillCalcFleet(participant, region, colorName) {
    if (!participant.units) {
      participant.units = {};
    }
    const unitToCalc = {
      flagship: UnitType.Flagship,
      war_sun: UnitType.WarSun,
      dreadnought: UnitType.Dreadnought,
      carrier: UnitType.Carrier,
      cruiser: UnitType.Cruiser,
      destroyer: UnitType.Destroyer,
      fighter: UnitType.Fighter,
      pds: UnitType.PDS,
      mech: UnitType.Mech,
      infantry: UnitType.Infantry,
      space_dock: "SpaceDock", // not official, but add for knowing a unit is there
    };
    for (const [unitColorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount || {}
    )) {
      if (unitColorName !== colorName) {
        continue;
      }
      for (const [unitName, count] of Object.entries(unitNameToCount)) {
        const calcName = unitToCalc[unitName];
        if (!calcName) {
          continue;
        }
        participant.units[calcName] = { count };
      }
    }
  }

  _fillCalcUnitUpgrades(participant, playerData) {
    if (!participant.unitUpgrades) {
      participant.unitUpgrades = {};
    }
    const unitUpgrades = GameDataUtil.parsePlayerUnitUpgrades(playerData);

    const unitToCalc = {
      flagship: UnitType.Flagship,
      war_sun: UnitType.WarSun,
      dreadnought: UnitType.Dreadnought,
      carrier: UnitType.Carrier,
      cruiser: UnitType.Cruiser,
      destroyer: UnitType.Destroyer,
      fighter: UnitType.Fighter,
      pds: UnitType.PDS,
      mech: UnitType.Mech,
      infantry: UnitType.Infantry,
    };
    for (const unitName of unitUpgrades) {
      const calcName = unitToCalc[unitName];
      if (!calcName) {
        continue;
      }
      participant.unitUpgrades[calcName] = true;
    }
  }

  _fillCalcModifiers(participant, gameData, playerData) {
    if (!participant.battleEffects) {
      participant.battleEffects = {};
    }
    const modifierToCalc = {
      antimass_deflectors: "antimassDeflectors",
      plasma_scoring: "plasmaScoring",
    };
    const modifiers = GameDataUtil.parsePlayerUnitModifiers(playerData);
    for (const modifier of modifiers) {
      const calc = modifierToCalc[modifier.localeName];
      if (calc) {
        participant.battleEffects[calc] = 1;
      }
    }

    const techToCalc = {
      "Antimass Deflectors": "antimassDeflectors",
      "Assault Cannon": "assaultCannon",
      "Duranium Armor": "duraniumArmor",
      "Graviton Laser System": "gravitonLaser",
      "Plasma Scoring": "plasmaScoring",
      "X-89 Bacterial Weapon": "x89Omega", // game data does not track omega for tech, assume omega
      "Non-Euclidean Shielding": "nonEuclidean",
      "L4 Disruptors": "l4Disruptors",
      "Valkyrie Particle Weave": "valkyrieParticleWeave",
    };
    const technologies = GameDataUtil.parsePlayerTechnologies(playerData);
    for (const tech of technologies) {
      const calc = techToCalc[tech.name];
      if (calc) {
        participant.battleEffects[calc] = 1;
      }
    }

    const agendaToCalc = {
      "Articles of War": "articlesOfWar",
      "Prophecy of Ixth": "prophecyOfIxth",
      "Publicize Weapon Schematics": "publicizeSchematics",
    };
    const mustOwn = ["Prophecy of Ixth"];
    const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
    const agendaNamesAndPlayerColorNames = GameDataUtil.parseLaws(gameData);
    for (const [name, colorNames] of Object.entries(
      agendaNamesAndPlayerColorNames
    )) {
      const calc = agendaToCalc[name];
      if (calc) {
        if (mustOwn.includes(name) && !colorNames.includes(colorName)) {
          continue;
        }
        participant.battleEffects[calc] = 1;
      }
    }
  }
}

window.addEventListener("load", () => {
  Calc.getInstance().update({});
  setTimeout(() => {
    Calc.getInstance().update({});
  }, 500);
});
