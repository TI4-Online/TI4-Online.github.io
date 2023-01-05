class MapUtil {
  constructor(canvas, overrideTileWidth) {
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
      ul_geoform: "tokens/geoform.png",
      ul_sleeper: "tokens/sleeper.png",
      ul_terraform: "tokens/terraform.png",
      rich_world: "tokens/exploration_1-0.png",
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

    this._tileToOverrideRegionCount = {
      25: 3, // quann
      26: 3, // lodor
      51: 3, // creuss
      64: 3, // atlas
      67: 3, //cormund
    };

    this._canvas = canvas;

    if (this._canvas.width === 0 && this._canvas.height === 0) {
      // Size slightly smaller to prevent growing table size, then pad
      const w = this._canvas.parentNode.offsetWidth - 4;
      const h = this._canvas.parentNode.offsetHeight - 4;
      this._canvas.style.width = `${w}px`;
      this._canvas.style.height = `${h}px`;
      this._canvas.width = w * 2;
      this._canvas.height = h * 2;
    }

    this._tileWidth = overrideTileWidth || this._canvas.width * 0.16;
    this._tileHeight = (this._tileWidth * 433) / 500;
    this._unitSize = this._tileWidth * 0.175;
    this._deltaX = this._unitSize * 0.6;
    this._fontSize = this._unitSize * 0.5;
    this._textY = this._unitSize * 0.3;
    this._lineWidth = Math.ceil(this._unitSize * 0.04);

    this._colorNameToHex = {};

    this._canvasContext = this._canvas.getContext("2d");
  }

  getSizes() {
    return {
      tileWidth: this._tileWidth,
      tileHeight: this._tileHeight,
      canvasWidth: this._canvas.width,
      canvasHeight: this._canvas.height,
    };
  }

  clear() {
    this._canvasContext.clearRect(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
  }

  drawTile(x, y, hexSummaryEntry, drawTileNumber = false) {
    const tile = hexSummaryEntry.tile;
    const src =
      tile > 0
        ? ImageUtil.getSrc(`tiles/tile_${String(tile).padStart(3, "0")}.png`)
        : ImageUtil.getSrc("tiles/blank.png");
    ImageUtil.drawMagic(this._canvasContext, src, x, y, {
      width: this._tileWidth,
      height: this._tileWidth, // images have transparent top/botom for square
      color: tile <= 0 ? "#444" : undefined,
    });

    if (drawTileNumber) {
      this._canvasContext.save();
      this._canvasContext.font = `800 ${this._fontSize}px Open Sans, sans-serif`;
      this._canvasContext.fillStyle = "white";
      this._canvasContext.textBaseline = "middle";
      this._canvasContext.textAlign = "left";
      this._canvasContext.fillText(
        tile,
        x + this._deltaX,
        y + this._tileWidth / 2
      );
      this._canvasContext.restore();
    }
  }

  drawCommandTokens(x, y, hexSummaryEntry) {
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

    const src = ImageUtil.getSrc(this._unitToPath["command_token"]);
    for (const colorHex of tokenColorHexes) {
      ImageUtil.drawMagic(
        this._canvasContext,
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

  drawOccupants(x, y, hexSummaryEntry, regionIndex) {
    const region = hexSummaryEntry.regions[regionIndex];
    const ctx = this._canvasContext;

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
          imageSrc: ImageUtil.getSrc(this._unitToPath[unitName]),
          count,
        });
      }
    }

    let numRegions = this._tileToOverrideRegionCount[hexSummaryEntry.tile];
    if (!numRegions) {
      numRegions = hexSummaryEntry.regions.length;
    }
    const [cx, cy, avail] = this._numRegionsToCenters[numRegions][regionIndex];
    x += (cx / 2 + 0.5) * this._tileWidth;
    y += (cy / 2 + 0.5) * this._tileWidth;

    // x is center, start units to left.
    if (drawEntries.length > 1) {
      x -= ((drawEntries.length - 1) * this._deltaX) / 2;
    }

    // If space only and not already shifted, shift a little so as not to obscure wormholes.
    if (
      hexSummaryEntry.regions.length === 1 &&
      regionIndex === 0 &&
      drawEntries.length <= 2
    ) {
      x -= this._deltaX * 2;
    }

    const unitY = y - this._unitSize / 2;
    const textY = y + this._textY;

    for (const drawEntry of drawEntries) {
      console.assert(drawEntry.imageSrc);
      console.assert(drawEntry.count > 0);

      const colorHex = drawEntry.colorName
        ? GameDataUtil.colorNameToHex(drawEntry.colorName)
        : "#ffffff";

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
}
