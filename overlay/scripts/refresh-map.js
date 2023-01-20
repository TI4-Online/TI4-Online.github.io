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
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }
    this._mapUtil = new MapUtil(this._canvas);
    this._gamedata = undefined;

    // This is somewhat expensive, update on a slower timer.
    const updateSeconds = 15;
    if (updateSeconds > 0) {
      setInterval(() => {
        if (this._gamedata) {
          this.update(this._gamedata);
          this._gamedata = undefined;
        }
      }, updateSeconds * 1000);
    }

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this._gamedata = event.data.detail;
        if (updateSeconds <= 0) {
          this.update(this._gamedata);
        }
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const hexSummary = GameDataUtil.parseHexSummary(gameData);

    // Fix locations.
    const { tileWidth, tileHeight, canvasWidth, canvasHeight } =
      this._mapUtil.getSizes();
    const scaleX = (tileWidth * 3) / 4;
    const scaleY = tileHeight / 2;
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

      entry.x = canvasWidth / 2 + entry.x * scaleX;
      entry.y = canvasHeight / 2 - entry.y * scaleY;
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
