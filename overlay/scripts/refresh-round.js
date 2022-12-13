class Round {
  static getInstance() {
    if (!Round.__instance) {
      Round.__instance = new Round();
    }
    return Round.__instance;
  }

  constructor() {
    this._div = document.getElementById("round");
    console.assert(this._div);

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
