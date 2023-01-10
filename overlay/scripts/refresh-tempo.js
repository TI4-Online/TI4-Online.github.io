"use strict";

class Tempo {
  static getInstance() {
    if (!Tempo.__instance) {
      Tempo.__instance = new Tempo();
    }
    return Tempo.__instance;
  }

  constructor() {
    const elementId = "tempo";
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    if (this._canvas.width === 0 && this._canvas.height === 0) {
      // Size slightly smaller to prevent growing table size, then pad
      const w = this._canvas.parentNode.offsetWidth - 4;
      const h = this._canvas.parentNode.offsetHeight - 4;
      this._canvas.style.width = `${w}px`;
      this._canvas.style.height = `${h}px`;
      this._canvas.width = w * 2;
      this._canvas.height = h * 2;
    }

    // Keep a memory of history; reloading the game or restarting scripting may
    // "forget" history.
    this._roundToPlayerColorNameToScore = {};

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const playerColorNamesAndHexValues = playerDataArray.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    const colorNames = playerColorNamesAndHexValues.map(
      (colorNameAndHex) => colorNameAndHex.colorName
    );

    const scoreboard = GameDataUtil.parseScoreboard(gameData);
    const currentRound = GameDataUtil.parseRound(gameData);
    const roundToStartOfRoundGameData =
      GameDataUtil.parseRoundToStartOfRoundGameData(gameData);
    roundToStartOfRoundGameData[currentRound + 1] = gameData; // not finished, but usable

    // Massage to just per-round player/score.
    const roundToPlayerColorNameToScore = this._roundToPlayerColorNameToScore; // keep memory
    for (let round = 1; round <= currentRound + 1; round++) {
      const roundGameData = roundToStartOfRoundGameData[round + 1];
      if (!roundGameData) {
        continue;
      }

      const playerColorNameToScore = {};
      roundToPlayerColorNameToScore[round] = playerColorNameToScore;

      const roundPlayerDataArray =
        GameDataUtil.parsePlayerDataArray(roundGameData);
      for (const playerData of roundPlayerDataArray) {
        const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
        const score = GameDataUtil.parsePlayerScore(playerData);
        playerColorNameToScore[colorNameAndHex.colorName] = score;
      }
    }

    const margin = Math.floor(this._canvas.width * 0.1);
    const bb = {
      left: margin,
      top: margin,
      width: this._canvas.width - margin * 2,
      height: this._canvas.height - margin * 2,
    };
    const maxRound = Math.max(6, currentRound);
    const maxScore = Math.max(10, scoreboard);

    const ctx = this._canvas.getContext("2d");
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // Dotted horizontal lines.
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 10]);
    for (let value = 2; value <= maxScore; value += 2) {
      const y = bb.top + ((maxScore - value) / maxScore) * bb.height;
      ctx.beginPath();
      ctx.moveTo(bb.left, y);
      ctx.lineTo(bb.left + bb.width, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.fillStyle = "#aaa";
    ctx.font = "600 32px Open Sans, sans-serif";

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let value = 0; value <= maxScore; value += 2) {
      const y = bb.top + ((maxScore - value) / maxScore) * bb.height;
      ctx.fillText(value, bb.left - 10, y);
    }

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.translate(bb.left - 40, bb.top + bb.height / 2);
    ctx.rotate((Math.PI * 3) / 2);
    ctx.fillText("SCORE", 0, 0);
    ctx.restore();

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let value = 0; value <= maxRound; value += 1) {
      const x = bb.left + (value / maxRound) * bb.width;
      ctx.fillText(value, x, bb.top + bb.height + 10);
    }

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.translate(bb.left + bb.width / 2, bb.top + bb.height + 50);
    ctx.fillText("ROUND", 0, 0);
    ctx.restore();

    // Compute lines for each player. Do this once, then draw lines and
    // finally draw points OVER lines.
    const pointRadius = Math.ceil(bb.width * 0.015);
    const pointOffset = Math.ceil(bb.width * 0.02);
    const playerColorNameToXYs = {};
    for (const colorName of colorNames) {
      playerColorNameToXYs[colorName] = [];
    }
    const playerColorNameToLastX = {};
    for (const colorName of colorNames) {
      const points = playerColorNameToXYs[colorName];
      points.push([bb.left, bb.top + bb.height]);
      for (let round = 1; round < maxRound; round++) {
        const colorNameToScore = roundToPlayerColorNameToScore[round];
        if (!colorNameToScore) {
          continue;
        }
        const score = colorNameToScore[colorName];
        if (score === undefined) {
          continue;
        }
        let x = Math.floor(bb.left + (bb.width * round) / maxRound);
        let y = Math.floor(
          bb.top + (bb.height * (maxScore - score)) / maxScore
        );

        // How many points at this spot, and this player's index therein.
        let hereCount = 0;
        let hereMyIndex = 0;
        Object.entries(colorNameToScore).forEach(
          ([peerColorName, peerScore]) => {
            if (peerColorName === colorName) {
              hereMyIndex = hereCount;
            }
            if (peerScore === score) {
              hereCount += 1;
            }
          }
        );

        // Tweak points slightly to avoid overlap.
        const left = -((hereCount - 1) * pointOffset) / 2;
        const offset = hereMyIndex * pointOffset;
        x += Math.floor(left + offset);

        points.push([x, y]);

        playerColorNameToLastX[colorName] = x;
      }
    }

    // Draw lines.
    for (const colorName of colorNames) {
      ctx.strokeStyle = GameDataUtil.colorNameToHex(colorName);
      const points = playerColorNameToXYs[colorName];
      ImageUtil.bezierCurveThrough(ctx, points);
    }

    // Axis.
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bb.left, bb.top);
    ctx.lineTo(bb.left, bb.top + bb.height);
    ctx.lineTo(bb.left + bb.width, bb.top + bb.height);
    ctx.stroke();

    // Draw points.
    for (const colorName of colorNames) {
      const lastX = playerColorNameToLastX[colorName] || 0;
      const points = playerColorNameToXYs[colorName];
      for (const [x, y] of points) {
        if (y >= bb.top + bb.height && x < lastX) {
          continue; // only draw points when 1+ or if last point
        }

        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc(x, y, pointRadius + 3, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.fillStyle = GameDataUtil.colorNameToHex(colorName);
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  }
}

window.addEventListener("load", () => {
  Tempo.getInstance();
});
