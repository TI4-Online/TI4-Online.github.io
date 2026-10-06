"use strict";

class Bottombar {
  static getInstance() {
    if (!Bottombar.__instance) {
      Bottombar.__instance = new Bottombar();
    }
    return Bottombar.__instance;
  }

  constructor() {
    this._lastSimplified = undefined;
    this._marginPctW = 0.005;

    const elementId = "bottombar-canvas";
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    this._margin = Math.ceil(this._canvas.width * this._marginPctW);

    new BroadcastChannel("onSimplifiedGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this._lastSimplified = event.data.detail;
        this.update(event.data.detail);
      }
    };
  }

  update(simplified) {
    const sc = new SceneComponentsSafe(this._canvas);
    //const sc = new SceneComponents(this._canvas);
    sc.fill();

    const box = {
      x: 0,
      y: 0,
      w: this._canvas.width,
      h: this._canvas.height,
    };

    const rowH = (box.h - this._margin * 3) / 2;
    SceneComponents.reserveVertical(box, this._margin);
    const topRow = SceneComponents.reserveVertical(box, rowH);
    SceneComponents.reserveVertical(box, this._margin);
    const botRow = SceneComponents.reserveVertical(box, rowH);

    // Sizing used 6p layout, might be slighly off for other counts.
    const topCount = simplified.seatLayout.top.length;
    const boxCount = simplified.seatLayout.bottom.length;
    const topW = (topRow.w - this._margin * (topCount + 1)) / topCount;
    const botW = (botRow.w - this._margin * (boxCount + 1)) / boxCount;

    for (const playerColor of simplified.seatLayout.top) {
      SceneComponents.reserveHorizontal(topRow, this._margin);
      const resBox = SceneComponents.reserveHorizontal(topRow, topW);
      sc.drawPlayerResources(resBox, playerColor, simplified);
    }
    for (const playerColor of simplified.seatLayout.bottom) {
      SceneComponents.reserveHorizontal(botRow, this._margin);
      const resBox = SceneComponents.reserveHorizontal(botRow, botW);
      sc.drawPlayerResources(resBox, playerColor, simplified);
    }
  }
}

window.addEventListener("load", () => {
  Bottombar.getInstance();
});
