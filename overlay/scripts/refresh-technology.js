"use strict";

class Technology {
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

  static COLOR_TO_IMG = {
    "blue": "technology/PropulsionTech.png",
    "green": "technology/BioticTech.png",
    "red": "technology/WarfareTech.png",
    "yellow": "technology/CyberneticTech.png",
  };

  static getInstance() {
    if (!Technology.__instance) {
      Technology.__instance = new Technology();
    }
    return Technology.__instance;
  }

  constructor() {
    const elementId = "technology";
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
      const techs = GameDataUtil.parsePlayerTechnologies(player);

      //td.style.borderColor = colorNameAndHex.colorHex || "transparent";

      for (const tech of techs) {
        const div = document.createElement("div");
        div.style.color = GameDataUtil.colorNameToHex(tech.colorName);
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.gap = "4px";

        if (tech.faction) {
          const img = document.createElement("img");
          img.src = ImageUtil.getSrc(`faction-icons/${tech.faction}_icon.png`);
          img.style.height = "1.2em";
          div.appendChild(img);
        }

        const span = document.createElement("span");
        span.innerText = tech.name;
        if (tech.faceDown) {
          span.style.textDecoration = "line-through";
        }
        div.appendChild(span);

        if (tech.unitUpgradeType && Technology.UNIT_UPGRADE_IMAGES[tech.unitUpgradeType]) {
          const typeImg = document.createElement("img");
          typeImg.src = ImageUtil.getSrc(Technology.UNIT_UPGRADE_IMAGES[tech.unitUpgradeType]);
          typeImg.style.height = "1.2em";
          div.appendChild(typeImg);
        }
        else if (tech.colorName && Technology.COLOR_TO_IMG[tech.colorName]) {
          const colorImg = document.createElement("img");
          colorImg.src = ImageUtil.getSrc(Technology.COLOR_TO_IMG[tech.colorName]);
          colorImg.style.height = "1.2em";
          div.appendChild(colorImg);
        }

        td.appendChild(div);
      }
    });
  }

  _getHeaderTHs(playerCount) {
    console.assert(typeof playerCount === "number");

    let ths = this._table.getElementsByClassName("tech-header");
    ths = [...ths]; // convert from HTMLCollection to array
    ths.forEach((th, index) => {
      th.style.display = index < playerCount ? "" : "none";
    });
    return ths.slice(0, playerCount);
  }

  _getColumnTDs(playerCount) {
    console.assert(typeof playerCount === "number");

    let tds = this._table.getElementsByClassName("tech-column");
    tds = [...tds]; // convert from HTMLCollection to array
    tds.forEach((td, index) => {
      td.style.display = index < playerCount ? "" : "none";
    });
    return tds.slice(0, playerCount);
  }
}

window.addEventListener("load", () => {
  Technology.getInstance();
});
