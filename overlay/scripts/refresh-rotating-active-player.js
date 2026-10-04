"use strict";

class RotatingActivePlayer {
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
    if (!RotatingActivePlayer.__instance) {
      RotatingActivePlayer.__instance = new RotatingActivePlayer();
    }
    return RotatingActivePlayer.__instance;
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

    const gameDataString = JSON.stringify(gameData);
    if (this._lastProcessedGameDataString === gameDataString) {
      return;
    }
    this._lastProcessedGameDataString = gameDataString;

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

    // Techs.
    const techs = GameDataUtil.parsePlayerTechnologies(playerData);
    const columnTD = table.getElementsByClassName("tech-column")[0];
    columnTD.innerHTML = "";
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

      if (tech.unitUpgradeType && RotatingActivePlayer.UNIT_UPGRADE_IMAGES[tech.unitUpgradeType]) {
        const typeImg = document.createElement("img");
        typeImg.src = ImageUtil.getSrc(RotatingActivePlayer.UNIT_UPGRADE_IMAGES[tech.unitUpgradeType]);
        typeImg.style.height = "1.2em";
        div.appendChild(typeImg);
      }
      else if (tech.colorName && RotatingActivePlayer.COLOR_TO_IMG[tech.colorName]) {
        const colorImg = document.createElement("img");
        colorImg.src = ImageUtil.getSrc(RotatingActivePlayer.COLOR_TO_IMG[tech.colorName]);
        colorImg.style.height = "1.2em";
        div.appendChild(colorImg);
      }

      columnTD.appendChild(div);
    }

    // Relics.
    const relicsTD = table.getElementsByClassName("relics-content")[0];
    relicsTD.innerHTML = "";
    const relics = GameDataUtil.parsePlayerRelics(playerData);
    
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

    const fragmentsDiv = document.createElement("div");
    fragmentsDiv.style.display = "flex";
    fragmentsDiv.style.alignItems = "center";
    fragmentsDiv.style.justifyContent = "center";
    fragmentsDiv.style.gap = "8px";
    
    let hasFragments = false;

    for (const [relic, count] of sortedRelicEntries) {
      let imgName = null;
      if (relic === "Cultural Relic Fragment") imgName = "CFrag.png";
      else if (relic === "Hazardous Relic Fragment") imgName = "HFrag.png";
      else if (relic === "Industrial Relic Fragment") imgName = "IFrag.png";
      else if (relic === "Unknown Relic Fragment") imgName = "UFrag.png";

      if (imgName) {
        hasFragments = true;
        const fragSpan = document.createElement("div");
        fragSpan.style.display = "flex";
        fragSpan.style.alignItems = "center";
        fragSpan.style.gap = "4px";

        const img = document.createElement("img");
        img.src = `/overlay/images/relic-fragments/${imgName}`;
        img.style.height = "1.2em";
        fragSpan.appendChild(img);

        const span = document.createElement("span");
        span.style.color = "white";
        span.innerText = `x${count}`;
        fragSpan.appendChild(span);
        
        fragmentsDiv.appendChild(fragSpan);
      }
    }

    if (hasFragments) {
      relicsTD.appendChild(fragmentsDiv);
    }

    for (const [relic, count] of sortedRelicEntries) {
      if (!relic.endsWith("Relic Fragment")) {
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.gap = "4px";
        div.style.color = "gold";
        div.innerText = relic;
        relicsTD.appendChild(div);
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
}

window.addEventListener("load", () => {
  RotatingActivePlayer.getInstance();
});
