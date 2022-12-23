"use strict";

const COLOR_NAME_TO_HEX = {
  white: "#FFFFFF",
  blue: "#6EC1E4",
  purple: "#9161a8",
  yellow: "#ffde17",
  red: "#e46d72",
  green: "#00a14b",
  orange: "#FF781F",
  pink: "#FF69B4",
};
const UNKNOWN_COLOR_NAME = "-";
const UNKNOWN_COLOR_HEX = "#ffffff";

const FACTION_WHITELIST = new Set([
  "arborec",
  "argent",
  "bobert",
  "creuss",
  "empyrean",
  "hacan",
  "jolnar",
  "keleres",
  "l1z1x",
  "letnev",
  "mahact",
  "mentak",
  "muaat",
  "naalu",
  "naazrokha",
  "nekro",
  "nomad",
  "norr",
  "saar",
  "sol",
  "ul",
  "vuilraith",
  "winnu",
  "xxcha",
  "yin",
  "yssaril",
]);
const UNKNOWN_FACTION = "bobert";

const OBJECTIVE_NAME_ABBREVIATIONS = {
  // Public
  "Diversify Research": "2 TECH 2 COLORS",
  "Develop Weaponry": "2 UNIT UPGRADES",
  "Sway the Council": "8 INFLUENCE",
  "Erect a Monument": "8 RESOURCES",
  "Negotiate Trade Routes": "5 TRADE GOODS",
  "Lead From the Front": "3 COMMAND TOKENS",
  "Intimidate Council": "2 SYS ADJ TO MR",
  "Corner the Market": "4 PLANET SAME TRAIT",
  "Found Research Outposts": "3 TECH SPECIALTY",
  "Expand Borders": "6 NON-HOME PLANET",
  "Amass Wealth": "3 INF 3 RES 3 TG",
  "Build Defenses": "4 STRUCTURES",
  "Discover Lost Outposts": "2 ATTACHMENTS",
  "Engineer a Marvel": "FLAG/WAR SUN",
  "Explore Deep Space": "3 EMPTY SYS",
  "Improve Infrastructure": "3 STRUCT NOT HOME",
  "Make History": "2 LGND/MR/ANOM",
  "Populate the Outer Rim": "3 EDGE SYS",
  "Push Boundaries": "> 2 NGHBRS",
  "Raise a Fleet": "5 NON-FGTR SHIPS",
  "Master the Sciences": "2 TECH 4 COLORS",
  "Revolutionize Warfare": "3 UNIT UPGRADES",
  "Manipulate Galactic Law": "16 INFLUENCE",
  "Found a Golden Age": "16 RESOURCES",
  "Centralize Galactic Trade": "10 TRADE GOODS",
  "Galvanize the People": "6 COMMAND TOKENS",
  "Conquer the Weak": "1 OPPONENT HOME",
  "Unify the Colonies": "6 PLANET SAME TRAIT",
  "Form Galactic Brain Trust": "5 TECH SPECIALTY",
  "Subdue the Galaxy": "11 NON-HOME PLANET",
  "Achieve Supremacy": "FLAG/WS ON MR/HS",
  "Become a Legend": "4 LGND/MR/ANOM",
  "Command an Armada": "8 NON-FGTR SHIPS",
  "Construct Massive Cities": "7 STRUCTURES",
  "Control the Borderlands": "5 EDGE SYS",
  "Hold Vast Reserves": "6 INF 6 RES 6 TG",
  "Patrol Vast Territories": "5 EMPTY SYS",
  "Protect the Border": "5 STRUCT NOT HOME",
  "Reclaim Ancient Monuments": "3 ATTACHMENTS",
  "Rule Distant Lands": "2 IN/ADJ OTHER HS",

  // Secrets
  "Become the Gatekeeper": "ALPHA AND BETA",
  "Mine Rare Minerals": "4 HAZARDOUS",
  "Forge an Alliance": "4 CULTURAL",
  "Monopolize Production": "4 INDUSTRIAL",
  "Cut Supply Lines": "BLOCKADE SD",
  "Occupy the Seat of the Empire": "MR W/ 3 SHIPS",
  "Learn the Secrets of the Cosmos": "3 ADJ TO ANOMALY",
  "Control the Region": "6 SYSTEMS",
  "Threaten Enemies": "SYS ADJ TO HOME",
  "Adapt New Strategies": "2 FACTION TECH",
  "Master the Laws of Physics": "4 TECH 1 COLOR",
  "Gather a Mighty Fleet": "5 DREADNOUGHTS",
  "Form a Spy Network": "5 ACTION CARDS",
  "Fuel the War Machine": "3 SPACE DOCKS",
  "Establish a Perimeter": "4 PDS",
  "Make an Example of Their World": "BOMBARD LAST GF",
  "Turn Their Fleets to Dust": "SPC LAST SHIP",
  "Destroy Their Greatest Ship": "DESTORY WS/FLAG",
  "Unveil Flagship": "WIN W/ FLAGSHIP",
  "Spark a Rebellion": "WIN VS LEADER",
  "Become a Martyr": "LOSE IN HOME",
  "Betray a Friend": "WIN VS PROM NOTE",
  "Brave the Void": "WIN IN ANOMALY",
  "Darken the Skies": "WIN IN HOME",
  "Defy Space and Time": "WORMHOLE NEXUS",
  "Demonstrate Your Power": "3 SHIPS SURVIVE",
  "Destroy Heretical Works": "PURGE 2 FRAGMENTS",
  "Dictate Policy": "3 LAWS IN PLAY",
  "Drive the Debate": "ELECTED AGENDA",
  "Establish Hegemony": "12 INFLUENCE",
  "Fight with Precision": "AFB LAST FIGHTER",
  "Foster Cohesion": "NEIGHBOR W / ALL",
  "Hoard Raw Materials": "12 RESOURCES",
  "Mechanize the Military": "4 PLANETS W/ MECH",
  "Occupy the Fringe": "9 GROUND FORCES",
  "Produce en Masse": "8 PROD VALUE",
  "Prove Endurance": "PASS LAST",
  "Seize an Icon": "LEGENDARY PLANET",
  "Stake Your Claim": "SHARE SYSTEM",
  "Strengthen Bonds": "PROM NOTE",
};

