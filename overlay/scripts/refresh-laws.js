"use strict";

class Laws {
  static getInstance() {
    if (!Laws.__instance) {
      Laws.__instance = new Laws();
    }
    return Laws.__instance;
  }

  constructor() {
    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }

  update(gameData) {
    console.assert(typeof gameData === "object");

    const laws = GameDataUtil.parseLaws(gameData);

    const container = document.getElementById("laws");
    container.innerHTML = "";

    for (const law of laws) {
      const color = "black";
      let bgColor = "#aaa";

      if (law.players.length === 1) {
        const player = law.players[0];
        bgColor = player.colorHex;
      }

      const div = document.createElement("div");
      div.className = "jumble-entry";
      div.style.backgroundColor = bgColor;
      div.style.color = color;
      div.innerText = law.name;

      container.appendChild(div);
    }
  }
}

window.addEventListener("load", () => {
  Laws.getInstance();
});
