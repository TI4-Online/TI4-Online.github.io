"use strict";

/**
 * Fill the canvas id "game-data-heartbeat" with GameData heath graph.
 * If the canvas has a (0,0) size, resize to match parent element.
 */
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

    this._scale = 2;
    this._historyWindowSeconds = 180;
    this._updateSeconds = 3;

    this._status = "stopped";
    this._statusColor = "gray";

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "START") {
        this._status = "active";
        this._statusColor = "white";
        this._update();
      } else if (event.data.type === "UPDATE") {
        this._status = "active";
        this._statusColor = "white";
        this._add(1);
        this._update();
      } else if (event.data.type === "NOT_MODIFIED") {
        this._status = "active";
        this._statusColor = "white";
        this._add(0);
        this._update();
      } else if (event.data.type === "ERROR") {
        this._status = event.data.detail;
        this._statusColor = "red";
        this._add(-1);
        this._update();
      } else if (event.data.type === "STOP") {
        this._status = "stopped";
        this._statusColor = "gray";
        this._update();
      }
    };

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
    // Resize to fit parent?
    if (canvas.width === 0 && canvas.height === 0) {
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.offsetHeight;
    }

    // Record canvas and (unscaled) size.
    this._canvas = canvas;
    this._w = canvas.width;
    this._h = canvas.height;

    // Set CSS for "real" size, then scale for anti-aliasing.
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    canvas.width *= this._scale;
    canvas.height *= this._scale;

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
    ctx.save();
    try {
      ctx.scale(this._scale, this._scale);

      const w = this._w;
      const h = this._h;
      const now = Date.now() / 1000;

      const labelWidth = 77;
      const labelX = w - labelWidth;
      const dataX = 4;
      const dataWidth = labelX - dataX * 2;

      const statusToY = {
        header: Math.floor(h / 6),
        1: Math.floor((h * 2) / 6),
        0: Math.floor((h * 3) / 6),
        "-1": Math.floor((h * 4) / 6),
        footer: Math.floor((h * 5) / 6),
      };
      const statusToColor = {
        "-1": "red",
        0: "yellow",
        1: "green",
      };

      // Clear.
      ctx.clearRect(0, 0, w, h);

      ctx.font = "600 12px Open Sans, sans-serif";

      // Title.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this._statusColor;
      ctx.fillText(`Gamedata: ${this._status}`, w / 2, statusToY.header);

      // Y axis labels.
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = statusToColor[-1];
      ctx.fillText("error", labelX, statusToY[-1]);
      ctx.fillStyle = statusToColor[0];
      ctx.fillText("not-modified", labelX, statusToY[0]);
      ctx.fillStyle = statusToColor[1];
      ctx.fillText("update", labelX, statusToY[1]);

      // X axis labels (track minutes).
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const dSeconds = new Date(now * 1000).getSeconds();
      for (let i = -1; i <= this._historyWindowSeconds / 60; i++) {
        const timestamp = now - dSeconds - i * 60;
        const u = 1 - (now - timestamp) / this._historyWindowSeconds;
        if (u > 1.03) {
          continue; // draw text a little off to the right, but not TOO much
        }
        const date = new Date(Math.floor(timestamp * 1000));
        const str = date.toTimeString().substring(0, 5);
        const x = dataX + u * dataWidth;
        const y = statusToY.footer;
        ctx.fillText(str, x, y);
      }

      // Draw a background line tracking points.
      ctx.lineWidth = 1;
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      let lastY = undefined;
      for (const entry of this._history) {
        const u = 1 - (now - entry.timestamp) / this._historyWindowSeconds;
        const x = dataX + u * dataWidth;
        const y = statusToY[entry.status];
        if (lastY === undefined) {
          ctx.moveTo(dataX, y);
        }
        ctx.lineTo(x, y);
        lastY = y;
      }
      if (lastY !== undefined) {
        ctx.lineTo(dataX + dataWidth, lastY);
      }
      ctx.stroke();

      // Draw status colors.
      const r = 2;
      for (const entry of this._history) {
        const u = 1 - (now - entry.timestamp) / this._historyWindowSeconds;
        const x = dataX + u * dataWidth;
        const y = statusToY[entry.status];

        ctx.fillStyle = statusToColor[entry.status];
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.fill();
      }
    } finally {
      ctx.restore();
    }
  }
}

window.addEventListener("DOMContentLoaded", (window, event) => {
  const canvas = document.getElementById("heartbeat");
  if (!canvas) {
    console.error("GameDataHeartbeat: missing 'heartbeat' element");
    return;
  }
  GameDataHeartbeat.getInstance().setDiv(canvas);
});
