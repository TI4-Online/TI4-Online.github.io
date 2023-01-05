"use strict";

import "/overlay/scripts/ti4calc/game-elements.js";
import "/overlay/scripts/ti4calc/imitator.js";
import "/overlay/scripts/ti4calc/calculator.js";
import "/overlay/scripts/ti4calc/structs.js";

//var calc = require("./calculator").calculator;
//var im = require("./imitator").imitator;
//var structs = require("./structs");
//var game = require("./game-elements");

const calc = window.calculator;
const im = window.imitator;
const structs = window;
const game = window;

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
    if (!activePlayerData) {
      console.log("calc: missing active player");
      return;
    }

    // Get active system hex summary.
    const activeSystem = GameDataUtil.parseActiveSystem(gameData);
    const hexSummary = GameDataUtil.parseHexSummary(gameData);
    const tileHexSummary = hexSummary.filter((entry) => {
      return entry.tile === activeSystem.tile;
    })[0];
    if (!tileHexSummary) {
      console.log("calc: missing tile hex summary");
      return;
    }

    // Draw map.
    const { tileWidth, tileHeight, canvasWidth, canvasHeight } =
      this._mapUtil.getSizes();

    const x = Math.floor((canvasWidth - tileWidth) / 2);
    const y = -Math.floor((canvasHeight - tileHeight) / 2);
    this._mapUtil.clear();
    this._mapUtil.drawTile(x, y, tileHexSummary);
    tileHexSummary.regions.forEach((region, regionIndex) => {
      this._mapUtil.drawOccupants(x, y, tileHexSummary, regionIndex);
    });

    // Simulate!
    for (let regionIndex = 0; regionIndex < 4; regionIndex++) {
      const region = tileHexSummary.regions[regionIndex] || {};
      const regionName =
        regionIndex === 0
          ? "SPACE"
          : activeSystem.planets[regionIndex - 1] || "-";

      const input = {
        attackerUnits: {},
        defenderUnits: {},
        battleType:
          regionIndex === 0 ? game.BattleType.Space : game.BattleType.Ground,
        options: {
          attacker: {},
          defender: {},
        },
      };

      const peerColorName = this._getPeerColor(region, activePlayerColorName);
      const peerPlayerData = colorNameToPlayerData[peerColorName];
      if (!peerPlayerData) {
        continue;
      }

      this._fillCalcFaction(input.options.attacker, activePlayerData);
      this._fillCalcFaction(input.options.defender, peerPlayerData);
      this._fillCalcFleet(input.attackerUnits, region, activePlayerColorName);
      this._fillCalcFleet(input.defenderUnits, region, peerColorName);
      this._fillCalcUnitUpgrades(input.attackerUnits, activePlayerData);
      this._fillCalcUnitUpgrades(input.defenderUnits, peerPlayerData);
      this._fillCalcModifiers(input.options.attacker, activePlayerData);
      this._fillCalcModifiers(input.options.defender, peerPlayerData);

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
      JSON.stringify(input, (key, value) => (allKeys.add(key), value));
      const simulationKey = JSON.stringify(input, Array.from(allKeys).sort());

      // Only update result if something changed.
      if (simulation.key !== simulationKey) {
        simulation.key = simulationKey;

        im.imitationIterations = 100000; // fewer has minimal effect on simulation time
        var start = Date.now();
        var expected = im.estimateProbabilities(input).distribution;
        simulation.distribution = expected.toString();
        simulation.attacker = expected.downTo(-1) * 100;
        simulation.attacker = Number(simulation.attacker.toPrecision(1));
        simulation.defender = expected.downTo(1) * 100;
        simulation.defender = Number(simulation.defender.toPrecision(1));
        simulation.draw = 100 - (simulation.attacker + simulation.defender);
        simulation.msecs = Date.now() - start;

        //console.log(JSON.stringify(simulation));
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

      defenderDiv.style.backgroundColor =
        GameDataUtil.colorNameToHex(peerColorName);
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

  _fillCalcFaction(options, playerData) {
    const factionToCalc = {
      arborec: game.Race.Arborec,
      creuss: game.Race.Creuss,
      hacan: game.Race.Hacan,
      jolnar: game.Race.JolNar,
      l1z1x: game.Race.L1Z1X,
      letnev: game.Race.Letnev,
      mentak: game.Race.Mentak,
      muaat: game.Race.Muaat,
      naalu: game.Race.Naalu,
      saar: game.Race.Saar,
      norr: game.Race.Sardakk,
      sol: game.Race.Sol,
      nekro: game.Race.Virus,
      winnu: game.Race.Winnu,
      xxcha: game.Race.Xxcha,
      yin: game.Race.Yin,
      yssaril: game.Race.Yssaril,
      argent: game.Race.Argent,
      vuilraith: game.Race.Cabal,
      empyrean: game.Race.Empyrean,
      mahact: game.Race.Mahact,
      naazrokha: game.Race.NaazRokha,
      nomad: game.Race.Nomad,
      ul: game.Race.Titans,
      keleres: game.Race.Keleres,
    };
    const faction = GameDataUtil.parsePlayerFaction(playerData);
    const calcFaction = factionToCalc[faction];
    if (!calcFaction) {
      console.log(`Calc._fillCalcFaction: unknown "${faction}"`);
      options.race = game.Race.Arborec;
      return false;
    }
    options.race = calcFaction;
    return true;
  }

  _fillCalcFleet(fleet, region, colorName) {
    const unitToCalc = {
      flagship: game.UnitType.Flagship,
      war_sun: game.UnitType.WarSun,
      dreadnought: game.UnitType.Dreadnought,
      carrier: game.UnitType.Carrier,
      cruiser: game.UnitType.Cruiser,
      destroyer: game.UnitType.Destroyer,
      fighter: game.UnitType.Fighter,
      pds: game.UnitType.PDS,
      mech: game.UnitType.Mech,
      infantry: game.UnitType.Infantry,
    };
    for (const [unitColorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount
    )) {
      if (unitColorName !== colorName) {
        continue;
      }
      for (const [unitName, count] of Object.entries(unitNameToCount)) {
        const calcName = unitToCalc[unitName];
        if (!calcName) {
          continue;
        }
        fleet[calcName] = { count };
      }
    }
  }

  _fillCalcUnitUpgrades(fleet, playerData) {
    const unitUpgrades = GameDataUtil.parsePlayerUnitUpgrades(playerData);

    const unitToCalc = {
      flagship: game.UnitType.Flagship,
      war_sun: game.UnitType.WarSun,
      dreadnought: game.UnitType.Dreadnought,
      carrier: game.UnitType.Carrier,
      cruiser: game.UnitType.Cruiser,
      destroyer: game.UnitType.Destroyer,
      fighter: game.UnitType.Fighter,
      pds: game.UnitType.PDS,
      mech: game.UnitType.Mech,
      infantry: game.UnitType.Infantry,
    };
    for (const unitName of unitUpgrades) {
      const calcName = unitToCalc[unitName];
      const entry = fleet[calcName];
      if (entry) {
        entry.upgraded = true;
      }
    }
  }

  _fillCalcModifiers(options, playerData) {
    const modifiers = GameDataUtil.parsePlayerUnitModifiers(playerData);

    const modifierToCalc = {
      antimass_deflectors: "antimassDeflectors",
      plasma_scoring: "plasmaScoring",
    };

    for (const modifier of modifiers) {
      const calc = modifierToCalc[modifier.localeName];
      if (calc) {
        options[calc] = true;
      }
    }

    const techToCalc = {
      "Antimass Deflectors": "antimassDeflectors",
    };

    const technologies = GameDataUtil.parsePlayerTechnologies(playerData);
    for (const tech of technologies) {
      const calc = techToCalc[tech.name];
      if (calc) {
        options[calc] = true;
      }
    }
  }
}

window.addEventListener("load", () => {
  Calc.getInstance();
});

const TEST = false;
if (TEST) {
  const factions = Object.values(game.Race);
  const unitTypes = Object.values(game.UnitType);
  const battleTypes = Object.values(game.BattleType);
  const noUpgrade = new Set([game.UnitType.Flagship, game.UnitType.WarSun]);
  for (const faction of factions) {
    for (const upgraded of [false, true]) {
      for (const battleType of battleTypes) {
        console.log(
          `testing ${factionA} vs ${factionB}: upgraded ${upgraded}, battleType ${battleType}`
        );

        const input = {
          attackerUnits: {},
          defenderUnits: {},
          battleType: undefined,
          options: {
            attacker: {},
            defender: {},
          },
        };

        input.battleType = battleType;
        input.options.attacker.race = faction;
        input.options.defender.race = faction;
        for (const unitType of unitTypes) {
          input.attackerUnits[unitType] = {
            count: 2,
            upgraded: noUpgrade.has(unitType) ? false : upgraded,
          };
          input.defenderUnits[unitType] = {
            count: 2,
            upgraded: noUpgrade.has(unitType) ? false : upgraded,
          };
        }

        im.imitationIterations = 1000; // fewer has minimal effect on simulation time
        var start = Date.now();
        var expected = im.estimateProbabilities(input).distribution;
        const msecs = Date.now() - start;
        console.log(`${expected.toString()} MSECS ${msecs}`);
      }
    }
  }
}
