if (typeof module !== "undefined") {
  const { GameDataUtil } = require("./game-data-util");
}

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
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const players = GameDataUtil.parsePlayerDataArray();
    const playerColorNamesAndHexValues = players.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    const playerCount = players.length;

    let objectiveTRs = document.getElementsByClassName("objective");
    objectiveTRs = [...objectiveTRs]; // convert from HTMLCollection to array

    const objectiveGroups = GameDataUtil.parseObjectives(gameData);

    for (const objective of objectiveGroups.stage1) {
      const objectiveTR = objectiveTRs.shift();
      if (!objectiveTR) {
        console.warn("Objective.update: more objectives than rows");
        break;
      }
      this._fillObjective(
        objectiveTR,
        "stage1",
        objective,
        playerColorNamesAndHexValues
      );
    }
    for (const objective of objectiveGroups.stage2) {
      const objectiveTR = objectiveTRs.shift();
      if (!objectiveTR) {
        console.warn("Objective.update: more objectives than rows");
        break;
      }
      this._fillObjective(
        objectiveTR,
        "stage2",
        objective,
        playerColorNamesAndHexValues
      );
    }

    // Clear any remaining.
    for (const objectiveTR of objectiveTRs) {
      const nameTD = this._getObjectiveNameTD(objectiveTR);
      const scoringTDs = this._getScoringTDs(objectiveTR, playerCount);
      nameTD.innerText = "-";
      for (const scoringTD of scoringTDs) {
        scoringTD.innerText = "-";
        scoringTD.style.backgroundColor = "transparent";
      }
    }
  }

  _fillObjective(
    objectiveTR,
    objectiveType,
    objective,
    playerColorNamesAndHexValues
  ) {
    console.assert(typeof objectiveType === "string");
    console.assert(typeof objective.name === "string");
    console.assert(Array.isArray(playerColorNamesAndHexValues));

    const nameTD = this._getObjectiveNameTD(objectiveTR);
    const scoringTDs = this._getScoringTDs(
      objectiveTR,
      playerColorNamesAndHexValues.length
    );
    scoringTDs.forEach((td, index) => {
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      console.log(`${index} ${colorNameAndHex}`);
      let color = "transparent";
      if (objective.scoredBy.includes(colorNameAndHex.colorName)) {
        color = colorNameAndHex.colorHex;
      }
      td.style.backgroundColor = color;
    });

    nameTD.innerText = objective.name;
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
