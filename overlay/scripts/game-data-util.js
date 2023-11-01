"use strict";

const COLOR_NAME_TO_HEX = {
  white: "#FFFFFF",
  blue: "#00a8cc", //"#6EC1E4",
  purple: "#c147e9", //"#9161a8",
  yellow: "#ffde17",
  red: "#e94f64", //"#e46d72",
  green: "#00a14b",
  orange: "#FF781F",
  pink: "#FF69B4",
  "-": "unset",
};
// const ALT_COLOR_NAME_TO_HEX = {
//   white: "#BBBBBB",
//   blue: "#07B2FF",
//   purple: "#7400B7",
//   yellow: "#D6B700",
//   red: "#CB0000",
//   green: "#007306",
//   orange: "#F3631C",
//   pink: "#F46FCD",
// };
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

const LAW_ABBREVIATIONS = {
  "Anti-Intellectual Revolution": "Anti-Int Revolution",
  "Classified Document Leaks": "Classified Doc Leaks",
  "Committee Formation": "Committee Formation",
  "Conventions of War": "Conv's of War",
  "Core Mining": "Core Mining",
  "Demilitarized Zone": "Demil'zd Zone",
  "Enforced Travel Ban": "Enforced Travel Ban",
  "Executive Sanctions": "Exec Sanctions",
  "Fleet Regulations": "Fleet Regs",
  "Holy Planet of Ixth": "Holy Planet of Ixth",
  "Homeland Defense Act": "Homeland Def Act",
  "Imperial Arbiter": "Imperial Arbiter",
  "Minister of Commerce": "Min of Commerce",
  "Minister of Exploration": "Min of Exploration",
  "Minister of Industry": "Min of Industry",
  "Minister of Peace": "Min of Peace",
  "Minister of Policy": "Min of Policy",
  "Minister of Sciences": "Min of Sciences",
  "Minister of War": "Min of War",
  "Prophecy of Ixth": "Proph of Ixth",
  "Publicize Weapon Schematics": "Pub Weapon Schematics",
  "Regulated Conscription": "Reg Conscription",
  "Representative Government": "Rep Gov't",
  "Research Team: Biotic": "Res Team: Biotic",
  "Research Team: Cybernetic": "Res Team: Cybernetic",
  "Research Team: Propulsion": "Res Team: Propulsion",
  "Research Team: Warfare": "Res Team: Warfare",
  "Senate Sanctuary": "Senate Sanct'y",
  "Shard of the Throne": "Shard of the Throne",
  "Shared Research": "Shared Research",
  "Terraforming Initiative": "Terrafor Initiative",
  "The Crown of Emphidia": "Crown of Emphidia",
  "The Crown of Thalnos": "Crown of Thalnos",
  "Wormhole Reconstruction": "Wormhole Reconstruct",
  "Articles of War": "Articles of War",
  "Checks and Balances": "Checks and Bal's",
  "Nexus Sovereignty": "Nexus Sovereignty",
  "Political Censure": "Pol Censure",
  "Search Warrant": "Search Warrant",
};

