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

      const relicCounts = {};
      for (const relic of relics) {
        relicCounts[relic] = (relicCounts[relic] || 0) + 1;
      }

      const sortedRelicEntries = Object.entries(relicCounts).sort(([relicA], [relicB]) => {
        const isFragA = relicA.endsWith("Relic Fragment");
        const isFragB = relicB.endsWith("Relic Fragment");
        if (isFragA && !isFragB) return -1;
        if (!isFragA && isFragB) return 1;
        return relicA.localeCompare(relicB);
      });

      for (const [relic, count] of sortedRelicEntries) {
        const div = document.createElement("div");

        let imgName = null;
        if (relic === "Cultural Relic Fragment") {
          imgName = "CFrag.png";
        } else if (relic === "Hazardous Relic Fragment") {
          imgName = "HFrag.png";
        } else if (relic === "Industrial Relic Fragment") {
          imgName = "IFrag.png";
        } else if (relic === "Unknown Relic Fragment") {
          imgName = "UFrag.png";
        }

        if (imgName) {
          div.style.display = "inline-flex";
          div.style.alignItems = "center";
          div.style.gap = "4px";
          div.style.marginRight = "8px";

          const img = document.createElement("img");
          img.src = `/overlay/images/relic-fragments/${imgName}`;
          img.style.height = "1.2em";
          div.appendChild(img);

          const span = document.createElement("span");
          span.style.color = "white"; // Or match the color theme if needed
          span.innerText = `x${count}`;
          div.appendChild(span);
        } else {
          div.style.color = "gold";

          let text = relic;
          if (count > 1) {
            text += ` x${count}`;
          }

          div.innerText = GameDataUtil._escapeForHTML(text);
        }

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
