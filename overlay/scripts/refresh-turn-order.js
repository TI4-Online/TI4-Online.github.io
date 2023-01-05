"use strict";

function capitalizeFirstLetter(string) {
  console.assert(typeof string === "string");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class TurnOrder {
  static getInstance() {
    if (!TurnOrder.__instance) {
      TurnOrder.__instance = new TurnOrder();
    }
    return TurnOrder.__instance;
  }

  constructor() {
    const elementId = "turn-order";
    const div = document.getElementById(elementId);
    if (!div) {
      throw new Error(`Missing element id "${elementId}"`);
    }

    this._cells = [...div.getElementsByClassName("turn-order-cell")];

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.fillAll(event.data.detail);
      }
    };
  }

  fillFaction(cell, faction, color) {
    console.assert(typeof cell === "object");
    console.assert(typeof faction === "string");
    console.assert(typeof color === "string");

    console.assert(FACTION_WHITELIST.has(faction), `bad faction ${faction}`);

    const factionIconImg = cell.getElementsByClassName("faction-icon")[0];
    console.assert(factionIconImg);
    factionIconImg.src = ImageUtil.getSrc(`faction-icons/${faction}_icon.png`);

    const factionNameDiv = cell.getElementsByClassName("faction-name")[0];
    console.assert(factionNameDiv);
    factionNameDiv.textContent = capitalizeFirstLetter(faction);
    factionNameDiv.style.color = color;
  }

  fillPlayerName(cell, playerName, color, active) {
    console.assert(typeof cell === "object");
    console.assert(typeof playerName === "string");
    console.assert(typeof color === "string");

    const playerNameDiv = cell.getElementsByClassName("player-name")[0];
    console.assert(playerNameDiv);
    playerNameDiv.innerHTML = active
      ? playerName
      : `<s><i>&nbsp;${playerName}&nbsp;</i></s>`;
    playerNameDiv.style.color = color;
  }

  fillScore(cell, score, color) {
    console.assert(typeof cell === "object");
    console.assert(typeof score === "number");
    console.assert(typeof color === "string");

    const scoreDiv = cell.getElementsByClassName("score")[0];
    console.assert(scoreDiv);
    scoreDiv.textContent = score.toString();
    scoreDiv.style.color = color;
  }

  fillStrategyCards(cell, strategyCards, color) {
    console.assert(typeof cell === "object");
    console.assert(Array.isArray(strategyCards));
    console.assert(typeof color === "string");

    // Use strikethrough for played strategy cards, thus generate
    // HTML instead of text.
    const html = strategyCards
      .map((data) => {
        const name = capitalizeFirstLetter(data.name);
        return data.faceDown ? `<s><i>&nbsp;${name}&nbsp;</i></s>` : name;
      })
      .join(", ");

    const strategyCardsDiv = cell.getElementsByClassName("strategy-cards")[0];
    console.assert(strategyCardsDiv);
    strategyCardsDiv.innerHTML = html;
    strategyCardsDiv.style.color = color;
  }

  fillBackgroundColor(cell, isCurrentTurn, color) {
    console.assert(typeof cell === "object");
    console.assert(typeof isCurrentTurn === "boolean");
    console.assert(typeof color === "string");

    let fgColor = color;
    let bgColor = "unset";

    if (isCurrentTurn) {
      fgColor = "black";
      bgColor = color;
    }
    cell.style.backgroundColor = bgColor;

    const factionNameDiv = cell.getElementsByClassName("faction-name")[0];
    const playerNameDiv = cell.getElementsByClassName("player-name")[0];
    const scoreDiv = cell.getElementsByClassName("score")[0];
    const strategyCardsDiv = cell.getElementsByClassName("strategy-cards")[0];

    factionNameDiv.style.color = fgColor;
    playerNameDiv.style.color = fgColor;
    scoreDiv.style.color = fgColor;
    strategyCardsDiv.style.color = fgColor;
  }

  fillSpeaker(cell) {
    console.assert(typeof cell === "object");

    const factionIconImg = cell.getElementsByClassName("faction-icon")[0];
    console.assert(factionIconImg);
    factionIconImg.src = ImageUtil.getSrc(`tokens/speaker_square.png`);
  }

  fillAll(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    console.assert(Array.isArray(playerDataArray));
    const colorNameToPlayerData = {};
    for (const playerData of playerDataArray) {
      const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
      colorNameToPlayerData[colorNameAndHex.colorName] = playerData;
    }

    const currentTurnColorName =
      GameDataUtil.parseCurrentTurnColorName(gameData);
    const speakerColorName = GameDataUtil.parseSpeakerColorName(gameData);

    this._cells.forEach((cell) => {
      this.fillFaction(cell, "bobert", "white");
      this.fillPlayerName(cell, "-", "white", false);
      this.fillScore(cell, 0, "white");
      this.fillStrategyCards(cell, [], "white");
      this.fillBackgroundColor(cell, false, "white");
    });

    const turnOrder = GameDataUtil.parseTurnOrder(gameData);
    turnOrder.forEach((colorName, index) => {
      console.log(`xxx ${colorName} ${index}/${this._cells.length}`);
      const playerData = colorNameToPlayerData[colorName];
      const cell = this._cells[index];
      if (!playerData || !cell) {
        return;
      }

      const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
      const faction = GameDataUtil.parsePlayerFaction(playerData);
      const playerName = GameDataUtil.parsePlayerName(playerData);
      const score = GameDataUtil.parsePlayerScore(playerData);
      const strategyCards = GameDataUtil.parsePlayerStrategyCards(playerData);
      const active = GameDataUtil.parsePlayerActive(playerData);

      const color = colorNameAndHex.colorHex;
      const isCurrentTurn = colorNameAndHex.colorName === currentTurnColorName;

      this.fillFaction(cell, faction, color);
      this.fillPlayerName(cell, playerName, color, active);
      this.fillScore(cell, score, color);
      this.fillStrategyCards(cell, strategyCards, color);
      this.fillBackgroundColor(cell, isCurrentTurn, color);

      if (colorNameAndHex.colorName === speakerColorName) {
        this.fillSpeaker(cell);
      }
    });
  }
}

// Run with the standard value until told otherwise.
window.addEventListener("load", () => {
  const gameData = {}; // fill with default 6p empty game
  TurnOrder.getInstance().fillAll(gameData);
});
