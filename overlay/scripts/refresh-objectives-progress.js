"use strict";

class ObjectivesProgress {
  static getInstance() {
    if (!ObjectivesProgress.__instance) {
      ObjectivesProgress.__instance = new ObjectivesProgress();
    }
    return ObjectivesProgress.__instance;
  }

  constructor() {
    const elementId = "objectives-progress";
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

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    const playerColorNameAndHexValues = playerDataArray.map((playerData) => {
      return GameDataUtil.parsePlayerColor(playerData);
    });
    const playerColors = playerColorNameAndHexValues.map((x) => x.colorHex);

    const objectiveProgressEntries =
      GameDataUtil.parseObjectivesProgress(gameData);

    const ctx = this._canvas.getContext("2d");
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    const numRows = 8;
    const numCols = Math.ceil(objectiveProgressEntries.length / numRows);
    const margin = 12; // canvas is slightly shrunk to avoid overflow
    const gap = 2;
    const box = {
      w: (this._canvas.width - margin - gap * (numCols + 1)) / numCols,
      h: (this._canvas.height - margin - gap * (numRows + 1)) / numRows,
    };

    objectiveProgressEntries.forEach((objectiveProgressEntry, index) => {
      const col = index % numCols;
      const row = Math.floor(index / numCols);
      box.x = margin + (box.w + gap) * col;
      box.y = margin + (box.h + gap) * row;

      this._drawObjectiveProgress(
        ctx,
        box,
        objectiveProgressEntry,
        playerColors
      );
    });
  }

  _drawObjectiveProgress(ctx, box, objectiveProgressEntry, playerColors) {
    const stage = objectiveProgressEntry.stage;
    const stageColorName = stage === 1 ? "yellow" : "blue";
    const stageColor = GameDataUtil.colorNameToHex(stageColorName);
    const isActive = objectiveProgressEntry.scoredBy ? true : false;

    // Background or frame, leave fill for overlay text.
    const padding = 4;
    const inset = {
      x: box.x + padding,
      y: box.y + padding,
      w: box.w - padding * 2,
      h: box.h - padding * 2,
    };
    if (isActive) {
      ctx.fillStyle = stageColor;
      ctx.fillRect(inset.x, inset.y, inset.w, inset.h);
      ctx.fillStyle = "black";
    } else {
      ctx.strokeStyle = stageColor;
      ctx.strokeRect(inset.x, inset.y, inset.w, inset.h);
      ctx.fillStyle = "white";
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let centerX = box.x + box.w / 2;
    let y = box.y + 30;
    let fontSize = 30;
    let text = objectiveProgressEntry.name || "-";
    ctx.font = `600 ${fontSize}px Open Sans, sans-serif`;
    ctx.fillText(text, centerX, y);

    y += 32;
    text = objectiveProgressEntry.abbr || "-";
    ctx.fillText(text, centerX, y);

    y += 30;
    fontSize = 20;
    text = `(${objectiveProgressEntry.header || "-"})`;
    ctx.font = `600 ${fontSize}px Open Sans, sans-serif`;
    ctx.fillText(text, centerX, y);

    // Draw progress.
    const progress = {
      x: inset.x + padding,
      y: y + 15 + padding,
      w: inset.w - padding * 2,
      h: inset.h - (y - inset.y + 15) - padding * 2,
    };
    ctx.fillStyle = "#222";
    ctx.fillRect(progress.x, progress.y, progress.w, progress.h);

    const numRows = 2;
    const numCols = Math.ceil(objectiveProgressEntry.values.length / numRows);
    const cellW = (progress.w - (numCols + 1) * padding) / numCols;
    const cellH = (progress.h - (numRows + 1) * padding) / numRows;
    objectiveProgressEntry.values.forEach(({ value, success }, index) => {
      // Remap cell to follow player seating, clockwise from lower right.
      let col;
      let row;
      if (index < numCols) {
        col = numCols - 1 - index;
        row = 1;
      } else if (index >= numCols) {
        col = index % numCols;
        row = 0;
      }

      const playerBox = {
        x: progress.x + col * (padding + cellW) + padding,
        y: progress.y + row * (padding + cellH) + padding,
        w: cellW,
        h: cellH,
      };

      const playerColor = playerColors[index];
      const bgColor = success ? playerColor : "#222";
      const fgColor = success ? "black" : playerColor;

      const alreadyScored =
        objectiveProgressEntry.scoredBy &&
        objectiveProgressEntry.scoredBy.includes(index);

      ctx.strokeStyle = playerColor;
      ctx.strokeRect(playerBox.x, playerBox.y, playerBox.w, playerBox.h);
      if (success && !alreadyScored) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(playerBox.x, playerBox.y, playerBox.w, playerBox.h);
      }

      ctx.fillStyle = fgColor;
      fontSize = 30;
      text = value;
      ctx.font = `600 ${fontSize}px Open Sans, sans-serif`;

      if (alreadyScored) {
        text = "\u{2713}";
        ctx.font = `800 ${fontSize}px Open Sans, sans-serif`;
        ctx.fillStyle = playerColor;
      }

      ctx.fillText(
        text,
        playerBox.x + playerBox.w / 2,
        playerBox.y + playerBox.h / 2
      );
    });
  }
}

window.addEventListener("load", () => {
  ObjectivesProgress.getInstance();
});
