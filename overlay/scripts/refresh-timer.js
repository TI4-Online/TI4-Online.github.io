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

    this._anchorTimestamp = undefined;
    this._anchorSeconds = undefined;
    this._anchorDirection = undefined;

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };

    // D
    setInterval(() => {
      this.update();
    }, 1000);
  }

  update(gameData) {
    const now = Math.floor(Date.now() / 1000);

    if (gameData) {
      console.assert(typeof gameData === "object");

      const timer = GameDataUtil.parseTimer(gameData);
      this._anchorTimestamp = timer.anchorTimestamp;
      this._anchorSeconds = timer.anchorSeconds;
      this._anchorDirection = timer.direction;
    }

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (this._anchorTimestamp) {
      const deltaSeconds = now - this._anchorTimestamp;
      const timerSeconds = Math.max(
        this._anchorSeconds + deltaSeconds * this._anchorDirection,
        0
      );

      hours = Math.floor(timerSeconds / 3600);
      minutes = Math.floor((timerSeconds % 3600) / 60);
      seconds = Math.floor(timerSeconds % 60);
    }

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    this._div.innerText = `${hours}:${minutes}:${seconds}`;
  }
}

window.addEventListener("load", () => {
  Timer.getInstance();
});
