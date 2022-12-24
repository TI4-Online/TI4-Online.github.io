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
      control_token: "units/unit_o_Control_Token.png",
    };

    this._attachmentToPath = {
      cybernetic_research_facility_face:
        "tokens/token_C#_Cybernetic_Research_Facility.png",
      biotic_research_facility_face:
        "tokens/token_I#_Biotic_Research_Facility.png",
      propulsion_research_facility_face:
        "tokens/token_O#_Propulsion_Research_Facility.png",
      warfare_research_facility_face:
        "tokens/token_W#_Warfare_Research_Facility.png",
      alpha_wormhole: "tokens/token_a_Alpha_Wormhole.png",
      beta_wormhole: "tokens/token_b_Beta_Wormhole.png",
      cybernetic_Research_Facility_back:
        "tokens/token_c_Cybernetic_Research_Facility.png",
      dyson_sphere: "tokens/token_d_Dyson_Sphere.png",
      frontier: "tokens/token_e_Frontier.png",
      nano_forge: "tokens/token_f_Nano-Forge.png",
      gamma_wormhole: "tokens/token_g_Gamma_Wormhole.png",
      grav_tear: "tokens/token_h_Grav_Tear.png",
      biotic_research_facility_back:
        "tokens/token_i_Biotic_Research_Facility.png",
      tomb_of_emphidia: "tokens/token_j_Tomb_of_Emphidia.png",
      mirage: "tokens/token_k_Mirage.png",
      stellar_converter: "tokens/token_l_Stellar_Converter.png",
      mining_world: "tokens/token_m_Mining_World.png",
      ion_storm: "tokens/token_n_Ion_Storm.png",
      propulsion_research_facility_back:
        "tokens/token_o_Propulsion_Research_Facility.png",
      paradise_world: "tokens/token_p_Paradise_World.png",
      ul_sleeper: "tokens/token_q_Ul_Sleeper.png",
      rich_world: "tokens/token_r_Rich_World.png",
      warfare_research_facility_back:
        "tokens/token_w_Warfare_Research_Facility.png",
      lazax_survivors: "tokens/token_x_Lazax_Survivors.png",
      dmz: "tokens/token_z_DMZ.png",
    };

    // cx, cy, avail
    this._numRegionsToCenters = {
      1: [[0, 0, 1.3]],
      2: [
        [0, -0.58, 0.8],
        [0, 0, 0.5],
      ],
      3: [
        [0, 0, 1.3],
        [-0.2, -0.58, 0.5],
        [0.18, 0.58, 0.5],
      ],
      4: [
        [0.4, 0, 0.7],
        [-0.5, 0, 0.4],
        [0.25, -0.58, 0.4],
        [0.3, 0.58, 0.4],
      ],
    };

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
    this._unitSize = this._tileWidth * 0.2;
    this._deltaX = this._unitSize * 0.5;
    this._fontSize = this._unitSize * 0.5;
    this._textY = this._unitSize * 0.3;

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

    // Fix locations.
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

      entry.x = this._canvas.width / 2 + (entry.x * this._tileWidth * 3) / 4;
      entry.y = this._canvas.height / 2 - (entry.y * this._tileHeight) / 2;
    }

    // Draw tiles first.
    for (const entry of hexSummary) {
      this._drawTile(ctx, entry.x, entry.y, entry);
    }

    // Draw occupants (may overflow tile)
    for (const entry of hexSummary) {
      for (
        let regionIndex = 0;
        regionIndex < entry.regions.length;
        regionIndex++
      ) {
        this._drawOccupants(ctx, entry.x, entry.y, entry, regionIndex);
      }
    }
  }

  _drawTile(ctx, x, y, hexSummaryEntry) {
    console.assert(typeof hexSummaryEntry.tile === "number");
    console.assert(typeof hexSummaryEntry.x === "number");
    console.assert(typeof hexSummaryEntry.y === "number");

    const tileImage = this._getTileImage(hexSummaryEntry.tile);
    ctx.drawImage(tileImage, x, y, this._tileWidth, this._tileWidth); // images have transparent top/botom for square
  }

  _drawOccupants(ctx, x, y, hexSummaryEntry, regionIndex) {
    console.assert(typeof hexSummaryEntry.x === "number");
    console.assert(typeof hexSummaryEntry.y === "number");
    console.assert(Array.isArray(hexSummaryEntry.regions));
    console.assert(typeof hexSummaryEntry.regions[0] === "object");

    const region = hexSummaryEntry.regions[regionIndex];

    const drawOrder = [
      "flagship",
      "war_sun",
      "dreadnought",
      "carrier",
      "cruiser",
      "destroyer",
      "fighter",
      "pds",
      "space_dock",
      "mech",
      "infantry",
      "control_token",
    ];

    const drawEntries = [];
    for (const [colorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount
    )) {
      for (const unitName of drawOrder) {
        const count = unitNameToCount[unitName];
        if (!count || count <= 0) {
          continue;
        }

        drawEntries.push({
          colorName,
          image: this._getUnitImage(unitName),
          count,
        });
      }
    }

    const numRegions = hexSummaryEntry.regions.length;
    const [cx, cy, avail] = this._numRegionsToCenters[numRegions][regionIndex];
    x += (cx / 2 + 0.5) * this._tileWidth;
    y += (cy / 2 + 0.5) * this._tileWidth;

    // Draw space units in center
    this._drawImagesWithCounts(ctx, drawEntries, x, y);
  }

  _drawImagesWithCounts(ctx, entries, x, y) {
    console.assert(Array.isArray(entries));

    // x is center, start units to left.
    if (entries.length > 1) {
      x -= ((entries.length - 1) * this._deltaX) / 2;
    }

    const unitY = y - this._unitSize / 2;
    const textY = y + this._textY;

    for (const entry of entries) {
      console.assert(entry.image);
      console.assert(entry.colorName);
      console.assert(entry.count > 0);

      if (!entry.image.complete) {
        continue;
      }

      const colorHex = this._colorNameToHex[entry.colorName];
      if (!colorHex) {
        continue;
      }

      // white outline
      ctx.save();
      ctx.filter = this._getColorFilter("mask");
      const d = 4;
      for (let dx = -d; dx <= d; dx += 1) {
        for (let dy = -d; dy <= d; dy += 1) {
          ctx.drawImage(
            entry.image,
            x - this._unitSize / 2 + dx,
            unitY + dy,
            this._unitSize,
            this._unitSize
          );
        }
      }
      ctx.restore();

      ctx.save();
      ctx.filter = this._getColorFilter(entry.colorName);
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.drawImage(
        entry.image,
        x - this._unitSize / 2,
        unitY,
        this._unitSize,
        this._unitSize
      );
      ctx.restore();

      ctx.save();
      //ctx.filter = "brightness(120%)";
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(
        entry.image,
        x - this._unitSize / 2,
        unitY,
        this._unitSize,
        this._unitSize
      );
      ctx.restore();

      if (entry.count > 1) {
        const text = entry.count;

        ctx.save();
        ctx.font = `800 ${this._fontSize}px Open Sans, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = Math.floor(this._fontSize * 0.15);
        ctx.strokeText(text, x + this._unitSize / 8, textY);
        ctx.fillText(text, x + this._unitSize / 8, textY);
        ctx.restore();
      }

      x += this._deltaX;
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
