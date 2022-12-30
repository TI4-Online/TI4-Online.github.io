"use strict";

class Map {
  static getInstance() {
    if (!Map.__instance) {
      Map.__instance = new Map();
    }
    return Map.__instance;
  }

  constructor(overrideTileWidth) {
    const elementId = "map";
    const canvas = document.getElementById(elementId);
    if (!canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }
    this._mapUtil = new MapUtil(canvas);

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

    const hexSummary = GameDataUtil.parseHexSummary(gameData);

    // Fix locations.
    const { tileWidth, tileHeight, canvasWidth, canvasHeight } =
      this._mapUtil.getSizes();
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

      entry.x = canvasWidth / 2 + (entry.x * tileWidth * 3) / 4;
      entry.y = canvasHeight / 2 - (entry.y * tileHeight) / 2;
    }

    this._mapUtil.clear();

    // Draw tiles first.
    for (const entry of hexSummary) {
      this._mapUtil.drawTile(entry.x, entry.y, entry);
    }

    for (const entry of hexSummary) {
      this._mapUtil.drawCommandTokens(entry.x, entry.y, entry);
    }

    // Draw occupants (may overflow tile)
    for (const entry of hexSummary) {
      for (
        let regionIndex = 0;
        regionIndex < entry.regions.length;
        regionIndex++
      ) {
        this._mapUtil.drawOccupants(entry.x, entry.y, entry, regionIndex);
      }
    }
  }
}

window.addEventListener("load", () => {
  Map.getInstance();
});
