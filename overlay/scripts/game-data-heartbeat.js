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
      this._update();

      // Stop when history empties.
      if (this._history.length === 0) {
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

    const statusToY = {
      "-1": Math.floor((h * 3) / 5),
      0: Math.floor((h * 2) / 5),
      1: Math.floor(h / 5),
    };
    const statusToColor = {
      "-1": "red",
      0: "yellow",
      1: "green",
    };

    // Clear.
    ctx.clearRect(0, 0, w, h);

    // Labels.
    const labelY = Math.floor((h * 4) / 5) + 4;
    ctx.font = "bold 13px Arial, Helvetica, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = statusToColor[-1];
    ctx.fillText("error", (w * 3) / 4, labelY);
    ctx.fillStyle = statusToColor[0];
    ctx.fillText("not-modified", w / 2, labelY);
    ctx.fillStyle = statusToColor[1];
    ctx.fillText("update", w / 4, labelY);

    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("now", 4, labelY);
    ctx.textAlign = "right";
    ctx.fillText(`${this._historyWindowSeconds / 60} min`, w - 4, labelY);

    // Draw a background line.
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
    ctx.beginPath();
    let lastY = undefined;
    for (const entry of this._history) {
      const age = now - entry.timestamp;
      const x = Math.floor((age * w) / this._historyWindowSeconds);
      const y = statusToY[entry.status];
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
      const y = statusToY[entry.status];

      ctx.fillStyle = statusToColor[entry.status];
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
