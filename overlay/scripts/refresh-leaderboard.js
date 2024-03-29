"use strict";

function capitalizeFirstLetter(string) {
  console.assert(typeof string === "string");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Leaderboard {
  static getInstance() {
    if (!Leaderboard.__instance) {
      Leaderboard.__instance = new Leaderboard();
    }
    return Leaderboard.__instance;
  }

  constructor() {
    this._passedBgColor = "#414042";
    this._activeTurnBgColor = "#193a7d";

    this._playerCells = [];

    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.fillAll(event.data.detail);
      }
    };
  }

  /**
   * Return an array of table cells for the given player count.
   * Mark the cells visibile, hide any extra.
   *
   * @param {number} playerCount
   * @return {Array.{object}}
   */
  getLeaderboardCells(playerCount) {
    console.assert(typeof playerCount === "number");

    if (this._playerCells.length === playerCount) {
      return this._playerCells;
    }

    const upper = [
      document.getElementById("leaderboard-0-0"),
      document.getElementById("leaderboard-0-1"),
      document.getElementById("leaderboard-0-2"),
      document.getElementById("leaderboard-0-3"),
    ];
    const lower = [
      document.getElementById("leaderboard-1-3"),
      document.getElementById("leaderboard-1-2"),
      document.getElementById("leaderboard-1-1"),
      document.getElementById("leaderboard-1-0"),
    ];

    const lowerCount = Math.min(Math.floor(playerCount / 2), 4);
    const upperCount = Math.min(Math.ceil(playerCount / 2), 4);

    // Extract the leaderboard cells, clockwise from
    // lower right.
    const result = [];
    result.push(...lower.slice(0, lowerCount));
    result.push(...upper.slice(0, upperCount));
    result.forEach((cell) => {
      cell.style.display = "";
    });

    // Any unused cells should be hidden.
    const hide = [];
    hide.push(...lower.slice(lowerCount));
    hide.push(...upper.slice(upperCount));
    hide.forEach((cell) => {
      cell.style.display = "none";
    });

    this._playerCells = result;

    return result;
  }

  fillFaction(cell, faction, color) {
    console.assert(typeof cell === "object");
    console.assert(typeof faction === "string");
    console.assert(typeof color === "string");

    console.assert(FACTION_WHITELIST.has(faction), `bad faction ${faction}`);

    const factionIconImg = cell.getElementsByClassName("faction-icon")[0];
    console.assert(factionIconImg);
    const src = ImageUtil.getSrc(`faction-icons/${faction}_icon.png`);
    if (factionIconImg.src !== src) {
      factionIconImg.src = src;
    }

    const factionNameDiv = cell.getElementsByClassName("faction-name")[0];
    console.assert(factionNameDiv);
    factionNameDiv.textContent = faction.toUpperCase();
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
    const src = ImageUtil.getSrc(`tokens/speaker_square.png`);
    if (factionIconImg.src !== src) {
      factionIconImg.src = src;
    }
  }

  fillAll(gameData) {
    console.assert(typeof gameData === "object");

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    console.assert(Array.isArray(playerDataArray));

    const currentTurnColorName =
      GameDataUtil.parseCurrentTurnColorName(gameData);
    console.assert(typeof currentTurnColorName === "string");

    const playerCount = playerDataArray.length;
    const cells = this.getLeaderboardCells(playerCount);

    cells.forEach((cell, index) => {
      const playerData = playerDataArray[index];
      console.assert(playerData);

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
    });

    const speakerColorName = GameDataUtil.parseSpeakerColorName(gameData);
    cells.forEach((cell, index) => {
      const playerData = playerDataArray[index];
      console.assert(playerData);

      const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
      if (colorNameAndHex.colorName === speakerColorName) {
        this.fillSpeaker(cell);
      }
    });
  }
}

// Run with the standard value until told otherwise.
window.addEventListener("load", () => {
  const gameData = {}; // fill with default 6p empty game
  Leaderboard.getInstance().fillAll(gameData);
});
