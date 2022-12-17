class Round {
  static getInstance() {
    if (!Round.__instance) {
      Round.__instance = new Round();
    }
    return Round.__instance;
  }

  constructor() {
    const elementId = "round";
    this._div = document.getElementById(elementId);
    if (!this._div) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");
    const round = GameDataUtil.parseRound(gameData);
    console.assert(typeof round === "number");

    this._div.innerText = `Round ${round}`;
  }
}

window.addEventListener("load", () => {
  Round.getInstance();
});
