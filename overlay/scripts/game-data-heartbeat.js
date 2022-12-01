class GameDataHeartbeat {
  static getInstance() {
    if (!GameDataHeartbeat.__instance) {
      GameDataHeartbeat.__instance = new GameDataHeartbeat();
    }
    return GameDataHeartbeat.__instance;
  }

  constructor() {
    this._history = [];
    this._historyWindowSeconds = 600;

    window.addEventListener("onGameDataUpdate", (event) => {
      this._add(1);
      this._update();
    });
    window.addEventListener("onGameDataError", (event) => {
      this._add(-1);
      this._update();
    });
    window.addEventListener("onGameDataNotModified", (event) => {
      this._add(0);
      this._update();
    });
  }

  setDiv(div) {
    this._div = div;
    this._update();
    return this;
  }

  _clearOld() {
    const now = Date.now() / 1000;
    const cutoff = now - this._historyWindowSeconds;
    while (this._history.length > 0 && this._history[0].timestamp < cutoff) {
      this._history.shift();
    }
  }

  _add(status) {
    this._clearOld();
    const timestamp = Date.now() / 1000;
    this._history.push({
      timestamp,
      status,
    });
  }

  _update() {
    this._clearOld();
    if (!this._div) {
      return;
    }
    this._div.innerText = JSON.stringify(this._history);
  }
}

window.addEventListener("DOMContentLoaded", (window, event) => {
  const div = document.getElementById("game-data-heartbeat");
  if (!div) {
    console.error("GameDataHeartbeat: missing 'game-data-heartbeat' element");
    return;
  }
  GameDataHeartbeat.getInstance().setDiv(div);
});
