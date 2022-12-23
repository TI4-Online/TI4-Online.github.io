"use strict";

class Map {
  static getInstance() {
    if (!Map.__instance) {
      Map.__instance = new Map();
    }
    return Map.__instance;
  }

  constructor() {
    const elementId = "map";
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    if (this._canvas.width === 0 && this._canvas.height === 0) {
      // Size slightly smaller to prevent growing table size, then pad
      const w = this._canvas.parentNode.offsetWidth - 4 - 10;
      const h = this._canvas.parentNode.offsetHeight - 4 - 10;
      this._canvas.style.width = `${w}px`;
      this._canvas.style.height = `${h}px`;
      this._canvas.width = w * 2;
      this._canvas.height = h * 2;
    }

    this._tileToImage = {};

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

    const hexSummary = GameDataUtil.parseHexSummary(gameData);

    const tile = this._getTileImage(18);

    const ctx = this._canvas.getContext("2d");
    ctx.drawImage(tile, 300, 300);
  }

  _getTileImage(tile) {
    let image = this._tileToImage[tile];
    if (!image) {
      image = new Image();
      image.src = ImageUtil.getSrc(
        `tiles/tile_${String(tile).padStart(3, "0")}.png`
      );
      this._tileToImage[tile] = image;
    }
    return image;
  }
}

window.addEventListener("load", () => {
  Map.getInstance();
});