const TECHNOLOGY_COLOR = {
  "AI Development Algorithm": "red",
  "Advanced Carrier II": "white",
  "Aerie Hololattice": "yellow",
  Aetherstream: "blue",
  "Antimass Deflectors": "blue",
  "Assault Cannon": "red",
  "Bio-Stims": "green",
  Bioplasmosis: "green",
  "Carrier II": "white",
  "Chaos Mapping": "blue",
  "Crimson Legionnaire II": "white",
  "Cruiser II": "white",
  "Dacxive Animators": "green",
  "Dark Energy Tap": "blue",
  "Destroyer II": "white",
  "Dimensional Splicer": "red",
  "Dimensional Tear II": "white",
  "Dreadnought II": "white",
  "Duranium Armor": "red",
  "E-res Siphons": "yellow",
  "Exotrireme II": "white",
  "Fighter II": "white",
  "Fleet Logistics": "blue",
  "Floating Factory II": "white",
  "Genetic Recombination": "green",
  "Graviton Laser System": "yellow",
  "Gravity Drive": "blue",
  "Hegemonic Trade Policy": "yellow",
  "Hel-Titan II": "white",
  "Hybrid Crystal Fighter II": "white",
  "Hyper Metabolism": "green",
  "Impulse Core": "yellow",
  "Infantry II": "white",
  "Inheritance Systems": "yellow",
  "Instinct Training": "green",
  "Integrated Economy": "yellow",
  "L4 Disruptors": "yellow",
  "Lazax Gate Folding": "blue",
  "Letani Warrior II": "white",
  "Light-Wave Deflector": "blue",
  "Magen Defense Grid": "red",
  "Mageon Implants": "green",
  "Magmus Reactor": "red",
  "Memoria II": "white",
  "Mirror Computing": "yellow",
  "Neural Motivator": "green",
  Neuroglaive: "green",
  "Non-Euclidean Shielding": "red",
  "Nullification Field": "yellow",
  "PDS II": "white",
  "Plasma Scoring": "red",
  "Pre-Fab Arcologies": "green",
  "Predictive Intelligence": "yellow",
  "Production Biomes": "green",
  "Prototype War Sun II": "white",
  Psychoarchaeology: "green",
  "Quantum Datahub Node": "yellow",
  "Salvage Operations": "yellow",
  "Sarween Tools": "yellow",
  "Saturn Engine II": "white",
  "Scanlink Drone Network": "yellow",
  "Self Assembly Routines": "red",
  "Sling Relay": "blue",
  "Space Dock II": "white",
  "Spacial Conduit Cylinder": "blue",
  "Spec Ops II": "white",
  "Strike Wing Alpha II": "white",
  "Super-Dreadnought II": "white",
  Supercharge: "red",
  "Temporal Command Suite": "yellow",
  "Transit Diodes": "yellow",
  "Transparasteel Plating": "green",
  "Valefar Assimilator X": "white",
  "Valefar Assimilator Y": "white",
  "Valkyrie Particle Weave": "red",
  Voidwatch: "green",
  Vortex: "red",
  "Wormhole Generator": "blue",
  "X-89 Bacterial Weapon": "green",
  "Yin Spinner": "green",
  "War Sun": "white",
};

