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

function demo() {
  console.log("XXX DEMO");
  var fleet1 = {};
  var fleet2 = {};

  fleet1[game.UnitType.Dreadnought] = { count: 3 };
  fleet1[game.UnitType.Cruiser] = { count: 3 };
  fleet1[game.UnitType.Fighter] = { count: 3 };

  fleet2[game.UnitType.Dreadnought] = { count: 2 };
  fleet2[game.UnitType.Cruiser] = { count: 3 };
  fleet2[game.UnitType.Fighter] = { count: 5 };

  var input = {
    attackerUnits: fleet1,
    defenderUnits: fleet2,
    battleType: game.BattleType.Space,
    options: {
      attacker: { race: game.Race.Arborec },
      defender: { race: game.Race.Arborec, duraniumArmor: true },
    },
  };
  im.imitationIterations = 100000; // fewer has minimal effect on simulation time
  var start = new Date();
  var expected = im.estimateProbabilities(input).distribution;
  console.log("passed", new Date() - start);
  console.log(expected.toString());
}

class Calc {
  static getInstance() {
    if (!Calc.__instance) {
      Calc.__instance = new Calc();
    }
    return Calc.__instance;
  }

  constructor() {
    const elementId = "calc";
    this._div = document.getElementById(elementId);
    if (!this._div) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    this._currentKey = undefined;

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    // Get player data.
    const colorNameToPlayerData = {};
    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      colorNameToPlayerData[colorName] = playerData;
    }

    const activePlayerColorName =
      GameDataUtil.parseCurrentTurnColorName(gameData);
    let playerData = colorNameToPlayerData[activePlayerColorName];
    if (!playerData) {
      console.log("calc: missing active player");
      return;
    }

    // Get active system hex summary.
    let tileHexSummary = undefined;
    const activeSystem = GameDataUtil.parseActiveSystem(gameData);
    const hexSummary = GameDataUtil.parseHexSummary(gameData);
    for (const candidate of hexSummary) {
      if (candidate.tile === activeSystem.tile) {
        tileHexSummary = candidate;
        break;
      }
    }
    if (!tileHexSummary) {
      console.log("calc: missing tile hex summary");
      return;
    }

    // Modifiers.
    const modifiers = GameDataUtil.parsePlayerUnitModifiers(playerData);
    const upgrades = GameDataUtil.parsePlayerUnitUpgrades(playerData);

    // This is somewhat expensive, only update if something changed.
    const key = JSON.stringify({
      activePlayerColorName,
      tileHexSummary,
      modifiers,
      upgrades,
    });
    if (this._currentKey === key) {
      return;
    }
    this._currentKey = key;

    // Simulate!
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
    tileHexSummary.regions.forEach((region, index) => {
      const regionName =
        index === 0 ? "SPACE" : activeSystem.planets[index - 1];
      console.log(`XXX CALC "${regionName}"`);

      let peerColorName = undefined;
      const fleet1 = {};
      const fleet2 = {};

      for (const [colorName, unitNameToCount] of Object.entries(
        region.colorToUnitNameToCount
      )) {
        if (colorName !== activePlayerColorName) {
          peerColorName = colorName;
        }
        const fleet = colorName === activePlayerColorName ? fleet1 : fleet2;
        for (const [unitName, count] of Object.entries(unitNameToCount)) {
          const calcName = unitToCalc[unitName];
          if (!calcName) {
            continue;
          }
          fleet[calcName] = { count };
        }
      }
      console.log(
        `calc fleets: ${JSON.stringify(fleet1)} vs ${JSON.stringify(fleet2)}`
      );

      const peerPlayerData = colorNameToPlayerData[peerColorName];
      if (!peerPlayerData) {
        console.log("calc: no player data for peer");
        return;
      }
      const faction1 =
        factionToCalc[GameDataUtil.parsePlayerFaction(playerData)];
      const faction2 =
        factionToCalc[GameDataUtil.parsePlayerFaction(peerPlayerData)];
      if (!faction1 || !faction2) {
        console.log("calc: missing faction");
        return;
      }

      const input = {
        attackerUnits: fleet1,
        defenderUnits: fleet2,
        battleType:
          index === 0 ? game.BattleType.Space : game.BattleType.Ground,
        options: {
          attacker: { race: faction1 },
          defender: { race: faction2 },
        },
      };
      im.imitationIterations = 100000; // fewer has minimal effect on simulation time
      var start = new Date();
      var expected = im.estimateProbabilities(input).distribution;
      console.log("Calc", new Date() - start);
      console.log(expected.toString());
    });
  }
}

window.addEventListener("load", () => {
  Calc.getInstance();

  demo();
});
