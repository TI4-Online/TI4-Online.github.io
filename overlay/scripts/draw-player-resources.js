"use strict";

class DrawPlayerResources {
  static get DEFAULT_WIDTH() {
    return 1310;
  }
  static get DEFAULT_HEIGHT() {
    return 512;
  }

  static getInstance() {
    if (!DrawPlayerResources.__instance) {
      DrawPlayerResources.__instance = new DrawPlayerResources();
    }
    return DrawPlayerResources.__instance;
  }

  /**
   * Constructor.
   */
  constructor() {
    this._image = {
      playerSheets: "sheets/player-sheets.png",
      playerSheetsMask: "sheets/player-sheets-mask.png",

      // Economy.
      commodity: "tokens/commodity_1.png",
      tradegood: "tokens/tradegood_1.png",

      // Units.
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

      // Planet resources.
      resources: "symbols/resources.png",
      influence: "symbols/influence.png",

      commandToken: "units/unit_t_Command_Token.png",
    };

    // Replace path with src.
    for (const [key, path] of Object.entries(this._image)) {
      this._image[key] = ImageUtil.getSrc(path);
    }
  }

  draw(canvas, boundingBox, playerData) {
    console.assert(canvas);
    console.assert(typeof boundingBox.left === "number");
    console.assert(typeof boundingBox.top === "number");
    console.assert(typeof boundingBox.width === "number");
    console.assert(typeof boundingBox.height === "number");
    console.assert(playerData);

    const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
    const colorHex = colorNameAndHex.colorHex;

    const resources = GameDataUtil.parsePlayerResources(playerData);
    const unitUpgrades = GameDataUtil.parsePlayerUnitUpgrades(playerData);

    const ctx = canvas.getContext("2d");
    ctx.save();
    try {
      this._clear(ctx, boundingBox);
      this._drawPlayerSheets(ctx, boundingBox, colorHex);

      this._drawUnitUpgrades(ctx, boundingBox, colorHex, unitUpgrades);

      this._drawLeaders(ctx, boundingBox, resources);
      this._drawTokens(ctx, boundingBox, colorHex, resources);
      this._drawCommodities(ctx, boundingBox, resources);
      this._drawTradegoods(ctx, boundingBox, resources);
      this._drawPlanetResources(ctx, boundingBox, resources);
      this._drawPlanetInfluence(ctx, boundingBox, resources);
    } finally {
      ctx.restore();
    }
  }

  _clear(ctx, boundingBox) {
    console.assert(ctx);
    console.assert(boundingBox);

    ctx.clearRect(
      boundingBox.left,
      boundingBox.top,
      boundingBox.width,
      boundingBox.height
    );
  }

  _drawTokenAndText(
    ctx,
    boundingBox,
    center,
    tokenImage,
    text,
    optionalTintColor
  ) {
    const tokenSize = Math.floor(boundingBox.width * 0.06);
    const tokenX = center.x - tokenSize;
    const tokenY = center.y - tokenSize / 2;

    const fontSize = Math.floor(boundingBox.width * 0.075);
    const textBumpY = Math.floor(boundingBox.width * 0.004);
    const textX = center.x + tokenSize * 0.1;
    const textY = center.y + textBumpY;

    ImageUtil.drawMagic(ctx, tokenImage, tokenX, tokenY, {
      width: tokenSize,
      height: tokenSize,
      tintColor: optionalTintColor,
      filter: "brightness(150%)",
      shadowWidth: tokenSize * 0.1,
      shadowColor: "black",
    });

    ctx.save();
    ctx.font = `800 ${fontSize}px Open Sans, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.lineWidth = Math.floor(fontSize * 0.15);
    ctx.strokeText(text, textX, textY);
    ctx.fillText(text, textX, textY);
    ctx.restore();
  }

  _drawPlayerSheets(ctx, boundingBox, colorHex) {
    ImageUtil.drawMagic(
      ctx,
      this._image.playerSheets,
      boundingBox.left,
      boundingBox.top,
      {
        width: boundingBox.width,
        height: boundingBox.height,
        tintColor: colorHex,
        filter: "brightness(120%)",
      }
    );
  }

  _drawLeaders(ctx, boundingBox, resources) {
    const fontSize = Math.floor(boundingBox.width * 0.075);

    const agent = {
      x: boundingBox.left + boundingBox.width * 0.1,
      y: boundingBox.top + boundingBox.height * 0.15,
      text: resources.leaders?.commander?.substring(0, 1).toUpperCase() || "?",
    };
    const commander = {
      x: boundingBox.left + boundingBox.width * 0.1,
      y: boundingBox.top + boundingBox.height * 0.39,
      text: resources.leaders?.commander?.substring(0, 1).toUpperCase() || "?",
    };
    const hero = {
      x: boundingBox.left + boundingBox.width * 0.1,
      y: boundingBox.top + boundingBox.height * 0.63,
      text: resources.leaders?.hero?.substring(0, 1).toUpperCase() || "?",
    };

    ctx.save();
    ctx.font = `800 ${fontSize}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.lineWidth = Math.floor(fontSize * 0.15);

    ctx.strokeText(agent.text, agent.x, agent.y);
    ctx.fillText(agent.text, agent.x, agent.y);

    ctx.strokeText(commander.text, commander.x, commander.y);
    ctx.fillText(commander.text, commander.x, commander.y);

    ctx.strokeText(hero.text, hero.x, hero.y);
    ctx.fillText(hero.text, hero.x, hero.y);

    ctx.restore();
  }

