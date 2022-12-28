"use strict";

class Timer {
  static getInstance() {
    if (!Timer.__instance) {
      Timer.__instance = new Timer();
    }
    return Timer.__instance;
  }

  constructor() {
    const elementId = "timer";
    this._div = document.getElementById(elementId);
    if (!this._div) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    // XXX TODO

    this._div.innerText = ``;
  }
}

window.addEventListener("load", () => {
  Timer.getInstance();
});
