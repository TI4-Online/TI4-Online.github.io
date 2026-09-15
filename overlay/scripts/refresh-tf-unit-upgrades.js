"use strict";

class TFUnitUpgrades {
  static UNIT_UPGRADE_IMAGES = {
    "flagship": "units/unit_h_Flagship.png",
    "war_sun": "units/unit_w_War_Sun.png",
    "dreadnought": "units/unit_d_Dreadnought.png",
    "carrier": "units/unit_c_Carrier.png",
    "cruiser": "units/unit_r_Cruiser.png",
    "destroyer": "units/unit_y_Destroyer.png",
    "fighter": "units/unit_f_Fighter.png",
    "pds": "units/unit_p_PDS.png",
    "infantry": "units/unit_i_Infantry.png",
    "space_dock": "units/unit_s_Space_Dock.png",
    "mech": "units/unit_m_Mech.png",
  };

  static getInstance() {
    if (!TFUnitUpgrades.__instance) {
      TFUnitUpgrades.__instance = new TFUnitUpgrades();
    }
    return TFUnitUpgrades.__instance;
  }

  constructor() {
    const elementId = "tf-unit-upgrades";
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
      const unitUpgrades = GameDataUtil.parsePlayerTFUnitUpgrades(player);

      //td.style.borderColor = colorNameAndHex.colorHex || "transparent";

      for (const unitUpgrade of unitUpgrades) {
        const div = document.createElement("div");
        div.style.color = "white"
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.gap = "4px";

        if (unitUpgrade.originName) {
          const img = document.createElement("img");
          img.src = `/overlay/images/faction-icons/${unitUpgrade.originName}_icon.png`;
          img.style.height = "1.2em";
          div.appendChild(img);
        }

        const span = document.createElement("span");
        span.innerText = unitUpgrade.name;
        div.appendChild(span);

        if (unitUpgrade.type && TFUnitUpgrades.UNIT_UPGRADE_IMAGES[unitUpgrade.type]) {
          const typeImg = document.createElement("img");
          typeImg.src = `/overlay/images/${TFUnitUpgrades.UNIT_UPGRADE_IMAGES[unitUpgrade.type]}`;
          typeImg.style.height = "1.2em";
          div.appendChild(typeImg);
        }

        td.appendChild(div);
      }
    });
  }

  _getHeaderTHs(playerCount) {
    console.assert(typeof playerCount === "number");

    let ths = this._table.getElementsByClassName("tf-unit-upgrades-header");
    ths = [...ths]; // convert from HTMLCollection to array
    ths.forEach((th, index) => {
      th.style.display = index < playerCount ? "" : "none";
    });
    return ths.slice(0, playerCount);
  }

  _getColumnTDs(playerCount) {
    console.assert(typeof playerCount === "number");

    let tds = this._table.getElementsByClassName("tf-unit-upgrades-column");
    tds = [...tds]; // convert from HTMLCollection to array
    tds.forEach((td, index) => {
      td.style.display = index < playerCount ? "" : "none";
    });
    return tds.slice(0, playerCount);
  }
}

window.addEventListener("load", () => {
  TFUnitUpgrades.getInstance();
});