  _drawTokens(ctx, boundingBox, colorHex, resources) {
    let center = {
      x: boundingBox.left + boundingBox.width * 0.77,
      y: boundingBox.top + boundingBox.height * 0.2,
    };
    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.commandToken,
      resources.tokens.tactics,
      colorHex
    );

    center = {
      x: boundingBox.left + boundingBox.width * 0.86,
      y: boundingBox.top + boundingBox.height * 0.35,
    };
    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.commandToken,
      resources.tokens.fleet,
      colorHex
    );

    center = {
      x: boundingBox.left + boundingBox.width * 0.86,
      y: boundingBox.top + boundingBox.height * 0.63,
    };
    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.commandToken,
      resources.tokens.strategy,
      colorHex
    );
  }

  _drawCommodities(ctx, boundingBox, resources) {
    const center = {
      x: boundingBox.left + boundingBox.width * 0.636,
      y: boundingBox.top + boundingBox.height * 0.66,
    };

    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.commodity,
      resources.commodities
    );
  }

  _drawTradegoods(ctx, boundingBox, resources) {
    const center = {
      x: boundingBox.left + boundingBox.width * 0.77,
      y: boundingBox.top + boundingBox.height * 0.78,
    };

    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.tradegood,
      resources.tradegoods
    );
  }

  _drawPlanetResources(ctx, boundingBox, resources) {
    const center = {
      x: boundingBox.left + boundingBox.width * 0.5,
      y: boundingBox.top + boundingBox.height * 0.18,
    };

    const text = `${resources.resources.avail}/${resources.resources.total}`;

    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.resources,
      text
    );
  }

  _drawPlanetInfluence(ctx, boundingBox, resources) {
    const center = {
      x: boundingBox.left + boundingBox.width * 0.5,
      y: boundingBox.top + boundingBox.height * 0.4,
    };

    const text = `${resources.influence.avail}/${resources.influence.total}`;

    this._drawTokenAndText(
      ctx,
      boundingBox,
      center,
      this._image.influence,
      text
    );
  }
  _drawUnitUpgrades(ctx, boundingBox, colorHex, unitUpgrades) {
    const unitSize = boundingBox.width * 0.1;
    const drawUnit = (x, y, unitName) => {
      const img = this._image[unitName];
      console.assert(img);

      const has = unitUpgrades.includes(unitName);

      const unitX = x - unitSize / 2;
      const unitY = y - unitSize / 2;
      ImageUtil.drawMagic(ctx, img, unitX, unitY, {
        width: unitSize,
        height: unitSize,
        shadowColor: has ? "black" : "white",
        shadowWidth: unitSize * 0.05,
        color: has ? colorHex : "black",
      });
    };

    let x = boundingBox.left + boundingBox.width * 0.235;
    let y = boundingBox.top + boundingBox.height * 0.18;
    drawUnit(x, y, "flagship");

    y = boundingBox.top + boundingBox.height * 0.4;
    drawUnit(x, y, "war_sun");

    y = boundingBox.top + boundingBox.height * 0.625;
    drawUnit(x, y, "dreadnought");

    y = boundingBox.top + boundingBox.height * 0.85;
    drawUnit(x, y, "carrier");

    x = boundingBox.left + boundingBox.width * 0.36;
    y = boundingBox.top + boundingBox.height * 0.39;
    drawUnit(x, y, "cruiser");

    y = boundingBox.top + boundingBox.height * 0.62;
    drawUnit(x, y, "destroyer");

    y = boundingBox.top + boundingBox.height * 0.83;
    drawUnit(x, y, "fighter");

    x = boundingBox.left + boundingBox.width * 0.495;
    y = boundingBox.top + boundingBox.height * 0.62;
    drawUnit(x, y, "pds");

    y = boundingBox.top + boundingBox.height * 0.84;
    drawUnit(x, y, "infantry");

    x = boundingBox.left + boundingBox.width * 0.62;
    y = boundingBox.top + boundingBox.height * 0.835;
    drawUnit(x, y, "space_dock");

    x = boundingBox.left + boundingBox.width * 0.1;
    y = boundingBox.top + boundingBox.height * 0.86;
    drawUnit(x, y, "mech");
  }
}
