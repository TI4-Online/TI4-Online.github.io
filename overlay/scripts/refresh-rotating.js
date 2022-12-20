class Technology {
  static getInstance() {
    if (!Technology.__instance) {
      Technology.__instance = new Technology();
    }
    return Technology.__instance;
  }

  constructor() {
    this._rotateSeconds = 10;

    let elementId = "rotating-1";
    this._table1 = document.getElementById(elementId);
    if (!this._table1) {
      throw new Error(`Missing element id "${elementId}"`);
    }
    elementId = "rotating-2";
    this._table2 = document.getElementById(elementId);
    if (!this._table2) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    this._lastIndex = undefined;
    this._lastTable = undefined;
    this._gameData = undefined;

    this._table1.style.opacity = 1;

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };

    // In addition to game data driven updates, do a periodic update with the
    // most recent game data.
    setInterval(() => {
      if (this._gameData) {
        this.update(this._gameData);
      }
    }, 1000);
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    // Remember most recent for timer-driven updates.
    this._gameData = gameData;

    const players = GameDataUtil.parsePlayerDataArray(gameData);
    const playerColorNamesAndHexValues = players.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    const playerCount = players.length;

    const timestamp = Math.floor(Date.now() / 1000);
    const index = Math.floor(timestamp / this._rotateSeconds) % playerCount;
    const player = players[index];
    const colorNameAndHex = playerColorNamesAndHexValues[index];

    const table = index % 2 === 0 ? this._table1 : this._table2;

    // Header.
    let faction = GameDataUtil.parsePlayerFaction(player);
    if (!faction || faction === "bobert") {
      faction = "-";
    }
    const headerTH = table.getElementsByClassName("tech-header")[0];
    headerTH.innerText = faction;
    headerTH.style.color = colorNameAndHex.colorHex || "white";

    // Techs.
    const techs = GameDataUtil.parsePlayerTechnologies(player);
    const columnTD = table.getElementsByClassName("tech-column")[0];
    columnTD.innerHTML = "";
    for (const tech of techs) {
      const div = document.createElement("div");
      div.style.color = tech.colorHex;
      div.innerText = tech.name;
      columnTD.appendChild(div);
    }

    // Swap tables?
    if (this._lastTable && this._lastTable !== table) {
      this._lastTable.style.opacity = 0;
      table.style.opacity = 1;
    }
    this._lastTable = table;
  }
}

window.addEventListener("load", () => {
  Technology.getInstance();
});