const TECHNOLOGY_COLOR = {
  "Agency Supply Network": "yellow",
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
  "I.I.H.Q. Modernization": "yellow",
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
  static colorNameToHex(colorName) {
    console.assert(typeof colorName === "string");
    const result = COLOR_NAME_TO_HEX[colorName];
    if (!result) {
      throw new Error(`colorNameToHex: bad colorName "${colorName}"`);
    }
    return result;
  }

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

  static parseActiveSystem(gameData) {
    console.assert(typeof gameData === "object");

    const tile = gameData?.activeSystem?.tile || 0;
    const planets = gameData?.activeSystem?.planets || [];
    console.assert(typeof tile === "number");

    return {
      tile,
      planets: planets.map((s) => GameDataUtil._escapeForHTML(s)),
    };
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
   * @returns {Array}
   */
  static parseHexSummary(gameData) {
    console.assert(typeof gameData === "object");

    const hexSummary = gameData?.hexSummary || "";

    const colorCodeToColorName = {
      W: "white",
      B: "blue",
      P: "purple",
      Y: "yellow",
      R: "red",
      G: "green",
      E: "orange",
      K: "pink",
    };
    const unitCodeToUnitName = {
      c: "carrier",
      d: "dreadnought",
      f: "fighter",
      h: "flagship",
      i: "infantry",
      m: "mech",
      o: "control_token",
      p: "pds",
      r: "cruiser",
      s: "space_dock",
      t: "command_token",
      w: "war_sun",
      y: "destroyer",
    };
    const attachmentCodeToName = {
      C: "cybernetic_research_facility_face",
      I: "biotic_research_facility_face",
      O: "propulsion_research_facility_face",
      W: "warfare_research_facility_face",
      a: "alpha_wormhole",
      b: "beta_wormhole",
      c: "cybernetic_Research_Facility_back",
      d: "dyson_sphere",
      e: "frontier",
      f: "nano_forge",
      g: "gamma_wormhole",
      h: "grav_tear",
      i: "biotic_research_facility_back",
      j: "tomb_of_emphidia",
      k: "mirage",
      l: "stellar_converter",
      m: "mining_world",
      n: "ion_storm",
      o: "propulsion_research_facility_back",
      p: "paradise_world",
      q: "ul_sleeper",
      r: "rich_world",
      t: "ul_terraform",
      u: "ul_geoform",
      w: "warfare_research_facility_back",
      x: "lazax_survivors",
      z: "dmz",
    };

    // TILE +-X +-Y SPACE ; PLANET1 ; PLANET2 ; ...
    const firstRegionPattern = new RegExp(
      /^([0-9AB]+)([-+][0-9]+)([-+][0-9]+)(.*)?$/
    );
    const rotPattern = new RegExp(/^(\d+)([AB])(\d)$/);
    const regionAttachmentsPattern = new RegExp(/^(.*)\*(.*)$/);

    const entries = hexSummary.split(",").filter((s) => s.length > 0);
    return entries.map((entryEncoded) => {
      const regions = entryEncoded.split(";");
      let m = regions[0].match(firstRegionPattern);
      if (!m) {
        throw new Error(
          `mismatch first region "${regions[0]}" ("${entryEncoded}")`
        );
      }
      console.assert(m);

      // Extract the tile number and location, preserve remaining first region.
      const entry = {
        tile: m[1],
        x: Number.parseInt(m[2]),
        y: Number.parseInt(m[3]),
      };
      regions[0] = m[4] || ""; // strip off tile, etc, preserve space region

      // Tile may have hyperlane info, add if present.
      m = entry.tile.match(rotPattern);
      if (m) {
        entry.tile = m[1];
        entry.ab = m[2];
        entry.rot = Number.parseInt(m[3]);
      }

      // Now fully parsed, tile is a number.
      entry.tile = Number.parseInt(entry.tile);

      // Parse per-region encoding.
      let stickyColor = undefined; // reset for each SYSTEM

      const isNumber = (c) => {
        if (c === undefined) {
          return false;
        }
        return "0" <= c && c <= "9";
      };

      entry.regions = regions.map((region) => {
        // Split off attachments, if any.
        m = region.match(regionAttachmentsPattern);
        let attachments = "";
        if (m) {
          region = m[1];
          attachments = m[2];
        }

        let stickyCount = 1; // reset for each REGION
        const colorToUnitNameToCount = {};

        for (let i = 0; i < region.length; i++) {
          const c = region[i];
          const prevC = region[i - 1];

          // Uppercase characters are player colors.
          const colorName = colorCodeToColorName[c];
          if (colorName) {
            stickyColor = colorName;
            stickyCount = 1; // reset count with new color
            continue;
          }

          // Numbers are unit counts.
          if (isNumber(c)) {
            if (isNumber(prevC)) {
              stickyCount = stickyCount * 10 + Number.parseInt(c);
            } else {
              stickyCount = Number.parseInt(c);
            }
            continue;
          }

          // Units get encoded after their quantiy value.
          const unit = unitCodeToUnitName[c];
          if (unit) {
            let unitToCount = colorToUnitNameToCount[stickyColor];
            if (!unitToCount) {
              unitToCount = {};
              colorToUnitNameToCount[stickyColor] = unitToCount;
            }
            unitToCount[unit] = (unitToCount[unit] || 0) + stickyCount;
          }
        }

        attachments = [...attachments]
          .map((c) => {
            return attachmentCodeToName[c];
          })
          .filter((v) => v);

        return {
          colorToUnitNameToCount,
          attachments,
        };
      });

      return entry;
    });
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

    const lawToColorNames = {};
    for (const law of laws) {
      lawToColorNames[law] = [];
    }

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
      const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
      const playerLaws = playerData?.laws || [];
      for (const playerLaw of playerLaws) {
        const entry = lawToColorNames[playerLaw];
        if (!entry) {
          continue; // law not registered at top?
        }
        entry.push(colorNameAndHex.colorName);
      }
    }

    return laws.map((law) => {
      const colorNames = lawToColorNames[law] || [];
      const name = GameDataUtil._escapeForHTML(law);
      let abbr = LAW_ABBREVIATIONS[name];
      if (!abbr) {
        abbr = name;
      }
      return { name, abbr, colorNames };
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
      if (nameToEntry[name]) {
        return; // already added!
      }
      let prefix = "";
      if (name.startsWith("*")) {
        name = name.substring(1);
        prefix = "*";
      }
      const entry = {
        name: prefix + GameDataUtil._escapeForHTML(name),
        abbr:
          prefix +
          (OBJECTIVE_NAME_ABBREVIATIONS[name] ||
            GameDataUtil._escapeForHTML(name)),
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
        if (!entry) {
          throw new Error(`missing entry for "${name}"`);
        }
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
   * Parse objectives progress.
   *
   * @param {Object} gameData
   * @returns {Array.{abbr:string,stage:number,header:string,values:{Array.{value:string|number,success:boolean},scoredBy:{Array.{number}|undefined}}}}
   */
  static parseObjectivesProgress(gameData) {
    console.assert(typeof gameData === "object");

    const objectivesProgress = gameData?.objectivesProgress || [];
    return objectivesProgress.map((objectiveProgress) => {
      const { name, abbr, stage, progress, scoredBy } = objectiveProgress;
      const { header, values } = progress || { header: "-", values: [] };
      return { name, abbr, stage, header, values, scoredBy };
    });
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
   * @param {Object.{players:Array.{Object}}} gameData
   * @returns {Array.{Object}}
   */
  static parsePlayerDataArray(gameData) {
    console.assert(typeof gameData === "object");

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

    const bonusCommodities = (playerData?.relicCards || []).includes(
      "Dynamis Core"
    )
      ? 2
      : 0;

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
      maxCommidities: (playerData?.maxCommodities || 0) + bonusCommodities,
      techSkips: {
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
        agent: GameDataUtil._escapeForHTML(
          playerData?.leaders?.agent || "purged"
        ),
        commander: GameDataUtil._escapeForHTML(
          playerData?.leaders?.commander || "purged"
        ),
        hero: GameDataUtil._escapeForHTML(
          playerData?.leaders?.hero || "purged"
        ),
      },
      hand: {
        action: playerData?.handSummary?.Actions || 0,
        promissory: playerData?.handSummary?.Promissory || 0,
        secret: (playerData?.handSummary || {})["Secret Objectives"] || 0,
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
   * @returns {Array.{Object.{name:string,colorName:string}}}
   */
  static parsePlayerTechnologies(playerData) {
    console.assert(typeof playerData === "object");

    const technologies = playerData?.technologies || [];
    return technologies.map((name) => {
      const colorName = TECHNOLOGY_COLOR[name] || "white";
      return {
        name: GameDataUtil._escapeForHTML(name),
        colorName,
      };
    });
  }

  static parsePlayerUnitModifiers(playerData) {
    console.assert(typeof playerData === "object");

    const unitModifiers = playerData?.unitModifiers || [];
    return unitModifiers.map((m) => {
      return {
        name: GameDataUtil._escapeForHTML(m.name),
        localeName: GameDataUtil._escapeForHTML(m.localeName),
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
   * Given the main game data, get per-round partial game data entries.
   *
   * @param {Object} gameData
   * @returns {Object}
   */
  static parseRoundToStartOfRoundGameData(gameData) {
    console.assert(typeof gameData === "object");

    const history = gameData?.history || [];

    const result = {};
    for (const entry of history) {
      const round = entry.round;
      if (round === undefined) {
        continue;
      }
      result[round] = entry;
    }
    return result;
  }

  static parseScoreboard(gameData) {
    console.assert(typeof gameData === "object");

    const scoreboard = gameData?.scoreboard || 10;
    console.assert(typeof scoreboard === "number");
    return scoreboard;
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
   * Parse current timer from overall game data.
   *
   * @param {Object.{timer:Object.{seconds:number,directin:number}} gameData
   * @returns Object.{seconds:number,directin:number}
   */

  static parseTimer(gameData) {
    console.assert(typeof gameData === "object");

    const seconds = gameData?.timer?.seconds || 0;
    const anchorTimestamp = gameData?.timer?.anchorTimestamp || 0;
    const anchorSeconds = gameData?.timer?.anchorSeconds || 0;
    const direction = gameData?.timer?.direction || 0;
    const countDown = gameData?.timer?.countDown || 0;
    console.assert(typeof seconds === "number");
    console.assert(typeof anchorTimestamp === "number");
    console.assert(typeof anchorSeconds === "number");
    console.assert(typeof direction === "number");
    console.assert(typeof countDown === "number");

    return { seconds, anchorTimestamp, anchorSeconds, direction, countDown };
  }

  static parseTurnTimer(gameData) {
    console.assert(typeof gameData === "object");

    const display = gameData?.extra?.turnTimer?.display || 0;
    const anchorTimestamp = gameData?.extra?.turnTimer?.anchorTimestamp || 0;
    const anchorValue = gameData?.extra?.turnTimer?.anchorValue || 0;
    const timerValue = gameData?.extra?.turnTimer?.timerValue || 0;
    const active = gameData?.extra?.turnTimer?.active || false;

    console.assert(typeof display === "number");
    console.assert(typeof anchorTimestamp === "number");
    console.assert(typeof anchorValue === "number");
    console.assert(typeof timerValue === "number");
    console.assert(typeof active === "boolean");

    return { display, anchorTimestamp, anchorValue, timerValue, active };
  }

  /**
   * Parse turn order.
   *
   * @param {Object.{players:Array.{Object}}} gameData
   * @returns {Array.{string}} turn order color names
   */
  static parseTurnOrder(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const colorNames = new Array(playerDataArray.length).fill("-");
    for (const playerData of playerDataArray) {
      const turnOrder = playerData?.turnOrder || 0;
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      console.assert(typeof turnOrder === "number");
      colorNames[turnOrder] = GameDataUtil._escapeForHTML(colorName);
    }
    return colorNames;
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
