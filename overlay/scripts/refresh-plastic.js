"use strict";

class Plastic {
  static getInstance() {
    if (!Plastic.__instance) {
      Plastic.__instance = new Plastic();
    }
    return Plastic.__instance;
  }

  constructor() {
    this._unitToPath = {
      flagship: "units/unit_h_Flagship.png",
      war_sun: "units/unit_w_War_Sun.png",
      dreadnought: "units/unit_d_Dreadnought.png",
      carrier: "units/unit_c_Carrier.png",
      cruiser: "units/unit_r_Cruiser.png",
      destroyer: "units/unit_y_Destroyer.png",
      fighter: "units/unit_f_Fighter.png",
      pds: "units/unit_p_PDS.png",
      infantry: "units/unit_i_Infantry.png",
      space_dock: "units/unit_s_Space_Dock.png",
      mech: "units/unit_m_Mech.png",
      tech: "tech/blue.png",
    };

    const elementId = "plastic";
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    // Resize to fit parent?
    if (this._canvas.width === 0 && this._canvas.height === 0) {
      this._canvas.width = this._canvas.parentNode.offsetWidth;
      this._canvas.height = this._canvas.parentNode.offsetHeight;
    }

    // Set CSS for "real" size, then scale for anti-aliasing.
    this._canvas.style.width = `${this._canvas.width}px`;
    this._canvas.style.height = `${this._canvas.height}px`;
    this._canvas.width *= 2;
    this._canvas.height *= 2;

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const ctx = this._canvas.getContext("2d");
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    const drawOrderSpace = [
      "flagship",
      "war_sun",
      "dreadnought",
      "carrier",
      "cruiser",
      "destroyer",
      "fighter",
    ];
    const drawOrderGround = [
      "pds",
      "space_dock",
      "mech",
      "infantry",
      "<gap>",
      "tech",
    ];

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const playerCount = playerDataArray.length;

    // Count units.
    const colorNameToUnitNameToCount = {};
    const hexSummary = GameDataUtil.parseHexSummary(gameData);
    for (const hexSummaryEntry of hexSummary) {
      for (const region of hexSummaryEntry.regions) {
        for (const [colorName, unitNameToCount] of Object.entries(
          region.colorToUnitNameToCount
        )) {
          let colorUnitNameToCount = colorNameToUnitNameToCount[colorName];
          if (!colorUnitNameToCount) {
            colorUnitNameToCount = {};
            colorNameToUnitNameToCount[colorName] = colorUnitNameToCount;
          }
          for (const [unitName, count] of Object.entries(unitNameToCount)) {
            colorUnitNameToCount[unitName] =
              (colorUnitNameToCount[unitName] || 0) + count;
          }
        }
      }
    }

    // Count tech.
    for (const playerData of playerDataArray) {
      const { colorName, colorHex } = GameDataUtil.parsePlayerColor(playerData);
      let colorUnitNameToCount = colorNameToUnitNameToCount[colorName];
      if (!colorUnitNameToCount) {
        colorUnitNameToCount = {};
        colorNameToUnitNameToCount[colorName] = colorUnitNameToCount;
      }
      const techs = GameDataUtil.parsePlayerTechnologies(playerData);
      colorUnitNameToCount["tech"] = techs.length;
    }

    const numRows = 2;
    const numCols = Math.ceil(playerCount / numRows);
    const cellH = Math.floor(this._canvas.height / numRows);
    const cellW = Math.floor(this._canvas.width / numCols);
    const unitSize = Math.floor(
      Math.min(cellH / 4, (cellW / drawOrderSpace.length) * 1.2)
    );
    const outlineSize = Math.ceil(unitSize * 0.05);
    const unitDelta = Math.floor(unitSize * 0.7);
    const textDelta = Math.floor(unitSize * 0.1);
    const fontSize = Math.floor(unitSize * 0.5);

    playerDataArray.forEach((playerData, playerIndex) => {
      const { colorName, colorHex } = GameDataUtil.parsePlayerColor(playerData);
      const col =
        playerIndex < numCols
          ? numCols - playerIndex - 1
          : playerIndex - numCols;
      const row = numRows - 1 - Math.floor(playerIndex / numCols);
      const x = cellW * col;
      const y = cellH * row;

      //ctx.fillStyle = colorHex;
      //ctx.fillRect(x + 4, y + 4, cellW - 8, cellH - 8);

      const unitNameToCount = colorNameToUnitNameToCount[colorName] || {};
      const drawUnitsAndCounts = (drawOrder, localY, textOffsetY) => {
        drawOrder.forEach((unitName, unitIndex) => {
          const unitX =
            x +
            unitIndex * unitDelta +
            Math.floor(
              (cellW - (drawOrder.length - 1) * unitDelta - unitSize) / 2
            );
          const unitY = y + localY;
          const count = unitNameToCount[unitName] || 0;

          const path = this._unitToPath[unitName];
          const src = path && ImageUtil.getSrc(path);
          if (src) {
            ImageUtil.drawMagic(ctx, src, unitX, unitY, {
              width: unitSize,
              height: unitSize,
              color: count > 0 ? colorHex : "black",
              outlineColor: "black",
              outlineWidth: outlineSize,
              shadowColor: "white",
              shadowWidth: outlineSize * 2,
            });
          }

          if (count <= 0) {
            return;
          }

          const text = count > 0 ? count : "";
          const textX = unitX + Math.floor(unitSize / 2);
          const textY = unitY + textOffsetY;

          ctx.save();
          ctx.font = `800 ${fontSize}px Open Sans, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // White fade out background.
          ctx.lineWidth = outlineSize * 3;
          ctx.strokeStyle = "white";
          ctx.shadowColor = "white";
          ctx.shadowBlur = outlineSize * 4;
          ctx.strokeText(text, textX, textY);
          ctx.shadowBlur = 0;

          // Black outline.
          ctx.lineWidth = outlineSize * 2;
          ctx.strokeStyle = "black";
          ctx.strokeText(text, textX, textY);

          // Player color text.
          ctx.fillStyle = colorHex;
          ctx.fillText(text, textX, textY);
          ctx.restore();
        });
      };

      drawUnitsAndCounts(drawOrderSpace, cellH / 2 - unitSize, -textDelta);
      drawUnitsAndCounts(drawOrderGround, cellH / 2, unitSize + textDelta);
    });
  }
}

window.addEventListener("load", () => {
  Plastic.getInstance().update({});
});
