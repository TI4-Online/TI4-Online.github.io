"use strict";

class Objectives {
  static getInstance() {
    if (!Objectives.__instance) {
      Objectives.__instance = new Objectives();
    }
    return Objectives.__instance;
  }

  constructor() {
    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const players = GameDataUtil.parsePlayerDataArray(gameData);
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
    let bgColor = "unset";
    let color = "black";
    if (objectiveType === "stage1") {
      bgColor = GameDataUtil.colorNameToHex("yellow");
    } else if (objectiveType === "stage2") {
      bgColor = GameDataUtil.colorNameToHex("blue");
    } else if (objectiveType === "secret") {
      bgColor = GameDataUtil.colorNameToHex("red");
    } else if (objectiveType === "custodians") {
      bgColor = "#222222";
    } else if (objectiveType === "other") {
      bgColor = "#222222";
      color = "unset";
    } else if (objectiveType === "sftt") {
      bgColor = "#222222";
    }
    nameTD.style.backgroundColor = bgColor;
    nameTD.style.color = color;
    nameTD.innerText = objective.abbr;

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
    nameTD.style.backgroundColor = "#222222";

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
    nameTD.style.backgroundColor = "#222222";

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
      const w = Math.min(td.offsetWidth, td.offsetHeight) - 4; // inline borders
      const h = w;
      const scale = 2;

      const canvas = document.createElement("canvas");
      canvas.style.paddingLeft = 0;
      canvas.style.paddingRight = 0;
      canvas.style.marginLeft = "auto";
      canvas.style.marginRight = "auto";
      canvas.style.display = "block";
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale); // applies to coords used by ctx
      ctx.off;
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
        ctx.closePath();
        ctx.fill();
      });

      // Frame.
      ctx.lineWidth = 1;
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(x, y, r - ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();

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
