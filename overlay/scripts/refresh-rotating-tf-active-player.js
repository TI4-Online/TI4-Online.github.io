"use strict";

class RotatingTFActivePlayer {
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
    if (!RotatingTFActivePlayer.__instance) {
      RotatingTFActivePlayer.__instance = new RotatingTFActivePlayer();
    }
    return RotatingTFActivePlayer.__instance;
  }

  constructor() {
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

    this._table1.style.opacity = 1;

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const activeColorName = GameDataUtil.parseCurrentTurnColorName(gameData);
    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const playerColorNamesAndHexValues = playerDataArray.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    const playerColorNames = playerColorNamesAndHexValues.map(
      (x) => x.colorName
    );

    const index = playerColorNames.indexOf(activeColorName);
    if (index < 0) {
      return; // no active player
    }
    const playerData = playerDataArray[index];
    const colorNameAndHex = playerColorNamesAndHexValues[index];

    let table = this._lastTable;
    if (index !== this._lastIndex) {
      table = this._lastTable === this._table1 ? this._table2 : this._table1;
      this._lastIndex = index;
    }

    // Header.
    let faction = GameDataUtil.parsePlayerFaction(playerData);
    if (!faction || faction === "bobert") {
      faction = "-";
    }
    const headerTH = table.getElementsByClassName("tech-header")[0];
    headerTH.innerText = faction;
    headerTH.style.color = colorNameAndHex.colorHex || "white";

    // Abilities
    const abilitiesTD = table.getElementsByClassName("tf-abilities-content")[0];
    abilitiesTD.innerHTML = "";
    const abilities = GameDataUtil.parsePlayerTFAbilities(playerData);
    for (let i = 0; i < 10; i++) {
      if (i < abilities.length) {
        abilitiesTD.appendChild(this._createItemDiv(abilities[i], true));
      } else {
        abilitiesTD.appendChild(this._createEmptyItemDiv());
      }
    }

    // Unit Upgrades
    const unitUpgradesTD = table.getElementsByClassName("tf-unit-upgrades-content")[0];
    unitUpgradesTD.innerHTML = "";
    const unitUpgrades = GameDataUtil.parsePlayerTFUnitUpgrades(playerData);
    for (let i = 0; i < 5; i++) {
      if (i < unitUpgrades.length) {
        unitUpgradesTD.appendChild(this._createItemDiv(unitUpgrades[i], false, true));
      } else {
        unitUpgradesTD.appendChild(this._createEmptyItemDiv());
      }
    }

    // Genomes
    const genomesTD = table.getElementsByClassName("tf-genomes-content")[0];
    genomesTD.innerHTML = "";
    const genomes = GameDataUtil.parsePlayerTFGenomes(playerData);
    for (let i = 0; i < 4; i++) {
      if (i < genomes.length) {
        genomesTD.appendChild(this._createItemDiv(genomes[i], false));
      } else {
        genomesTD.appendChild(this._createEmptyItemDiv());
      }
    }

    // Paradigms
    const paradigmsTD = table.getElementsByClassName("tf-paradigms-content")[0];
    paradigmsTD.innerHTML = "";
    const paradigms = GameDataUtil.parsePlayerTFParadigms(playerData);
    for (let i = 0; i < 3; i++) {
      if (i < paradigms.length) {
        paradigmsTD.appendChild(this._createItemDiv(paradigms[i], false));
      } else {
        paradigmsTD.appendChild(this._createEmptyItemDiv());
      }
    }

    // Resources.
    const canvas = table.getElementsByClassName("resources-canvas")[0];

    // Set canvas size to match parent, but 2x internal canvas size.
    if (canvas.width === 0 && canvas.height === 0) {
      // Size slightly smaller to prevent growing table size, then pad
      const w = canvas.parentNode.offsetWidth - 4 - 10;
      const h = canvas.parentNode.offsetHeight - 4 - 10;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * 2;
      canvas.height = h * 2;
    }

    const boundingBox = {
      left: 0,
      top: 0,
      width: canvas.width,
      height: canvas.height,
    };

    // If lastTable is not set this is the first draw.
    // Warm the draw cache with all colors.
    if (!this._lastTable) {
      for (const pd of playerDataArray) {
        DrawPlayerResources.getInstance().draw(canvas, boundingBox, pd);
      }
    }

    // Draw the intended player.
    DrawPlayerResources.getInstance().draw(canvas, boundingBox, playerData);

    // Swap tables?
    if (this._lastTable && this._lastTable !== table) {
      this._lastTable.style.opacity = 0;
      table.style.opacity = 1;
    }
    this._lastTable = table;
  }

  _createItemDiv(item, useColor, isUnitUpgrade) {
    const div = document.createElement("div");
    if (useColor && item.colorName) {
      div.style.color = GameDataUtil.colorNameToHex(item.colorName);
    } else {
      div.style.color = "white";
    }
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.gap = "4px";

    if (item.originName) {
      const img = document.createElement("img");
      img.src = ImageUtil.getSrc(`faction-icons/${item.originName}_icon.png`);
      img.style.height = "1.2em";
      div.appendChild(img);
    }

    const span = document.createElement("span");
    span.innerText = item.name;
    if (item.faceDown) {
      span.style.textDecoration = "line-through";
    }
    div.appendChild(span);

    if (isUnitUpgrade && item.type && RotatingTFActivePlayer.UNIT_UPGRADE_IMAGES[item.type]) {
      const typeImg = document.createElement("img");
      typeImg.src = ImageUtil.getSrc(RotatingTFActivePlayer.UNIT_UPGRADE_IMAGES[item.type]);
      typeImg.style.height = "1.2em";
      div.appendChild(typeImg);
    }

    return div;
  }

  _createEmptyItemDiv() {
    const div = document.createElement("div");
    div.style.height = "1.2em";
    div.innerHTML = "&nbsp;";
    return div;
  }
}

window.addEventListener("load", () => {
  RotatingTFActivePlayer.getInstance();
});