/**
 * This class parses data from the game-provided json.  It validates against
 * whitelists when possible, and escapes strings when not (e.g. player name).
 */
class GameDataUtil {
  /**
   * Escape any characters for a "in-HTML friendly" string.
   *
   * @param {string} string
   * @returns {string}
   */
  static _escapeForHTML(string) {
    console.assert(typeof string === "string");
    if (!GameDataUtil.__escapeDiv) {
      GameDataUtil.__escapeDiv = document.createElement("div");
    }
    GameDataUtil.__escapeDiv.innerText = string;
    return GameDataUtil.__escapeDiv.innerHTML;
  }

  /**
   * Parse current turn color name from overall game data.
   *
   * @param {Object.{turn:string}} gameData
   * @returns {string}
   */
  static parseCurrentTurnColorName(gameData) {
    console.assert(typeof gameData === "object");

    const currentTurn = gameData?.turn?.toLowerCase() || "none";
    console.assert(typeof currentTurn === "string");

    return COLOR_NAME_TO_HEX[currentTurn] ? currentTurn : UNKNOWN_COLOR_NAME;
  }

  /**
   * Parse encoded hex summary.  Never used directly no need to escape.
   *
   * @param {Object.{hexSummary:string}} gameData
   * @returns {string}
   */
  static parseHexSummary(gameData) {
    console.assert(typeof gameData === "object");

    const hexSummary = gameData?.hexSummary || "";
    return hexSummary;
  }

  /**
   * Parse laws.
   *
   * @param {Object} gameData
   * @returns {Array.{{name:string,colors:Array.{string}}}
   */
  static parseLaws(gameData) {
    console.assert(typeof gameData === "object");

    const laws = gameData?.laws || [];

    const lawToPlayers = {};
    for (const law of laws) {
      lawToPlayers[law] = [];
    }

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
      const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
      const playerLaws = playerData?.laws || [];
      for (const playerLaw of playerLaws) {
        const entry = lawToPlayers[playerLaw];
        if (!entry) {
          continue; // law not registered at top?
        }
        entry.push({
          colorName: colorNameAndHex.colorName,
          colorHex: colorNameAndHex.colorHex,
        });
      }
    }

