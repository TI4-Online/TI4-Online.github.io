"use strict";

class SceneComponents {
  static BG = "#333";
  static FG = "#aaa";
  static DELIMITER_WIDTH = 2;
  static YELLOW = "#ffde17";
  static BLUE = "#00a8cc";
  static RED = "#e94f64";
  static GROUP_MARGIN = 4;

  /**
   * Resize canvas to match parent, including future parent size changes.
   *
   * @param {function} onResizeCallback
   */
  static resizeCanvas(canvas, onResizeCallback) {
    const doResize = () => {
      // Size slightly smaller?  No, use overflow: hidden in CSS.
      const multisample = 2;
      const w = canvas.parentNode.offsetWidth;
      const h = canvas.parentNode.offsetHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * multisample;
      canvas.height = h * multisample;
      if (onResizeCallback) {
        onResizeCallback();
      }
    };

    let delayedHandle = undefined;
    const delayedDoResize = () => {
      if (delayedHandle) {
        clearTimeout(delayedHandle);
        delayedHandle = undefined;
      }
      delayedHandle = setTimeout(doResize, 200);
    };

    new ResizeObserver((entries) => {
      delayedDoResize();
    }).observe(canvas.parentNode);

    doResize();
  }

  static reserveHorizontal(remaining, w) {
    const result = { x: remaining.x, y: remaining.y, w, h: remaining.h };
    remaining.x += w;
    remaining.w -= w;
    if (remaining.w < -0.1) {
      throw new Error(`overflow ${remaining.w}`);
    }
    return result;
  }

