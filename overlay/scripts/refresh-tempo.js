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

    this._bezier = true;

    if (this._canvas.width === 0 && this._canvas.height === 0) {
      // Size slightly smaller to prevent growing table size, then pad
      const w = this._canvas.parentNode.offsetWidth - 4;
      const h = this._canvas.parentNode.offsetHeight - 4;
      this._canvas.style.width = `${w}px`;
      this._canvas.style.height = `${h}px`;
      this._canvas.width = w * 2;
      this._canvas.height = h * 2;
    }

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
    const roundToPlayerColorNameToScore = {};
    for (let round = 1; round <= currentRound + 1; round++) {
      const playerColorNameToScore = {};
      roundToPlayerColorNameToScore[round] = playerColorNameToScore;

      const roundGameData = roundToStartOfRoundGameData[round + 1];
      if (!roundGameData) {
        continue;
      }
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

    const ctx = this._canvas.getContext("2d");
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bb.left, bb.top);
    ctx.lineTo(bb.left, bb.top + bb.height);
    ctx.lineTo(bb.left + bb.width, bb.top + bb.height);
    ctx.stroke();

    ctx.fillStyle = "#aaa";
    ctx.font = "600 32px Open Sans, sans-serif";

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const maxScore = Math.max(10, scoreboard);
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
    const maxRound = Math.max(6, currentRound);
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

    const pointRadius = Math.ceil(bb.width * 0.01);
    for (const colorName of colorNames) {
      ctx.fillStyle = GameDataUtil.colorNameToHex(colorName);
      ctx.strokeStyle = GameDataUtil.colorNameToHex(colorName);
      const points = [[bb.left, bb.top + bb.height]];
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
        points.push([x, y]);

        // Draw point.
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2, true);
        ctx.fill();
      }

      if (this._bezier) {
        ImageUtil.bezierCurveThrough(ctx, points);
      } else {
        ctx.beginPath();
        let first = true;
        for (const point of points) {
          if (first) {
            first = false;
            ctx.moveTo(point[0], point[1]);
          } else {
            ctx.lineTo(point[0], point[1]);
          }
        }
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("load", () => {
  Tempo.getInstance();
});
