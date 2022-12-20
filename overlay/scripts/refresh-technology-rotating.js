class Technology {
  static getInstance() {
    if (!Technology.__instance) {
      Technology.__instance = new Technology();
    }
    return Technology.__instance;
  }

  constructor() {
    this._rotateSeconds = 10;

    const elementId = "technology-rotating";
    this._table = document.getElementById(elementId);
    if (!this._table) {
      throw new Error(`Missing element id "${elementId}"`);
    }

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

    const timestamp = Math.floor(Date.now() / 1000);
    const index = Math.floor(timestamp / this._rotateSeconds) % playerCount;
    const player = players[index];
    const colorNameAndHex = playerColorNamesAndHexValues[index];

    // Header.
    let faction = GameDataUtil.parsePlayerFaction(player);
    if (!faction || faction === "bobert") {
      faction = "-";
    }
    const headerTH = this._table.getElementsByClassName("tech-header")[0];
    headerTH.innerText = faction;
    headerTH.style.color = colorNameAndHex.colorHex || "white";

    // Techs.
    const techs = GameDataUtil.parsePlayerTechnologies(player);
    const columnTD = this._table.getElementsByClassName("tech-column")[0];
    columnTD.innerHTML = "";
    for (const tech of techs) {
      const div = document.createElement("div");
      div.style.color = tech.colorHex;
      div.innerText = tech.name;
      columnTD.appendChild(div);
    }
  }
}

window.addEventListener("load", () => {
  Technology.getInstance();
});
