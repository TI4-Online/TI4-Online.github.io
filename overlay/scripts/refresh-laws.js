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
      const div = document.createElement("div");
      div.className = "jumble-entry";
      div.style.backgroundColor = "white";
      div.style.color = "black";
      div.innerText = law;

      container.appendChild(div);
    }
  }
}

window.addEventListener("load", () => {
  Laws.getInstance();
});
