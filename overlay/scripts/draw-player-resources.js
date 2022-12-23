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
      commodity: "tokens/commodity_1.png",
      tradegood: "tokens/tradegood_1.png",
    };

    for (const [key, path] of Object.entries(this._image)) {
      this._image[key] = new Image();
      this._image[key].src = ImageUtil.getSrc(path);
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
    const colorName = colorNameAndHex.colorName;

    const resources = GameDataUtil.parsePlayerResources(playerData);

    const ctx = canvas.getContext("2d");
    ctx.save();
    try {
      this._clear(ctx, boundingBox);
      this._drawPlayerSheets(ctx, boundingBox, colorName);
      this._drawLeaders(ctx, boundingBox, resources);
      this._drawTokens(ctx, boundingBox, resources);
      this._drawCommodities(ctx, boundingBox, resources);
      this._drawTradegoods(ctx, boundingBox, resources);
      this._drawUnitUpgrades(ctx, boundingBox, playerData);
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

  _drawPlayerSheets(ctx, boundingBox, colorName) {
    // Unfortunately there is no simple tint.  We could get the raw RGBA and manually
    // multiply and cache, but assume native operations will be fast.
    // https://angel-rs.github.io/css-color-filter-generator/
    const colorNameToFilter = {
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
    };

    const filter = colorNameToFilter[colorName];

    ctx.save();
    ctx.filter = filter;
    ctx.drawImage(
      this._image.playerSheetsMask,
      boundingBox.left,
      boundingBox.top,
      boundingBox.width,
      boundingBox.height
    );
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(
      this._image.playerSheets,
      boundingBox.left,
      boundingBox.top,
      boundingBox.width,
      boundingBox.height
    );
    ctx.restore();
  }

  _drawLeaders(ctx, boundingBox, resources) {}

  _drawTokens(ctx, boundingBox, resources) {}

  _drawCommodities(ctx, boundingBox, resources) {
    const center = {
      x: boundingBox.left + boundingBox.width * 0.636,
      y: boundingBox.top + boundingBox.height * 0.66,
    };

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    const tokenSize = Math.floor(boundingBox.width * 0.06);
    const tokenX = center.x - tokenSize * 1.1;
    const tokenY = center.y - tokenSize / 2;

    const fontSize = Math.floor(boundingBox.width * 0.1);
    const textBumpY = Math.floor(boundingBox.width * 0.004);
    const textX = center.x + tokenSize * 0.1;
    const textY = center.y + textBumpY;

    ctx.filter = "brightness(150%)";
    ctx.drawImage(this._image.commodity, tokenX, tokenY, tokenSize, tokenSize);
    ctx.filter = undefined;

    ctx.font = `800 ${fontSize}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.lineWidth = Math.floor(fontSize * 0.15);
    ctx.strokeText(resources.commodities, textX, textY);
    ctx.fillText(resources.commodities, textX, textY);
  }

  _drawTradegoods(ctx, boundingBox, resources) {
    const center = {
      x: boundingBox.left + boundingBox.width * 0.77,
      y: boundingBox.top + boundingBox.height * 0.78,
    };

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    const tokenSize = Math.floor(boundingBox.width * 0.06);
    const tokenX = center.x - tokenSize * 1.1;
    const tokenY = center.y - tokenSize / 2;

    const fontSize = Math.floor(boundingBox.width * 0.1);
    const textBumpY = Math.floor(boundingBox.width * 0.004);
    const textX = center.x + tokenSize * 0.1;
    const textY = center.y + textBumpY;

    ctx.filter = "brightness(150%)";
    ctx.drawImage(this._image.tradegood, tokenX, tokenY, tokenSize, tokenSize);
    ctx.filter = undefined;

    ctx.font = `800 ${fontSize}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.lineWidth = Math.floor(fontSize * 0.15);
    ctx.strokeText(resources.tradegoods, textX, textY);
    ctx.fillText(resources.tradegoods, textX, textY);
  }

  _drawUnitUpgrades(ctx, boundingBox, playerData) {}
}
