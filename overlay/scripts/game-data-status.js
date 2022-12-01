/**
 * Fill the div id "game-data-status" with GameData status
 */
class GameDataStatus {
  static getInstance() {
    if (!GameDataStatus.__instance) {
      GameDataStatus.__instance = new GameDataStatus();
    }
    return GameDataStatus.__instance;
  }

  constructor() {
    this._status = "unknown";

    window.addEventListener("onGameDataError", (event) => {
      const msg = `${event.detail}`;
      if (msg.toLowerCase().includes("failed to fetch")) {
        this._status =
          "Error: Local server (TI4 Streamer Buddy) not responding";
      } else {
        this._status = `Error: ${msg}`;
      }
      this._update();
    });

    window.addEventListener("onGameDataUpdate", (event) => {
      this._status = "active";
      this._update();
    });
  }

  setDiv(div) {
    this._div = div;
    this._update();
    return this;
  }

  _update() {
    if (!this._div) {
      return;
    }
    this._div.innerText = this._status;
  }
}

window.addEventListener("DOMContentLoaded", (window, event) => {
  const div = document.getElementById("game-data-status");
  if (!div) {
    console.error("GameDataStatus: missing 'game-data-status' element");
    return;
  }
  GameDataStatus.getInstance().setDiv(div);
});
