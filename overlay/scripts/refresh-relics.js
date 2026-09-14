"use strict";

class Relics {
  static getInstance() {
    if (!Relics.__instance) {
      Relics.__instance = new Relics();
    }
    return Relics.__instance;
  }

  constructor() {
    const elementId = "relics";
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

    const headerTHs = this._getHeaderTHs(playerCount);
    headerTHs.forEach((th, index) => {
      const player = players[index];
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      let faction = GameDataUtil.parsePlayerFaction(player);
      if (!faction || faction === "bobert") {
        faction = "-";
      }
      th.innerText = faction;
      th.style.color = colorNameAndHex.colorHex || "white";
    });

    const columnTDs = this._getColumnTDs(playerCount);
    columnTDs.forEach((td, index) => {
      td.innerHTML = "";

      const player = players[index];
      const colorNameAndHex = playerColorNamesAndHexValues[index];
      const relics = player?.relics || [];

      for (const relic of relics) {
        const div = document.createElement("div");
        div.style.color = "white";
        div.innerText = GameDataUtil._escapeForHTML(relic);
        td.appendChild(div);
      }
    });
  }

  _getHeaderTHs(playerCount) {
    console.assert(typeof playerCount === "number");

    let ths = this._table.getElementsByClassName("relic-header");
    ths = [...ths]; // convert from HTMLCollection to array
    ths.forEach((th, index) => {
      th.style.display = index < playerCount ? "" : "none";
    });
    return ths.slice(0, playerCount);
  }

  _getColumnTDs(playerCount) {
    console.assert(typeof playerCount === "number");

    let tds = this._table.getElementsByClassName("relic-column");
    tds = [...tds]; // convert from HTMLCollection to array
    tds.forEach((td, index) => {
      td.style.display = index < playerCount ? "" : "none";
    });
    return tds.slice(0, playerCount);
  }
}

window.addEventListener("load", () => {
  Relics.getInstance();
});