    return laws.map((law) => {
      const players = lawToPlayers[law] || [];
      return { name: GameDataUtil._escapeForHTML(law), players };
    });
  }

  /**
   * Parse objectives by type and who scored.
   *
   * @param {Object} gameData
   * @returns {Object} objectives
   */
  static parseObjectives(gameData) {
    console.assert(typeof gameData === "object");

    const objectives = {
      stage1: [],
      stage2: [],
      secret: [],
      custodians: [],
      sftt: [],
      other: [], // shard, etc
    };

    // Fill in the above objectives, and keep a map from name to entry.
    const nameToEntry = {};
    const addEntry = (name, addToList) => {
      console.assert(typeof name === "string");
      console.assert(Array.isArray(addToList));
      const entry = {
        name: GameDataUtil._escapeForHTML(name),
        abbr:
          OBJECTIVE_NAME_ABBREVIATIONS[name] ||
          GameDataUtil._escapeForHTML(name),
        scoredBy: [],
      };
      nameToEntry[name] = entry;
      addToList.push(entry);
      return entry;
    };
    const addEntries = (names, addToList) => {
      console.assert(Array.isArray(names));
      console.assert(Array.isArray(addToList));
      for (const name of names) {
        addEntry(name, addToList);
      }
    };

    // Group objectives into categories.  Split out support from other.
    const gameDataObjectives = gameData?.objectives || [];
    for (const [key, names] of Object.entries(gameDataObjectives)) {
      if (key === "Secret Objectives") {
        addEntries(names, objectives.secret);
      } else if (key === "Public Objectives I") {
        addEntries(names, objectives.stage1);
      } else if (key === "Public Objectives II") {
        addEntries(names, objectives.stage2);
      } else {
        for (const name of names) {
          if (name.startsWith("Support for the Throne")) {
            addEntry(name, objectives.sftt);
          } else {
            addEntry(name, objectives.other);
          }
        }
      }
    }

    // Who scored?
    const gameDataPlayers = gameData?.players || [];
    for (const playerData of gameDataPlayers) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      const playerObjectives = playerData?.objectives || [];
      for (const name of playerObjectives) {
        const entry = nameToEntry[name];
        console.assert(entry);
        entry.scoredBy.push(colorName);
      }
    }

    // Add custodians, a player can score more than once.
    const custodiansEntry = addEntry("custodians", objectives.custodians);
    for (const playerData of gameDataPlayers) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      const custodiansPoints = playerData?.custodiansPoints || 0;
      for (let i = 0; i < custodiansPoints; i++) {
        custodiansEntry.scoredBy.push(colorName);
      }
    }

    return objectives;
  }

  /**
   * Parse active (not passed).
   *
   * @param {Object.{active:boolean}} playerData
   * @returns {boolean}
   */
  static parsePlayerActive(playerData) {
    console.assert(typeof playerData === "object");

    let active = playerData?.active;
    if (active === undefined) {
      active = true;
    }
    console.assert(typeof active === "boolean");
    return active;
  }

  /**
   * Parse color as hex value.
   *
   * @param {Object.{colorActual:string}} playerData
   * @returns {Object.{colorName:string,colorHex:string}}
   */
  static parsePlayerColor(playerData) {
    console.assert(typeof playerData === "object");

    let colorName = playerData?.colorActual?.toLowerCase();
    if (!colorName) {
      colorName = playerData?.color.toLowerCase();
    }
    let colorHex = COLOR_NAME_TO_HEX[colorName];
    if (!colorHex) {
      colorName = UNKNOWN_COLOR_NAME;
      colorHex = UNKNOWN_COLOR_HEX;
    }
    return { colorName, colorHex };
  }

  /**
   * Extract the player data array, in clockwise player order from lower right.
   *
   * @param {Object.{playerData.Array.{Object}}} gameData
   * @returns {Array.{Object}}
   */
  static parsePlayerDataArray(gameData) {
    let playerDataArray = gameData?.players;

    // If called without gamedata, provide the default 6-player minimal array.
    if (!playerDataArray) {
      playerDataArray = [
        "white",
        "blue",
        "purple",
        "yellow",
        "red",
        "green",
      ].map((color) => {
        return { colorActual: color };
      });
    }

    console.assert(Array.isArray(playerDataArray));
    return playerDataArray;
  }

  /**
   * Parse faction name.
   *
   * @param {Object.{factionShort:string}} playerData
   * @returns {string}
   */
  static parsePlayerFaction(playerData) {
    console.assert(typeof playerData === "object");

    let faction = playerData?.factionShort?.toLowerCase() || "-";
    console.assert(typeof faction === "string");

    faction = faction.replace("-", ""); // naaz-rokha
    faction = faction.replace("'", ""); // vuil'raith, n'orr

    if (faction.startsWith("keleres")) {
      faction = "keleres"; // strip off flavor
    }

    return FACTION_WHITELIST.has(faction) ? faction : UNKNOWN_FACTION;
  }

  /**
   * Parse player name.
   *
   * @param {Object.{steamName:string}} playerData
   * @returns {string}
   */
  static parsePlayerName(playerData) {
    console.assert(typeof playerData === "object");

    const playerName = playerData?.steamName || "-";
    console.assert(typeof playerName === "string");

    return GameDataUtil._escapeForHTML(playerName);
  }

  /**
   * Parse player resources.
   *
   * @param {Object} playerData
   * @returns {Object}
   */
  static parsePlayerResources(playerData) {
    console.assert(typeof playerData === "object");

    return {
      influence: {
        avail: playerData?.planetTotals?.influence?.avail || 0,
        total: playerData?.planetTotals?.influence?.total || 0,
      },
      resources: {
        avail: playerData?.planetTotals?.resources?.avail || 0,
        total: playerData?.planetTotals?.resources?.total || 0,
      },
      tradegoods: playerData?.tradeGoods || 0,
      commodities: playerData?.commodities || 0,
      teckSkips: {
        blue: playerData?.planetTotals?.techs?.blue || 0,
        green: playerData?.planetTotals?.techs?.green || 0,
        red: playerData?.planetTotals?.techs?.red || 0,
        yellow: playerData?.planetTotals?.techs?.yellow || 0,
      },
      traits: {
        cultural: playerData?.planetTotals?.traits?.cultural || 0,
        hazardous: playerData?.planetTotals?.traits?.hazardous || 0,
        industrial: playerData?.planetTotals?.traits?.industrial || 0,
      },
      tokens: {
        fleet: playerData?.commandTokens?.fleet || 0,
        strategy: playerData?.commandTokens?.strategy || 0,
        tactics: playerData?.commandTokens?.tactics || 0,
      },
      alliances: (playerData?.alliances || []).map((x) =>
        GameDataUtil._escapeForHTML(x).toLowerCase()
      ),
      leaders: {
        // "locked|unlocked|purged"
        commander: GameDataUtil._escapeForHTML(
          playerData?.leaders?.commander || "purged"
        ),
        hero: GameDataUtil._escapeForHTML(
          playerData?.leaders?.hero || "purged"
        ),
      },
    };
  }

  /**
   * Parse score.
   *
   * @param {Object.{score:number}} playerData
   * @returns {number}
   */
  static parsePlayerScore(playerData) {
    console.assert(typeof playerData === "object");

    let score = playerData?.score || 0;
    console.assert(typeof score === "number");

    return score;
  }

  /**
   * Parse strategy cards with face-up/down status.
   *
   * @param {Object.{strategyCards:Array.{string},strategyCardsFaceDown:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,faceDown:boolean}}}
   */
  static parsePlayerStrategyCards(playerData) {
    console.assert(typeof playerData === "object");

    let strategyCards = playerData?.strategyCards || [];
    console.assert(Array.isArray(strategyCards));
    strategyCards = strategyCards.map((name) =>
      GameDataUtil._escapeForHTML(name)
    );

    let faceDown = playerData?.strategyCardsFaceDown || [];
    console.assert(Array.isArray(faceDown));
    faceDown = faceDown.map((name) => GameDataUtil._escapeForHTML(name));

    return strategyCards.map((name) => {
      return { name, faceDown: faceDown.includes(name) };
    });
  }

  /**
   * Parse technologies.
   *
   * @param {Object.{technologies:Array.{string}}} playerData
   * @returns {Array.{Object.{name:string,colorName:string,colorHex:string}}}
   */
  static parsePlayerTechnologies(playerData) {
    console.assert(typeof playerData === "object");

    const technologies = playerData?.technologies || [];
    return technologies.map((name) => {
      const colorName = TECHNOLOGY_COLOR[name] || "white";
      return {
        name: GameDataUtil._escapeForHTML(name),
        colorName,
        colorHex: COLOR_NAME_TO_HEX[colorName],
      };
    });
  }

  /**
   * Parse unit upgrades - returns "nsid" style unit types, e.g. "war_sun".
   *
   * @param {Object.{unitUpgrades:Array.{string}}} playerData
   * @returns {Array.{string}}
   */
  static parsePlayerUnitUpgrades(playerData) {
    console.assert(typeof playerData === "object");

    const unitUpgrades = playerData?.unitUpgrades || [];
    return unitUpgrades.map((name) => GameDataUtil._escapeForHTML(name));
  }

  /**
   * Parse game round.
   *
   * @param {Object.{round:number}} gameData
   * @returns {number}
   */
  static parseRound(gameData) {
    console.assert(typeof gameData === "object");

    const round = gameData?.round || 1;
    console.assert(typeof round === "number");

    return round;
  }

  /**
   * Parse current speaker color name from overall game data.
   *
   * @param {Object.{speaker:string}} gameData
   * @returns {string}
   */
  static parseSpeakerColorName(gameData) {
    console.assert(typeof gameData === "object");

    const speaker = gameData?.speaker?.toLowerCase() || "none";
    console.assert(typeof speaker === "string");

    return speaker;
  }

  /**
   * Parse recent whispers.
   *
   * @param {Object.{whispers:Array}} gameData
   * @returns {Array.{Object}}
   */
  static parseWhispers(gameData) {
    console.assert(typeof gameData === "object");

    const sanitizeWhisper = (s) => {
      return [...s]
        .map((c) => {
          if (c === " ") {
            return "&nbsp;";
          }
          if (c === "<") {
            return "&lt;";
          }
          if (c === ">") {
            return "&gt;";
          }
          return "";
        })
        .join("");
    };

    const whispers = gameData?.whispers || [];
    return whispers.map((entry) => {
      return {
        colorNameA: GameDataUtil._escapeForHTML(entry.colorNameA),
        colorNameB: GameDataUtil._escapeForHTML(entry.colorNameB),
        colorHexA: COLOR_NAME_TO_HEX[entry.colorNameA],
        colorHexB: COLOR_NAME_TO_HEX[entry.colorNameB],
        forwardStr: sanitizeWhisper(entry.forwardStr),
        backwardStr: sanitizeWhisper(entry.backwardStr),
      };
    });
  }
}

// Export for jest test framework.
if (typeof module !== "undefined") {
  module.exports = { GameDataUtil };
}