  static reserveVertical(remaining, h) {
    const result = { x: remaining.x, y: remaining.y, w: remaining.w, h };
    remaining.y += h;
    remaining.h -= h;
    if (remaining.h < -0.1) {
      throw new Error(`overflow ${remaining.h}`);
    }
    return result;
  }

  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
  }

  clear() {
    const ctx = this._ctx;
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    return this;
  }

  fill() {
    const ctx = this._ctx;
    ctx.save();
    ctx.fillStyle = SceneComponents.BG;
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    ctx.restore();
    return this;
  }

  drawX(box) {
    const ctx = this._ctx;
    ctx.save();

    ctx.translate(box.x, box.y);
    ctx.strokeStyle = SceneComponents.FG;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(box.w, box.h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(box.w, 0);
    ctx.lineTo(0, box.h);
    ctx.stroke();

    ctx.strokeRect(0, 0, box.w, box.h);

    ctx.restore();
    return this;
  }

  drawLabel(box, text) {
    const textPos = this._textPos(box);

    const ctx = this._ctx;
    ctx.save();

    ctx.translate(box.x, box.y);

    // Flip fg/bg
    ctx.fillStyle = SceneComponents.FG;
    ctx.fillRect(0, 0, box.w, box.h);

    ctx.fillStyle = SceneComponents.BG;
    ctx.font = `800 ${textPos.fontsize}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, textPos.x, textPos.y);

    ctx.restore();
    return this;
  }

  drawRound(box, round) {
    const textPos = this._textPos(box);

    const ctx = this._ctx;
    ctx.save();

    ctx.translate(box.x, box.y);

    ctx.fillStyle = SceneComponents.FG;
    ctx.font = `600 ${textPos.fontsize}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Round ${round}`, textPos.x, textPos.y);

    ctx.restore();
    return this;
  }

  drawTimer(box, timer, continuous) {
    const textPos = this._textPos(box);

    const updateTimer = () => {
      let timerSeconds = 0;

      if (timer.anchorTimestamp) {
        // Timer is running, do the time computation here because updates
        // do not come every second.
        const now = Math.floor(Date.now() / 1000);
        const deltaSeconds = now - timer.anchorTimestamp;
        timerSeconds = timer.anchorSeconds + deltaSeconds;
      } else if (timer.seconds) {
        // Timer is paused, use the displayed value.
        timerSeconds = timer.seconds;
      }

      if (timer.countDown > 0) {
        timerSeconds = Math.max(timer.countDown - timerSeconds, 0);
      }

      let hours = Math.floor(timerSeconds / 3600);
      let minutes = Math.floor((timerSeconds % 3600) / 60);
      let seconds = Math.floor(timerSeconds % 60);

      hours = String(hours).padStart(2, "0");
      minutes = String(minutes).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");

      const timerText = `${hours}:${minutes}:${seconds}`;

      const ctx = this._ctx;
      ctx.save();

      ctx.translate(box.x, box.y);

      ctx.fillStyle = SceneComponents.BG;
      ctx.fillRect(0, 0, box.w, box.h);

      ctx.fillStyle = SceneComponents.RED;
      ctx.font = `600 ${textPos.fontsize}px Open Sans, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(timerText, textPos.x, textPos.y);

      ctx.restore();
    };

    updateTimer();

    if (continuous) {
      if (SceneComponents._drawTimerHandle) {
        clearInterval(SceneComponents._drawTimerHandle);
        SceneComponents._drawTimerHandle = undefined;
      }
      SceneComponents._drawTimerHandle = setInterval(updateTimer, 1000);
    }

    return this;
  }

  drawTurnOrder(box, simplified) {
    const playerCount = simplified.turnOrder.length;
    const entryHeight = box.h / playerCount;

    simplified.turnOrder.forEach((playerColor) => {
      const entryBox = SceneComponents.reserveVertical(box, entryHeight);
      const playerData = simplified.players[playerColor];
      this.drawPlayer(entryBox, playerData);
    });
  }

  drawPlayer(box, playerData) {
    const ctx = this._ctx;
    const imageSize = box.h;
    const entryTextPos = this._textPos(box);
    const orig = {
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
    };

    if (playerData.strategyCards.length === 0) {
      playerData.strategyCards.push({ name: "-", faceDown: false });
    }

    if (playerData.isTurn) {
      ctx.save();
      ctx.translate(box.x, box.y);
      ctx.fillStyle = playerData.colorHex;
      ctx.fillRect(0, 0, box.w, box.h);
      ctx.restore();
    }

    // Faction icon
    let iconSrc = `faction-icons/${playerData.faction}_icon.png`;
    if (playerData.isSpeaker) {
      iconSrc = "tokens/speaker_square.png";
    }
    iconSrc = ImageUtil.getSrc(iconSrc);

    const factionLabelSize = box.h * 0.3;
    const iconSize = (box.h - factionLabelSize) * 0.9;
    const iconMargin = (box.h - (factionLabelSize * 0.7 + iconSize)) / 2;
    const iconX = box.x + iconMargin * 3;
    const iconY = box.y + iconMargin;
    ImageUtil.drawMagic(ctx, iconSrc, iconX, iconY, {
      width: iconSize,
      height: iconSize,
      outlineColor: "white",
      outlineWidth: 2,
    });
    const labelBox = {
      x: iconX,
      y: iconY + iconSize,
      w: iconSize,
      h: factionLabelSize,
    };
    const labelPos = this._textPos(labelBox);
    ctx.fillStyle = playerData.isTurn
      ? SceneComponents.BG
      : playerData.colorHex;
    ctx.font = `600 ${labelPos.fontsizeBigger}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      playerData.faction.toUpperCase(),
      labelBox.x + labelPos.x,
      labelBox.y + labelPos.y
    );

    const lineH = box.h / 2;
    const squeeze = 0.05;
    const nameBox = SceneComponents.reserveVertical(box, lineH);
    const strategyCardsBox = SceneComponents.reserveVertical(box, lineH);

    const namePos = this._textPos(nameBox);

    // Name
    ctx.save();
    ctx.translate(nameBox.x, nameBox.y + nameBox.h * squeeze);
    ctx.fillStyle = playerData.isTurn
      ? SceneComponents.BG
      : playerData.colorHex;
    ctx.strokeStyle = playerData.isTurn
      ? playerData.colorHex
      : SceneComponents.BG;
    ctx.lineWidth = namePos.lineWidth;
    ctx.font = `600 ${namePos.fontsizeBigger}px Open Sans, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(playerData.name, box.w / 2, namePos.y);
    ctx.fillText(playerData.name, box.w / 2, namePos.y);
    if (!playerData.active) {
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nameBox.w * 0.1, nameBox.h / 2);
      ctx.lineTo(nameBox.w * 0.9, nameBox.h / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Strategy Card(s)
    const scW = box.w / Math.max(playerData.strategyCards.length, 1);
    for (const sc of playerData.strategyCards) {
      const text = sc.name.toUpperCase();
      const scBox = SceneComponents.reserveHorizontal(strategyCardsBox, scW);
      const strategyPos = this._textPos(scBox);
      ctx.save();
      ctx.translate(scBox.x, scBox.y - scBox.h * squeeze);
      ctx.fillStyle = playerData.isTurn
        ? SceneComponents.BG
        : playerData.colorHex;
      ctx.strokeStyle = playerData.isTurn
        ? playerData.colorHex
        : SceneComponents.BG;
      ctx.lineWidth = strategyPos.lineWidth;
      ctx.font = `600 ${strategyPos.fontsizeBigger}px Open Sans, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeText(text, scBox.w / 2, strategyPos.y);
      ctx.fillText(text, scBox.w / 2, strategyPos.y);

      if (sc.faceDown) {
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scBox.w * 0.2, scBox.h / 2);
        ctx.lineTo(scBox.w * 0.8, scBox.h / 2);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Score
    ctx.save();
    ctx.translate(nameBox.x, nameBox.y);
    ctx.strokeStyle = playerData.isTurn
      ? playerData.colorHex
      : SceneComponents.BG;
    ctx.lineWidth = entryTextPos.lineWidth;
    ctx.fillStyle = playerData.isTurn
      ? SceneComponents.BG
      : playerData.colorHex;
    ctx.font = `600 ${entryTextPos.fontsizeBigger}px Open Sans, sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.strokeText(playerData.score, box.w * 0.97, entryTextPos.y);
    ctx.fillText(playerData.score, box.w * 0.97, entryTextPos.y);
    ctx.restore();

    // Delimiter
    //this.drawDelimiter(orig);

    return this;
  }

  drawDelimiter(box) {
    const ctx = this._ctx;
    ctx.save();
    ctx.translate(box.x, box.y);
    ctx.lineWidth = SceneComponents.DELIMITER_WIDTH;
    ctx.strokeStyle = SceneComponents.FG;
    ctx.beginPath();
    ctx.moveTo(0, box.h);
    ctx.lineTo(box.w, box.h);
    ctx.stroke();
    ctx.restore();
    return this;
  }

  drawObjectives(box, lineH, simplified) {
    for (const objective of simplified.objectives.stage1) {
      const objectiveBox = SceneComponents.reserveVertical(box, lineH);
      this.drawObjective(objectiveBox, "stage1", objective, simplified);
    }
    for (const objective of simplified.objectives.stage2) {
      const objectiveBox = SceneComponents.reserveVertical(box, lineH);
      this.drawObjective(objectiveBox, "stage2", objective, simplified);
    }

    // Secrets are a little different.
    const secretsScoredBy = [];
    for (const objective of simplified.objectives.secret) {
      for (const playerColor of objective.scoredBy) {
        secretsScoredBy.push(playerColor);
      }
    }
    const secretBox = SceneComponents.reserveVertical(box, lineH);
    this.drawObjective(
      secretBox,
      "secret",
      { abbr: "secrets", scoredBy: secretsScoredBy },
      simplified
    );

    const custodiansBox = SceneComponents.reserveVertical(box, lineH);
    this.drawObjective(
      custodiansBox,
      "custodians",
      simplified.objectives.custodians[0],
      simplified
    );

    const supportBox = SceneComponents.reserveVertical(box, lineH);
    const supportScoredBy = [];
    for (const objective of simplified.objectives.sftt) {
      for (const playerColor of objective.scoredBy) {
        supportScoredBy.push(playerColor);
      }
    }
    this.drawObjective(
      supportBox,
      "support",
      { abbr: "support", scoredBy: supportScoredBy },
      simplified
    );

    for (const objective of simplified.objectives.other) {
      const objectiveBox = SceneComponents.reserveVertical(box, lineH);
      this.drawObjective(objectiveBox, "other", objective, simplified);
    }
  }

  drawObjective(box, type, objective, simplified) {
    const ctx = this._ctx;

    const labelW = box.w - simplified.seatOrder.length * box.h;
    const labelBox = SceneComponents.reserveHorizontal(box, labelW);
    const labelPos = this._textPos(labelBox);

    ctx.save();
    ctx.translate(labelBox.x, labelBox.y);
    let textColor = SceneComponents.FG;
    let bgColor = undefined;
    if (type === "stage1") {
      bgColor = SceneComponents.YELLOW;
      textColor = SceneComponents.BG;
    } else if (type === "stage2") {
      bgColor = SceneComponents.BLUE;
      textColor = SceneComponents.BG;
    } else if (type === "secret") {
      bgColor = SceneComponents.RED;
      textColor = SceneComponents.BG;
    }
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(1, 1, labelBox.w - 2, labelBox.h - 2);
    }
    ctx.fillStyle = textColor;
    ctx.font = `600 ${labelPos.fontsize}px Open Sans, sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(objective.abbr.toUpperCase(), labelBox.w * 0.97, labelPos.y);
    ctx.restore();

    for (const playerColor of simplified.seatOrder) {
      const playerBox = SceneComponents.reserveHorizontal(box, box.h);
      const count = objective.scoredBy.filter((x) => x === playerColor).length;
      if (count > 0) {
        ctx.save();
        ctx.translate(playerBox.x, playerBox.y);
        ctx.fillStyle = simplified.players[playerColor].colorHex;
        ctx.fillRect(1, 1, playerBox.w - 2, playerBox.h - 2);

        if (type === "secret" || type === "custodians") {
          const textPos = this._textPos(playerBox);
          ctx.fillStyle = SceneComponents.BG;
          ctx.font = `600 ${textPos.fontsize}px Open Sans, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(count, textPos.x, textPos.y);
        }

        if (type === "support") {
          const supporters = [];
          for (const objective of simplified.objectives.sftt) {
            if (objective.scoredBy.includes(playerColor)) {
              const colorHex =
                simplified.players[objective.supportColor].colorHex;
              supporters.push(colorHex);
            }
          }
          const x = playerBox.w / 2;
          const y = playerBox.h / 2;
          const r = Math.min(x, y) * 0.8;
          supporters.forEach((colorHex, index) => {
            ctx.fillStyle = colorHex;
            const a = (Math.PI * 2 * index) / supporters.length;
            const b = (Math.PI * 2 * (index + 1)) / supporters.length;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, r, a, b);
            ctx.closePath();
            ctx.fill();
          });

          // Frame.
          ctx.lineWidth = 1;
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.arc(x, y, r - ctx.lineWidth / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    return this;
  }

  drawSecrets(box, lineH, simplified) {
    const ctx = this._ctx;
    const padX = lineH * 0.2;

    box.x += SceneComponents.GROUP_MARGIN;
    box.y += SceneComponents.GROUP_MARGIN;
    box.w -= SceneComponents.GROUP_MARGIN * 2;
    box.h -= SceneComponents.GROUP_MARGIN;

    const fontsize = this._textPos({ x: 0, y: 0, w: 0, h: lineH }).fontsize;

    // Group by player.
    const objectives = [...simplified.objectives.secret].filter(
      (x) => x.scoredBy[0]
    );
    objectives.sort((a, b) => {
      a = a.scoredBy[0];
      b = b.scoredBy[0];
      a = simplified.seatOrder.indexOf(a);
      b = simplified.seatOrder.indexOf(b);
      return a - b;
    });

    let lineBox = undefined;
    for (const objective of objectives) {
      const scoredBy = objective.scoredBy[0];
      const colorHex = simplified.players[scoredBy].colorHex;

      ctx.save();
      ctx.font = `600 ${fontsize}px Open Sans, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      const text = objective.abbr.toUpperCase();
      const w = ctx.measureText(text).width + padX * 2;

      if (!lineBox || (lineBox.w < w && box.w >= w)) {
        lineBox = SceneComponents.reserveVertical(box, lineH);
      }
      const textBox = SceneComponents.reserveHorizontal(lineBox, w);
      const textPos = this._textPos(textBox);
      ctx.translate(textBox.x, textBox.y);
      ctx.fillStyle = colorHex;
      ctx.beginPath();
      ctx.roundRect(
        SceneComponents.GROUP_MARGIN,
        SceneComponents.GROUP_MARGIN,
        textBox.w - SceneComponents.GROUP_MARGIN * 2,
        textBox.h - SceneComponents.GROUP_MARGIN * 2,
        lineH * 0.2
      );
      ctx.fill();

      ctx.fillStyle = SceneComponents.BG;
      ctx.fillText(text, padX, textPos.y);
      ctx.restore();
    }
  }

  drawLaws(box, lineH, simplified) {
    const ctx = this._ctx;
    const padX = lineH * 0.2;

    box.x += SceneComponents.GROUP_MARGIN;
    box.y += SceneComponents.GROUP_MARGIN;
    box.w -= SceneComponents.GROUP_MARGIN * 2;
    box.h -= SceneComponents.GROUP_MARGIN;

    const fontsize = this._textPos({ x: 0, y: 0, w: 0, h: lineH }).fontsize;

    let lineBox = undefined;
    for (const law of simplified.laws) {
      const scoredBy =
        law.colorNames.length === 1 ? law.colorNames[0] : undefined;
      const colorHex = scoredBy
        ? simplified.players[scoredBy].colorHex
        : SceneComponents.FG;

      ctx.save();
      ctx.font = `600 ${fontsize}px Open Sans, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      const text = law.abbr.toUpperCase();
      const w = ctx.measureText(text).width + padX * 2;

      if (!lineBox || (lineBox.w < w && box.w >= w)) {
        lineBox = SceneComponents.reserveVertical(box, lineH);
      }
      const textBox = SceneComponents.reserveHorizontal(lineBox, w);
      const textPos = this._textPos(textBox);
      ctx.translate(textBox.x, textBox.y);
      ctx.fillStyle = colorHex;
      ctx.beginPath();
      ctx.roundRect(
        SceneComponents.GROUP_MARGIN,
        SceneComponents.GROUP_MARGIN,
        textBox.w - SceneComponents.GROUP_MARGIN * 2,
        textBox.h - SceneComponents.GROUP_MARGIN * 2,
        lineH * 0.2
      );
      ctx.fill();

      ctx.fillStyle = SceneComponents.BG;
      ctx.fillText(text, padX, textPos.y);
      ctx.restore();
    }
    return this;
  }

  drawTI4Calc(box, lineH, simplified) {
    const regionsH = 4 * lineH;
    const tileH = box.h - regionsH;
    const tileBox = SceneComponents.reserveVertical(box, tileH);

    let tileHexSummary = simplified.hexSummary.filter((entry) => {
      return entry.tile === simplified.activeSystem.tile;
    })[0];
    if (!tileHexSummary) {
      tileHexSummary = { tile: 0, regions: [] };
    }

    const mapUtil = new MapUtil(this._canvas, box.w * 0.7);
    const { tileWidth, tileHeight } = mapUtil.getSizes();
    const x = tileBox.x + Math.floor((tileBox.w - tileWidth) / 2);
    const offsetY = tileHeight * 0.08; // tileHeight not quite right?
    const y = tileBox.y - offsetY + Math.floor((tileBox.h - tileHeight) / 2);
    mapUtil.drawTile(x, y, tileHexSummary);
    tileHexSummary.regions.forEach((region, regionIndex) => {
      mapUtil.drawOccupants(x, y, tileHexSummary, regionIndex);
    });

    // Per-region estimates.
    for (let i = 0; i < 4; i++) {
      const regionBox = SceneComponents.reserveVertical(box, lineH);
      const labelBox = SceneComponents.reserveHorizontal(
        regionBox,
        box.w * 0.4
      );

      const entry =
        simplified.ti4calc.length > i ? simplified.ti4calc[i] : undefined;
      const text = entry ? entry.name.toUpperCase() : "-";
      const textPos = this._textPos(labelBox);

      const ctx = this._ctx;
      ctx.save();

      ctx.translate(labelBox.x, labelBox.y);
      ctx.strokeStyle = SceneComponents.FG;
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, box.w, lineH);

      ctx.fillStyle = SceneComponents.FG;
      ctx.font = `600 ${textPos.fontsize}px Open Sans, sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(text, labelBox.w * 0.95, textPos.y);
      ctx.restore();

      ctx.save();
      ctx.translate(regionBox.x, regionBox.y);
      ctx.strokeStyle = SceneComponents.FG;
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, regionBox.w, regionBox.h);
      if (entry && entry.attacker > 0) {
        ctx.font = `600 ${textPos.fontsize}px Open Sans, sans-serif`;

        ctx.fillStyle = SceneComponents.FG;
        ctx.fillRect(0, 0, regionBox.w, regionBox.h);

        ctx.fillStyle = simplified.players[entry.attackerColor].colorHex;
        let w = (regionBox.w * entry.attacker) / 100;
        ctx.fillRect(1, 1, w - 2, regionBox.h - 2);

        ctx.fillStyle = entry.defenderColor
          ? simplified.players[entry.defenderColor].colorHex
          : SceneComponents.BG;
        w = (regionBox.w * entry.defender) / 100;
        ctx.fillRect(regionBox.w - w + 1, 1, w - 2, regionBox.h - 2);

        ctx.fillStyle = SceneComponents.BG;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`${entry.attacker}%`, regionBox.w * 0.03, textPos.y);

        ctx.fillStyle = SceneComponents.BG;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(`${entry.defender}%`, regionBox.w * 0.97, textPos.y);
      }
      ctx.restore();
    }
    return this;
  }

  drawTempo(box, lineH, simplified) {
    const ctx = this._ctx;

    const margin = Math.floor(box.w * 0.12);
    const bb = {
      left: box.x + margin,
      top: box.y + margin,
      width: box.w - margin * 2,
      height: box.h - margin * 2,
    };
    const fontSize = box.h * 0.045;
    const maxRound = Math.max(6, simplified.round);
    const maxScore = Math.max(10, simplified.scoreboard);

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
    ctx.font = `600 ${fontSize}px Open Sans, sans-serif`;

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
    for (const colorName of simplified.seatOrder) {
      playerColorNameToXYs[colorName] = [];
    }
    const playerColorNameToLastX = {};
    for (const colorName of simplified.seatOrder) {
      const points = playerColorNameToXYs[colorName];
      points.push([bb.left, bb.top + bb.height]);
      for (let round = 1; round < maxRound; round++) {
        const colorNameToScore = simplified.tempo[round];
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
    for (const colorName of simplified.seatOrder) {
      ctx.strokeStyle = simplified.players[colorName].colorHex;
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
    for (const colorName of simplified.seatOrder) {
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

        ctx.fillStyle = simplified.players[colorName].colorHex;
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  }

  _textPos(box) {
    return {
      fontsize: box.h * 0.5,
      fontsizeBigger: box.h * 0.7,
      x: box.w / 2, // (if centered)
      y: (box.h * 1.1) / 2,
      lineWidth: box.h * 0.2,
    };
  }
}

class SceneComponentsSafe {
  constructor(canvas) {
    this._sc = new SceneComponents(canvas);
  }

  clear() {
    try {
      this._sc.clear();
    } catch (e) {
      console.log("err");
    }
  }
  fill() {
    try {
      this._sc.fill();
    } catch (e) {
      console.log("err");
    }
  }
  drawX(box) {
    try {
      this._sc.drawX(box);
    } catch (e) {
      console.log("err");
    }
  }

  drawLabel(box, text) {
    try {
      this._sc.drawLabel(box, text);
    } catch (e) {
      console.log("err");
    }
  }
  drawRound(box, round) {
    try {
      this._sc.drawRound(box, round);
    } catch (e) {
      console.log("err");
    }
  }
  drawTimer(box, timer, continuous) {
    try {
      this._sc.drawTimer(box, timer, continuous);
    } catch (e) {
      console.log("err");
    }
  }
  drawTurnOrder(box, simplified) {
    try {
      this._sc.drawTurnOrder(box, simplified);
    } catch (e) {
      console.log("err");
    }
  }
  drawPlayer(box, playerData) {
    try {
      this._sc.drawPlayer(box, playerData);
    } catch (e) {
      console.log("err");
    }
  }
  drawDelimiter(box) {
    try {
      this._sc.drawDelimiter(box);
    } catch (e) {
      console.log("err");
    }
  }
  drawObjectives(box, lineH, simplified) {
    try {
      this._sc.drawObjectives(box, lineH, simplified);
    } catch (e) {
      console.log("err");
    }
  }
  drawObjective(box, type, objective, simplified) {
    try {
      this._sc.drawObjective(box, type, objective, simplified);
    } catch (e) {
      console.log("err");
    }
  }
  drawSecrets(box, lineH, simplified) {
    try {
      this._sc.drawSecrets(box, lineH, simplified);
    } catch (e) {
      console.log("err");
    }
  }
  drawLaws(box, lineH, simplified) {
    try {
      this._sc.drawLaws(box, lineH, simplified);
    } catch (e) {
      console.log("err");
    }
  }
  drawTI4Calc(box, lineH, simplified) {
    try {
      this._sc.drawTI4Calc(box, lineH, simplified);
    } catch (e) {
      console.log("err");
    }
  }
  drawTempo(box, lineH, simplified) {
    try {
      this._sc.drawTempo(box, lineH, simplified);
    } catch (e) {
      console.log("err");
    }
  }
}

/**
@Description: Takes in an exception or string and turns it into an Error object,
  then appends the caller name to the message.
@Returns: A new Error object or null.
*/
function wrapError(e, caller) {
  if (null === e) {
    return null;
  }
  var ret = typeof e === typeof "" ? new Error(e) : new Error(e.message);
  ret.stackTrace = e.stackTrace || [];
  ret.stackTrace.push(caller);
  return ret;
}

/**
@Description: Returns a method (function) wrapped in an error handler. Does not 
  affect the behavior of the underlying function. Does not affec the function 
  either, only returns the wrapped function, doesn't modify it directly.
  Usage: function foo() { throw new Error("bar"); }; foo = safeWrapMethod(foo, "foo");
@Param: fn The function pointer/object to wrap.
@Param: name A string containing the name of fn as you wish it to be displayed in the call stack.
@Return: The method/function fn wrapped in an error handler.
*/
function safeWrapMethod(fn, name) {
  try {
    return function () {
      /* Wrapper added by safeWrapMethod */
      try {
        console.log("xxx " + name);
        return fn.apply(this, arguments);
      } catch (e) {
        throw wrapError(e, name);
      }
    };
  } catch (e) {
    throw wrapError(e, "ErrorHelpers.safeWrapMethod");
  }
}

/**
@Description: Wraps every method in an object with an error handler. Affects the 
  instance of the object, but does not alter the underlying behavior of the methods.
@Param: o The class instance (object) to wrap.
@Param: name A string containing the name of the class. Method names will show as 
  "name.methodName" in an error's stack trace.
*/
function safeWrapClass(o, name) {
  for (var m in o) {
    if (typeof o[m] === "function") {
      console.log("apply " + m);
      o[m] = safeWrapMethod(o[m], name + "." + m);
    }
  }
}
safeWrapClass = safeWrapMethod(safeWrapClass, "ErrorHelpers.safeWrapClass");
