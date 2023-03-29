"use strict";

class Sidebar {
  static getInstance() {
    if (!Sidebar.__instance) {
      Sidebar.__instance = new Sidebar();
    }
    return Sidebar.__instance;
  }

  constructor() {
    this._lastSimplified = undefined;

    const elementId = "sidebar-canvas";
    this._canvas = document.getElementById(elementId);
    if (!this._canvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    SceneComponents.resizeCanvas(this._canvas, () => {
      ImageUtil.resetCache();
      if (this._lastSimplified) {
        this.update(this._lastSimplified);
      }
    });

    new BroadcastChannel("onSimplifiedGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this._lastSimplified = event.data.detail;
        this.update(event.data.detail);
      }
    };
  }

  update(simplified) {
    const sc = new SceneComponentsSafe(this._canvas);
    //const sc = new SceneComponents(this._canvas);
    sc.fill();

    console.log(`${this._canvas.width}x${this._canvas.height}`);

    // Use a consistent font size.
    // round, timer: 1
    // turn order: 12
    // objectives: 17
    // secrets: 10
    // labels: 4
    // TOTAL 44
    // ti4calc: square
    // ADAPTIVE RESIZE?

    const ti4CalcHeight = this._canvas.width;
    const otherHeight =
      this._canvas.height - ti4CalcHeight - SceneComponents.GROUP_MARGIN * 4;

    const remaining = {
      x: 0,
      y: 0,
      w: this._canvas.width,
      h: this._canvas.height,
    };
    let h = 0;

    const roundAndTimerLines = 1;
    const turnOrderLines = simplified.turnOrder.length * 2;
    const objectivesLines = Math.max(
      simplified.objectives.stage1.length +
        simplified.objectives.stage2.length +
        1 + // secret count
        1 + // custodians
        1 + // support
        simplified.objectives.other.length,
      5
    );
    const secretsLines = Math.max(
      Math.ceil(simplified.objectives.secret.length / 2),
      3
    );
    const lawsLines = Math.max(Math.ceil(simplified.laws.length / 2), 3);
    const labelsLines = 5;

    const totalLines =
      roundAndTimerLines +
      turnOrderLines +
      objectivesLines +
      secretsLines +
      lawsLines +
      labelsLines;

    const labelH = (otherHeight * 1) / totalLines;

    if (labelH !== Sidebar._lastLabelH) {
      ImageUtil.resetCache();
      Sidebar._lastLabelH = labelH;
    }

    // First, divvy up the available space for each item.

    // ROUND/TIMER
    h = labelH;
    const boxRoundAndTimer = SceneComponents.reserveVertical(remaining, h);
    const roundBox = SceneComponents.reserveHorizontal(
      boxRoundAndTimer,
      boxRoundAndTimer.w / 2
    );
    const timerBox = boxRoundAndTimer; // residue
    sc.drawRound(roundBox, simplified.round);
    sc.drawTimer(timerBox, simplified.timer, true);

    // TURN ORDER
    h = labelH;
    const boxTurnOrderLabel = SceneComponents.reserveVertical(remaining, h);
    sc.drawLabel(boxTurnOrderLabel, "TURN ORDER");
    h = (otherHeight * turnOrderLines) / totalLines;
    const boxTurnOrder = SceneComponents.reserveVertical(remaining, h);
    sc.drawTurnOrder(boxTurnOrder, simplified);

    // OBJECTIVES
    h = labelH;
    const boxObjectivesLabel = SceneComponents.reserveVertical(remaining, h);
    sc.drawLabel(boxObjectivesLabel, "OBJECTIVES");
    h = (otherHeight * objectivesLines) / totalLines;
    const boxObjectives = SceneComponents.reserveVertical(remaining, h);
    sc.drawObjectives(boxObjectives, labelH, simplified);

    // SECRETS
    h = labelH;
    const boxSecretsLabel = SceneComponents.reserveVertical(remaining, h);
    sc.drawLabel(boxSecretsLabel, "SECRETS");
    h =
      (otherHeight * secretsLines) / totalLines +
      SceneComponents.GROUP_MARGIN * 2;
    const boxSecrets = SceneComponents.reserveVertical(remaining, h);
    sc.drawSecrets(boxSecrets, labelH, simplified);

    // LAWS
    if (lawsLines > 0) {
      h = labelH;
      const boxLawsLabel = SceneComponents.reserveVertical(remaining, h);
      sc.drawLabel(boxLawsLabel, "LAWS");
      h =
        (otherHeight * lawsLines) / totalLines +
        SceneComponents.GROUP_MARGIN * 2;
      const boxLaws = SceneComponents.reserveVertical(remaining, h);
      sc.drawLaws(boxLaws, labelH, simplified);
    }

    // TI4-CALC --or-- TEMPO (if no active system / no combat)
    if (simplified.isCombat) {
      h = labelH;
      const boxTI4CalcLabel = SceneComponents.reserveVertical(remaining, h);
      sc.drawLabel(boxTI4CalcLabel, "TI4-CALC");
      h = ti4CalcHeight; // calc is square
      const boxTI4Calc = SceneComponents.reserveVertical(remaining, h);
      sc.drawTI4Calc(boxTI4Calc, labelH, simplified);
    } else {
      h = labelH;
      const tempoLabel = SceneComponents.reserveVertical(remaining, h);
      sc.drawLabel(tempoLabel, "SCORE OVER TIME");
      h = ti4CalcHeight; // calc is square
      const boxTempo = SceneComponents.reserveVertical(remaining, h);
      sc.drawTempo(boxTempo, labelH, simplified);
    }
  }
}

window.addEventListener("load", () => {
  Sidebar.getInstance();
});
