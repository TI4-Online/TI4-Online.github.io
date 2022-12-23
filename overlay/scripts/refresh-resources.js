"use strict";

class Resources {
  static getInstance() {
    if (!Resources.__instance) {
      Resources.__instance = new Resources();
    }
    return Resources.__instance;
  }

  static drawOne(canvas, scale, playerData) {
    console.assert(canvas);
    console.assert(typeof scale === "number");
    console.assert(playerData);

    const ctx = canvas.getContext("2d");
    ctx.save();
    try {
      const w = ctx;
    } finally {
      ctx.restore();
    }
  }

  constructor() {
    this._playerCanvases = [];

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  getCanvases(playerCount) {
    console.assert(typeof playerCount === "number");

    if (this._playerCanvases.length === playerCount) {
      return this._playerCanvases;
    }

    const upper = [
      document.getElementById("resources-0-0"),
      document.getElementById("resources-0-1"),
      document.getElementById("resources-0-2"),
      document.getElementById("resources-0-3"),
    ];
    const lower = [
      document.getElementById("resources-1-3"),
      document.getElementById("resources-1-2"),
      document.getElementById("resources-1-1"),
      document.getElementById("resources-1-0"),
    ];

    const lowerCount = Math.min(Math.floor(playerCount / 2), 4);
    const upperCount = Math.min(Math.ceil(playerCount / 2), 4);

    // Extract the leaderboard cells, clockwise from
    // lower right.
    let tds = [];
    tds.push(...lower.slice(0, lowerCount));
    tds.push(...upper.slice(0, upperCount));
    tds = tds.filter((cell) => cell); // so tests can use a single cell
    tds.forEach((cell) => {
      cell.style.display = "";
    });

    // Any unused cells should be hidden.
    let hide = [];
    hide.push(...lower.slice(lowerCount));
    hide.push(...upper.slice(upperCount));
    hide = hide.filter((cell) => cell);
    hide.forEach((cell) => {
      cell.style.display = "none";
    });

    // Convert result the to canvas elements inside, keep for fast lookup.
    this._playerCanvases = tds.map((td) => {
      const canvas = td.getElementsByClassName("resources-canvas")[0];
      console.assert(canvas);
      return canvas;
    });

    // Set canvas size to match parent, but 2x internal canvas size.
    for (const canvas of this._playerCanvases) {
      if (canvas.width === 0 && canvas.height === 0) {
        // Size slightly smaller to prevent growing table size, then pad
        const w = canvas.parentNode.offsetWidth - 4 - 10;
        const h = canvas.parentNode.offsetHeight - 4 - 10;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.width = w * 2;
        canvas.height = h * 2;
      }
    }

    return this._playerCanvases;
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    console.assert(Array.isArray(playerDataArray));
    const playerCount = playerDataArray.length;

    const canvases = this.getCanvases(playerCount);
    canvases.forEach((canvas, index) => {
      const playerData = playerDataArray[index];
      console.assert(playerData);

      DrawPlayerResources.getInstance().draw(
        canvas,
        {
          left: 0,
          top: 0,
          width: canvas.width,
          height: canvas.height,
        },
        playerData
      );
    });
  }
}

window.addEventListener("load", () => {
  const elementId = "";

  Resources.getInstance();
});
