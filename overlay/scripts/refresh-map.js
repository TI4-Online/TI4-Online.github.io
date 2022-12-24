"use strict";

class Map {
  static getInstance() {
    if (!Map.__instance) {
      Map.__instance = new Map();
    }
    return Map.__instance;
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
      command_token: "units/unit_t_Command_Token.png",
      control_token: "units/unit_o_Command_Token.png",
    };

    this._attachmentToPath = {};

    const elementId = "map";
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    if (this._canvas.width === 0 && this._canvas.height === 0) {
      // Size slightly smaller to prevent growing table size, then pad
      const w = this._canvas.parentNode.offsetWidth - 4;
      const h = this._canvas.parentNode.offsetHeight - 4;
      this._canvas.style.width = `${w}px`;
      this._canvas.style.height = `${h}px`;
      this._canvas.width = w * 2;
      this._canvas.height = h * 2;
    }

    this._tileWidth = this._canvas.width * 0.16;
    this._tileHeight = (this._tileWidth * 433) / 500;
    this._colorNameToHex = {};
    this._srcToImage = {};

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray();
    const playerColorNamesAndHexValues = playerDataArray.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    for (const colorNameAndHex of playerColorNamesAndHexValues) {
      this._colorNameToHex[colorNameAndHex.colorName] =
        colorNameAndHex.colorHex;
    }

    const hexSummary = GameDataUtil.parseHexSummary(gameData);

    const ctx = this._canvas.getContext("2d");
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 2;
    // ctx.beginPath();
    // ctx.moveTo(this._canvas.width / 2, 0);
    // ctx.lineTo(this._canvas.width / 2, this._canvas.height);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(0, this._canvas.height / 2);
    // ctx.lineTo(this._canvas.width, this._canvas.height / 2);
    // ctx.closePath();
    // ctx.stroke();

    for (const entry of hexSummary) {
      console.assert(typeof entry.x === "number");
      console.assert(typeof entry.y === "number");

      if (entry.tile === 51) {
        entry.x = -3;
        entry.y = -6;
      } else if (entry.tile === 82) {
        entry.x = 3;
        entry.y = -6;
      }

      entry.x -= 0.7;
      entry.y += 1.2;

      const x = this._canvas.width / 2 + (entry.x * this._tileWidth * 3) / 4;
      const y = this._canvas.height / 2 - (entry.y * this._tileHeight) / 2;

      this._drawTile(ctx, x, y, entry);
      this._drawSpaceOccupants(ctx, x, y, entry);
    }
  }

  _drawTile(ctx, x, y, hexSummaryEntry) {
    console.assert(typeof hexSummaryEntry.tile === "number");
    console.assert(typeof hexSummaryEntry.x === "number");
    console.assert(typeof hexSummaryEntry.y === "number");

    const tileImage = this._getTileImage(hexSummaryEntry.tile);
    ctx.drawImage(tileImage, x, y, this._tileWidth, this._tileWidth); // images have transparent top/botom for square
  }

  _drawSpaceOccupants(ctx, x, y, hexSummaryEntry) {
    console.assert(typeof hexSummaryEntry.x === "number");
    console.assert(typeof hexSummaryEntry.y === "number");
    console.assert(Array.isArray(hexSummaryEntry.regions));
    console.assert(typeof hexSummaryEntry.regions[0] === "object");

    const space = hexSummaryEntry.regions[0];

    const drawOrder = [
      "flagship",
      "war_sun",
      "dreadnought",
      "carrier",
      "cruiser",
      "destroyer",
      "fighter",
      "mech",
      "infantry",
    ];

    for (const [color, unitNameToCount] of Object.entries(
      space.colorToUnitNameToCount
    )) {
      const colorHex = this._colorNameToHex[color];
      if (!colorHex) {
        continue;
      }

      let drawIndex = 0;
      for (const unitName of drawOrder) {
        const count = unitNameToCount[unitName];
        if (!count || count <= 0) {
          continue;
        }
        console.log(`XXX ${color} ${unitName} ${count} ${drawIndex}`);

        const unitImage = this._getUnitImage(unitName);

        ctx.save();
        ctx.filter = this._getColorFilter(color) + " brightness(120%)";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.drawImage(unitImage, x + drawIndex * 50, y, 100, 100);
        ctx.restore();

        ctx.save();
        ctx.filter = "brightness(120%)";
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(unitImage, x + drawIndex * 50, y, 100, 100);
        ctx.restore();

        drawIndex += 1;
      }
    }
  }

  _getTileImage(tile) {
    const src = ImageUtil.getSrc(
      `tiles/tile_${String(tile).padStart(3, "0")}.png`
    );
    let image = this._srcToImage[src];
    if (!image) {
      image = new Image();
      image.src = src;
      this._srcToImage[src] = image;
    }
    return image;
  }

  _getUnitImage(unitName) {
    const path = this._unitToPath[unitName];
    const src = ImageUtil.getSrc(path);
    let image = this._srcToImage[src];
    if (!image) {
      image = new Image();
      image.src = src;
      this._srcToImage[src] = image;
    }
    return image;
  }

  _getColorFilter(colorName) {
    // Unfortunately there is no simple tint.  We could get the raw RGBA and manually
    // multiply and cache, but assume native operations will be fast.
    // https://angel-rs.github.io/css-color-filter-generator/
    const colorNameToFilter = {
      mask: "brightness(0) saturate(100%) invert(100%)",
      white:
        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(5%) hue-rotate(185deg) brightness(102%) contrast(101%);",
      blue: "brightness(0) saturate(100%) invert(75%) sepia(24%) saturate(963%) hue-rotate(166deg) brightness(94%) contrast(90%)",
      purple:
        "brightness(0) saturate(100%) invert(44%) sepia(10%) saturate(1930%) hue-rotate(236deg) brightness(96%) contrast(95%)",
      yellow:
        "brightness(0) saturate(100%) invert(93%) sepia(20%) saturate(2680%) hue-rotate(342deg) brightness(106%) contrast(101%)",
      red: "brightness(0) saturate(100%) invert(54%) sepia(46%) saturate(1077%) hue-rotate(313deg) brightness(98%) contrast(82%)",
      green:
        "brightness(0) saturate(100%) invert(30%) sepia(89%) saturate(1237%) hue-rotate(123deg) brightness(108%) contrast(101%)",
      orange:
        "brightness(0) saturate(100%) invert(53%) sepia(97%) saturate(1903%) hue-rotate(345deg) brightness(100%) contrast(101%)",
      pink: "brightness(0) saturate(100%) invert(55%) sepia(60%) saturate(1316%) hue-rotate(297deg) brightness(104%) contrast(101%)",
      black: "brightness(0) saturate(100%)",
    };

    return colorNameToFilter[colorName];
  }
}

window.addEventListener("load", () => {
  Map.getInstance();
});
