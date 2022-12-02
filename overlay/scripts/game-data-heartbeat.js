class GameDataHeartbeat {
  static getInstance() {
    if (!GameDataHeartbeat.__instance) {
      GameDataHeartbeat.__instance = new GameDataHeartbeat();
    }
    return GameDataHeartbeat.__instance;
  }

  constructor() {
    this._canvas = undefined;
    this._history = [];
    this._historyWindowSeconds = 180;
    this._updateSeconds = 1;

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

    this._doUpdate = () => {
      this._clearOld();

      // Stop when history empties.
      if (this._history.length > 0) {
        this._update();
      } else {
        console.log("GameDataHeartbeat stopping interval");
        clearInterval(this._updateHandle);
        this._updateHandle = undefined;
        return;
      }
    };
  }

  setDiv(canvas) {
    // Resize to fit parent.
    canvas.width = canvas.parentNode.offsetWidth - 4;
    canvas.height = canvas.parentNode.offsetHeight - 4;

    this._canvas = canvas;
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
    const timestamp = Date.now() / 1000;
    this._history.push({
      timestamp,
      status,
    });
    // Start periodic updates if not running.
    if (this._history.length > 0 && !this._updateHandle) {
      console.log("GameDataHeartbeat starting interval");
      this._updateHandle = setInterval(
        this._doUpdate,
        this._updateSeconds * 1000
      );
    }
  }

  _update() {
    if (!this._canvas) {
      return;
    }
    if (!this._canvas.getContext) {
      return; // browser does not support canvas
    }
    const ctx = this._canvas.getContext("2d");
    const w = this._canvas.width;
    const h = this._canvas.height;
    const now = Date.now() / 1000;

    ctx.clearRect(0, 0, w, h);

    // Draw a background line.
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.beginPath();
    let lastY = undefined;
    for (const entry of this._history) {
      const age = now - entry.timestamp;
      const x = Math.floor((age * w) / this._historyWindowSeconds);
      const y = Math.floor(h / 2 - (h / 4) * entry.status);
      if (lastY === undefined) {
        ctx.moveTo(w, y);
        lastY = y;
      }
      ctx.lineTo(x, y);
    }
    if (lastY !== undefined) {
      ctx.lineTo(0, lastY);
    }
    ctx.stroke();

    // Draw status colors.
    const r = 2;
    for (const entry of this._history) {
      const age = now - entry.timestamp;
      const x = Math.floor((age * w) / this._historyWindowSeconds);
      const y = Math.floor(h / 2 - (h / 4) * entry.status);

      let color;
      if (entry.status === -1) {
        color = "rgb(255,0,0";
      } else if (entry.status === 0) {
        color = "rgb(255,255,0)";
      } else if (entry.status === 1) {
        color = "rgb(0,255,0)";
      }

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
}

window.addEventListener("DOMContentLoaded", (window, event) => {
  const canvas = document.getElementById("game-data-heartbeat");
  if (!canvas) {
    console.error("GameDataHeartbeat: missing 'game-data-heartbeat' element");
    return;
  }
  GameDataHeartbeat.getInstance().setDiv(canvas);
});
