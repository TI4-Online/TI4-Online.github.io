"use strict";

class Whispers {
  static getInstance() {
    if (!Whispers.__instance) {
      Whispers.__instance = new Whispers();
    }
    return Whispers.__instance;
  }

  constructor() {
    const elementId = "whispers";
    this._table = document.getElementById(elementId);
    if (!this._table) {
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
    const whispers = GameDataUtil.parseWhispers(gameData);

    const trs = [...this._table.rows];
    trs.forEach((tr, index) => {
      const whisperPairContainer = tr.getElementsByClassName(
        "whisper-pair-container"
      )[0];
      const nameA = whisperPairContainer.children[0];
      const nameB = whisperPairContainer.children[1];

      const whisperDirectionContainer = tr.getElementsByClassName(
        "whisper-direction-container"
      )[0];
      const forward = whisperDirectionContainer.children[0];
      const backward = whisperDirectionContainer.children[1];

      let entry = whispers[index];
      if (!entry) {
        entry = {
          colorNameA: "-",
          colorNameB: "-",
          forwardStr: "-",
          backwardStr: "-",
        };
      }
      nameA.innerText = entry.colorNameA;
      nameA.style.color = GameDataUtil.colorNameToHex(entry.colorNameA);
      nameB.innerText = entry.colorNameB;
      nameB.style.color = GameDataUtil.colorNameToHex(entry.colorNameB);

      forward.innerHTML = entry.forwardStr.replace(/ /, "&nbsp;");
      forward.style.color = GameDataUtil.colorNameToHex(entry.colorNameA);
      backward.innerHTML = entry.backwardStr.replace(/ /, "&nbsp;");
      backward.style.color = GameDataUtil.colorNameToHex(entry.colorNameB);
    });
  }
}

window.addEventListener("load", () => {
  Whispers.getInstance().update({});
});
