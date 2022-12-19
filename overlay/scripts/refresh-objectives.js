if (typeof module !== "undefined") {
  const { GameDataUtil } = require("./game-data-util");
}

OBJECTIVE_NAME_ABBREVIATIONS = {
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

class Objectives {
  static getInstance() {
    if (!Objectives.__instance) {
      Objectives.__instance = new Objectives();
    }
    return Objectives.__instance;
  }

  constructor() {
    console.log("Objectives");
    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };

    this._lowerNameToAbbr = {};
    for (const [name, abbr] of Object.entries(OBJECTIVE_NAME_ABBREVIATIONS)) {
      this._lowerNameToAbbr[name.toLowerCase()] = abbr;
    }
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const players = GameDataUtil.parsePlayerDataArray();
    const playerColorNamesAndHexValues = players.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    const playerCount = players.length;

    // Get and clear objective rows.
    let objectiveTRs = document.getElementsByClassName("objective");
    objectiveTRs = [...objectiveTRs]; // convert from HTMLCollection to array
    for (const objectiveTR of objectiveTRs) {
      const nameTD = this._getObjectiveNameTD(objectiveTR);
      const scoringTDs = this._getScoringTDs(objectiveTR, playerCount);
      nameTD.innerText = "-";
      for (const scoringTD of scoringTDs) {
        scoringTD.innerHTML = ""; // do HTML vs Text to remove any contents
        scoringTD.style.backgroundColor = "transparent";
      }
    }
    const getNextObjectiveTR = () => {
      const objectiveTR = objectiveTRs.shift();
      if (!objectiveTR) {
        console.warn("Objective.update: more objectives than rows");
      }
      return objectiveTR;
    };

    // Fill.
    const objectiveGroups = GameDataUtil.parseObjectives(gameData);
    for (const objective of objectiveGroups.stage1) {
      this._fillObjective(
        getNextObjectiveTR(),
        "stage1",
        objective,
        playerColorNamesAndHexValues
      );
    }
    for (const objective of objectiveGroups.stage2) {
      this._fillObjective(
        getNextObjectiveTR(),
        "stage2",
        objective,
        playerColorNamesAndHexValues
      );
    }

    this._fillSecrets(
      getNextObjectiveTR(),
      objectiveGroups.secret,
      playerColorNamesAndHexValues
    );

    this._fillCustodians(
      getNextObjectiveTR(),
      objectiveGroups.custodians,
      playerColorNamesAndHexValues
    );

    this._fillSupportForTheThrone(
      getNextObjectiveTR(),
      objectiveGroups.sftt,
      playerColorNamesAndHexValues
    );

    // Do "other" last in case we run out of rows.
    for (const objective of objectiveGroups.other) {
      this._fillObjective(
        getNextObjectiveTR(),
        "other",
        objective,
        playerColorNamesAndHexValues
      );
    }
  }

  _getAbbr(name) {
    console.assert(typeof name === "string");
    const lowerName = name.toLowerCase();
    const abbr = this._lowerNameToAbbr[lowerName];
    return abbr ? abbr : name;
  }

  _fillObjective(
    objectiveTR,
    objectiveType,
    objective,
    playerColorNamesAndHexValues
  ) {
    console.assert(objectiveTR);
    console.assert(typeof objectiveType === "string");
    console.assert(typeof objective.name === "string");
    console.assert(Array.isArray(playerColorNamesAndHexValues));

    // Name.
    const nameTD = this._getObjectiveNameTD(objectiveTR);
    let bgColor = "transparent";
    let color = "black";
    if (objectiveType === "stage1") {
      bgColor = "#ffde17";
    } else if (objectiveType === "stage2") {
      bgColor = "#6EC1E4";
    } else if (objectiveType === "secret") {
      bgColor = "#e46d72";
    } else if (objectiveType === "custodians") {
      bgColor = "transparent";
    } else if (objectiveType === "other") {
      bgColor = "transparent";
      color = "white";
    } else if (objectiveType === "sftt") {
      bgColor = "transparent";
    }
    nameTD.style.backgroundColor = bgColor;
    nameTD.style.color = color;
    nameTD.innerText = this._getAbbr(objective.name);

    // Who scored?
    const scoringTDs = this._getScoringTDs(
      objectiveTR,
      playerColorNamesAndHexValues.length
    );
    scoringTDs.forEach((td, index) => {
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      let bgColor = "transparent";
      if (objective.scoredBy.includes(colorNameAndHex.colorName)) {
        bgColor = colorNameAndHex.colorHex;
      }
      td.style.backgroundColor = bgColor;
      td.innerText = "";
    });
  }

  _fillSecrets(objectiveTR, allSecrets, playerColorNamesAndHexValues) {
    console.assert(objectiveTR);
    console.assert(Array.isArray(allSecrets));
    console.assert(Array.isArray(playerColorNamesAndHexValues));

    // Name.
    const nameTD = this._getObjectiveNameTD(objectiveTR);
    nameTD.innerText = "Secrets";
    nameTD.style.backgroundColor = "#e46d72";
    nameTD.style.color = "black";

    // Who scored?
    const colorNameCount = {};
    for (const objective of allSecrets) {
      for (const colorName of objective.scoredBy) {
        colorNameCount[colorName] = (colorNameCount[colorName] || 0) + 1;
      }
    }
    const scoringTDs = this._getScoringTDs(
      objectiveTR,
      playerColorNamesAndHexValues.length
    );
    scoringTDs.forEach((td, index) => {
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      const count = colorNameCount[colorNameAndHex.colorName] || 0;
      if (count > 0) {
        td.style.backgroundColor = colorNameAndHex.colorHex;
        td.style.color = "black";
        td.innerText = String(count);
      }
    });
  }

  _fillCustodians(objectiveTR, allCustodians, playerColorNamesAndHexValues) {
    console.assert(objectiveTR);
    console.assert(Array.isArray(allCustodians));
    console.assert(Array.isArray(playerColorNamesAndHexValues));

    // Name.
    const nameTD = this._getObjectiveNameTD(objectiveTR);
    nameTD.innerText = "Custodians";

    // Who scored?
    const colorNameCount = {};
    for (const objective of allCustodians) {
      for (const colorName of objective.scoredBy) {
        colorNameCount[colorName] = (colorNameCount[colorName] || 0) + 1;
      }
    }
    const scoringTDs = this._getScoringTDs(
      objectiveTR,
      playerColorNamesAndHexValues.length
    );
    scoringTDs.forEach((td, index) => {
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      const count = colorNameCount[colorNameAndHex.colorName] || 0;
      if (count > 0) {
        td.style.backgroundColor = colorNameAndHex.colorHex;
        td.style.color = "black";
        td.innerText = String(count);
      }
    });
  }

  _fillSupportForTheThrone(
    objectiveTR,
    allSupports,
    playerColorNamesAndHexValues
  ) {
    console.assert(objectiveTR);
    console.assert(Array.isArray(allSupports));
    console.assert(Array.isArray(playerColorNamesAndHexValues));

    // Name.
    const nameTD = this._getObjectiveNameTD(objectiveTR);
    nameTD.innerText = "Support";

    // Who scored?
    const playerColorToSupportColors = {};
    for (const objective of allSupports) {
      const m = objective.name.match(".*\\(([A-Za-z]*)\\)$");
      if (!m) {
        console.warn(`support without color? "${objective.name}"`);
        continue;
      }
      const supportColor = m[1].toLowerCase();
      for (const playerColor of objective.scoredBy) {
        let supportColors = playerColorToSupportColors[playerColor];
        if (!supportColors) {
          supportColors = [];
          playerColorToSupportColors[playerColor] = supportColors;
        }
        if (!supportColors.includes(supportColor)) {
          supportColors.push(supportColor);
        }
      }
    }
    const scoringTDs = this._getScoringTDs(
      objectiveTR,
      playerColorNamesAndHexValues.length
    );
    scoringTDs.forEach((td, index) => {
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      const supportColors =
        playerColorToSupportColors[colorNameAndHex.colorName];
      const count = supportColors ? supportColors.length : 0;
      if (count === 0) {
        return;
      }
      td.style.backgroundColor = colorNameAndHex.colorHex;
      //td.style.color = "black";
      //td.innerText = String(count);

      // Show supports!
      const w = 20; //td.offsetWidth - 2;
      const h = 20; //td.offsetHeight - 2;
      const canvas = document.createElement("canvas");
      canvas.style.paddingLeft = 0;
      canvas.style.paddingRight = 0;
      canvas.style.marginLeft = "auto";
      canvas.style.marginRight = "auto";
      canvas.style.display = "block";
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      const x = w / 2;
      const y = h / 2;
      const r = Math.min(x, y);
      supportColors.forEach((supportColor, index) => {
        let colorHex = "#000000";
        for (const colorNameAndHex of playerColorNamesAndHexValues) {
          if (colorNameAndHex.colorName === supportColor) {
            colorHex = colorNameAndHex.colorHex;
            break;
          }
        }
        ctx.fillStyle = colorHex;
        const a = (Math.PI * 2 * index) / supportColors.length;
        const b = (Math.PI * 2 * (index + 1)) / supportColors.length;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r, a, b);
        ctx.fill();
      });

      td.appendChild(canvas);
    });
  }

  _getObjectiveNameTD(objectiveTR) {
    return objectiveTR.getElementsByClassName("objective-name")[0];
  }

  _getScoringTDs(objectiveTR, playerCount) {
    console.assert(typeof playerCount === "number");
    let tds = objectiveTR.getElementsByClassName("scored-by");
    tds = [...tds]; // convert from HTMLCollection to array
    tds.forEach((td, index) => {
      td.style.display = index < playerCount ? "" : "none";
    });
    return tds.slice(0, playerCount);
  }
}

window.addEventListener("load", () => {
  Objectives.getInstance();
});
