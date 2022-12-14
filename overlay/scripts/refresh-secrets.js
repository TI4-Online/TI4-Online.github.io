"use strict";

class Secrets {
  static getInstance() {
    if (!Secrets.__instance) {
      Secrets.__instance = new Secrets();
    }
    return Secrets.__instance;
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

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const playerColorNamesAndHexValues = playerDataArray.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });

    const colorData = {};
    for (const colorNameAndHex of playerColorNamesAndHexValues) {
      colorData[colorNameAndHex.colorName] = {
        colorHex: colorNameAndHex.colorHex,
        secrets: [],
      };
    }
    const objectiveGroups = GameDataUtil.parseObjectives(gameData);
    for (const objective of objectiveGroups.secret) {
      for (const scoredBy of objective.scoredBy) {
        const data = colorData[scoredBy];
        if (!data) {
          console.log(JSON.stringify(playerColorNamesAndHexValues));
          console.log(`Secrets: bad scoredBy "${scoredBy}"`);
          continue;
        }
        data.secrets.push(objective.abbr);
      }
    }

    const container = document.getElementById("secrets");
    container.innerHTML = "";

    const colorNames = playerColorNamesAndHexValues.map(
      (colorNameAndHex) => colorNameAndHex.colorName
    );
    for (const colorName of colorNames) {
      const data = colorData[colorName];
      if (!data) {
        console.log(`Secrets: bad colorName ${colorName}`);
        continue;
      }
      for (const secret of data.secrets) {
        const div = document.createElement("div");
        div.className = "jumble-entry";
        div.style.backgroundColor = data.colorHex;
        div.style.color = "black";
        div.innerText = secret;

        container.appendChild(div);
      }
    }
  }
}

window.addEventListener("load", () => {
  Secrets.getInstance();
});
