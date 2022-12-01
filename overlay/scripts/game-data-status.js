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
    this._update();

    window.addEventListener("onGameDataStart", (event) => {
      this._status = "active";
      this._update();
    });

    window.addEventListener("onGameDataError", (event) => {
      this._status = event.detail;
      this._update();
    });

    window.addEventListener("onGameDataUpdate", (event) => {
      this._status = "active";
      this._update();
    });

    window.addEventListener("onGameDataStop", (event) => {
      if (this._status === "active") {
        this._status = "stopped";
      }
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
    console.log(`GameDataStatus._update "${this._status}"`);
    this._div.innerText = `Auto-refresh status:\n${this._status}`;
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
