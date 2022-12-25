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
      cybernetic_research_facility_face: "tokens/exploration_cybernetic.png",
      biotic_research_facility_face: "tokens/exploration_biotic.png",
      propulsion_research_facility_face: "tokens/exploration_propulsion.png",
      warfare_research_facility_face: "tokens/exploration_warfare.png",
      alpha_wormhole: "tokens/wormhole_ca.png",
      beta_wormhole: "tokens/wormhole_cb.png",
      cybernetic_Research_Facility_back: "tokens/exploration_1-1_yellow.png",
      dyson_sphere: "tokens/exploration_2-1.png",
      frontier: "tokens/frontier.png",
      nano_forge: "tokens/exploration_2-2-legend.png",
      gamma_wormhole: "tokens/wormhole_g.png",
      grav_tear: "tokens/rift.png",
      biotic_research_facility_back: "tokens/exploration_1-1_green.png",
      tomb_of_emphidia: "tokens/exploration_0-1-tomb.png",
      mirage: "tokens/mirage.png",
      stellar_converter: "tokens/stellar_converter.png",
      mining_world: "tokens/exploration_2-0.png",
      ion_storm: "tokens/ionstorm_alpha.png",
      propulsion_research_facility_back: "tokens/exploration_1-1_blue.png",
      paradise_world: "tokens/exploration_0-2.png",
      ul_sleeper: "tokens/token_q_Ul_Sleeper.png",
      rich_world: "tokens/token_r_Rich_World.png",
      warfare_research_facility_back: "tokens/exploration_1-1_red.png",
      lazax_survivors: "tokens/exploration_1-2.png",
      dmz: "tokens/exploration_dmz.png",
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
    this._lineWidth = Math.ceil(this._unitSize * 0.04);

    this._colorNameToHex = {};

    // This is somewhat expensive, update on a slower timer.
    this._gamedata = undefined;
    const updateSeconds = 15;
    setInterval(() => {
      if (this._gamedata) {
        this.update(this._gamedata);
        this._gamedata = undefined;
      }
    }, updateSeconds * 1000);

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this._gamedata = event.data.detail;
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
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

    for (const entry of hexSummary) {
      this._drawCommandTokens(ctx, entry.x, entry.y, entry);
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

    const src = this._getTileImageSrc(hexSummaryEntry.tile);
    ImageUtil.drawMagic(ctx, src, x, y, {
      width: this._tileWidth,
      height: this._tileWidth, // images have transparent top/botom for square
    });
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

    for (const attachment of region.attachments) {
      const path = this._attachmentToPath[attachment];
      if (!path) {
        throw new Error(`no attachment for ${attachment}`);
      }
      const imageSrc = ImageUtil.getSrc(path);
      drawEntries.push({
        colorName: undefined,
        imageSrc,
        count: 1,
      });
    }

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
          imageSrc: this._getUnitImageSrc(unitName),
          count,
        });
      }
    }

    const numRegions = hexSummaryEntry.regions.length;
    const [cx, cy, avail] = this._numRegionsToCenters[numRegions][regionIndex];
    x += (cx / 2 + 0.5) * this._tileWidth;
    y += (cy / 2 + 0.5) * this._tileWidth;

    // x is center, start units to left.
    if (drawEntries.length > 1) {
      x -= ((drawEntries.length - 1) * this._deltaX) / 2;
    }

    const unitY = y - this._unitSize / 2;
    const textY = y + this._textY;

    for (const drawEntry of drawEntries) {
      console.assert(drawEntry.imageSrc);
      console.assert(drawEntry.count > 0);

      const colorHex = this._colorNameToHex[drawEntry.colorName];

      ImageUtil.drawMagic(
        ctx,
        drawEntry.imageSrc,
        x - this._unitSize / 2,
        unitY,
        {
          width: this._unitSize,
          height: this._unitSize,
          filter: "brightness(110%)",
          tintColor: colorHex,
          outlineWidth: this._lineWidth,
          outlineColor: "black",
          shadowWidth: this._lineWidth * 2,
          shadowColor: "white",
        }
      );

      if (drawEntry.count > 1) {
        const text = drawEntry.count;

        const textX = x + this._unitSize * 0.1;

        ctx.save();
        ctx.font = `800 ${this._fontSize}px Open Sans, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        // White fade out background.
        ctx.lineWidth = this._lineWidth * 4;
        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        ctx.shadowBlur = this._lineWidth * 4;
        ctx.strokeText(text, textX, textY);
        ctx.shadowBlur = 0;

        // Black outline.
        ctx.lineWidth = this._lineWidth * 3;
        ctx.strokeStyle = "black";
        ctx.strokeText(text, textX, textY);

        // Player color text.
        ctx.fillStyle = colorHex;
        ctx.fillText(text, textX, textY);
        ctx.restore();
      }

      x += this._deltaX;
    }
  }

  _drawCommandTokens(ctx, x, y, hexSummaryEntry) {
    const region = hexSummaryEntry.regions[0]; // command tokens always in space entry
    const tokenColorNames = [];
    for (const [colorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount
    )) {
      for (const unitName of Object.keys(unitNameToCount)) {
        if (unitName === "command_token") {
          tokenColorNames.push(colorName);
        }
      }
    }

    const tokenColorHexes = tokenColorNames
      .map((colorName) => this._colorNameToHex[colorName])
      .filter((x) => x);

    x = x + this._tileWidth * 0.5;
    y = y + this._tileHeight * 0.95;

    x = x - ((tokenColorHexes.length - 1) * this._deltaX) / 2;

    const src = this._getUnitImageSrc("command_token");
    for (const colorHex of tokenColorHexes) {
      ImageUtil.drawMagic(
        ctx,
        src,
        x - this._unitSize / 2,
        y - this._unitSize / 2,
        {
          width: this._unitSize,
          height: this._unitSize,
          tintColor: colorHex,
          outlineWidth: this._lineWidth,
          outlineColor: "black",
          shadowWidth: this._lineWidth * 2,
          shadowColor: "white",
        }
      );
      x += this._deltaX;
    }
  }

  _getTileImageSrc(tile) {
    return ImageUtil.getSrc(`tiles/tile_${String(tile).padStart(3, "0")}.png`);
  }

  _getUnitImageSrc(unitName) {
    const path = this._unitToPath[unitName];
    return ImageUtil.getSrc(path);
  }
}

window.addEventListener("load", () => {
  Map.getInstance();
});
