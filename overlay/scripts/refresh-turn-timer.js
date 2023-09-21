"use strict";

class TurnTimer {
  static getInstance() {
    if (!TurnTimer.__instance) {
      TurnTimer.__instance = new TurnTimer();
    }
    return TurnTimer.__instance;
  }

  constructor() {
    const elementId = "turn-timer";
    this._div = document.getElementById(elementId);
    if (!this._div) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    this._display = undefined;
    this._anchorTimestamp = undefined;
    this._anchorValue = undefined;
    this._timerValue = undefined;
    this._active = undefined;

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };

    setInterval(() => {
      this.update();
    }, 1000);
  }

  update(gameData) {
    if (gameData) {
      console.assert(typeof gameData === "object");

      const timer = GameDataUtil.parseTurnTimer(gameData);
      this._display = timer.display;
      this._anchorTimestamp = timer.anchorTimestamp;
      this._anchorValue = timer.anchorValue;
      this._timerValue = timer.timerValue;
      this._active = timer.active;
    }

    const anchorTimestamp = this._anchorTimestamp || 0;
    const anchorValue = this._anchorValue || 0;
    const timerValue = this._timerValue || 0;
    const active = this._active;

    const now = Date.now();
    const delta = (now - anchorTimestamp) / 1000;
    const value = anchorValue + delta;
    let display = Math.floor(timerValue > 0 ? timerValue - value : value);
    const sign = display >= 0 ? "" : "-";
    display = Math.abs(display);
    if (!active) {
      display = this._display;
    }
    let minutes = Math.floor(display / 60);
    let seconds = display % 60;
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    const text = `${sign}${minutes}:${seconds}`;

    this._div.innerText = text;
  }
}

window.addEventListener("load", () => {
  TurnTimer.getInstance();
});
