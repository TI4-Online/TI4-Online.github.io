// jest overlay/scripts/game-data-util.test.js

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const { GameDataUtil } = require("./game-data-util");

// The escape function relies on browser features.
GameDataUtil._escapeForHTML = (string) => {
  return string;
};

function getGameData() {
  const filename = path.join(__dirname, "../demo/demo.json");
  const content = fs.readFileSync(filename).toString();
  return JSON.parse(content);
}

it("getGameData", () => {
  const gameData = getGameData();
  assert.equal(gameData.timestamp, 1670088961);
});

it("parseCurrentTurnColorName", () => {
  const gameData = getGameData();
  const currentTurn = GameDataUtil.parseCurrentTurnColorName(gameData);
  assert.equal(currentTurn, "red");
});

it("parseObjectives", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const objectives = GameDataUtil.parseObjectives(gameData);
  assert.deepEqual(objectives, {
    custodians: [{ name: "custodians", scoredBy: ["green"] }],
    other: [{ name: "Shard of the Throne", scoredBy: ["red"] }],
    secret: [
      { name: "Seize an Icon", scoredBy: ["white"] },
      { name: "Occupy the Seat of the Empire", scoredBy: ["yellow"] },
      { name: "Threaten Enemies", scoredBy: ["purple"] },
      { name: "Mechanize the Military", scoredBy: ["blue"] },
      { name: "Unveil Flagship", scoredBy: ["white"] },
    ],
    sftt: [
      { name: "Support for the Throne (Yellow)", scoredBy: ["purple"] },
      { name: "Support for the Throne (Blue)", scoredBy: ["white"] },
      { name: "Support for the Throne (Purple)", scoredBy: ["white"] },
      { name: "Support for the Throne (Green)", scoredBy: ["white"] },
    ],
    stage1: [
      { name: "Lead From the Front", scoredBy: ["purple", "green"] },
      {
        name: "Sway the Council",
        scoredBy: ["blue", "purple", "yellow", "green"],
      },
      {
        name: "Populate the Outer Rim",
        scoredBy: ["white", "blue", "purple", "red"],
      },
      { name: "Engineer a Marvel", scoredBy: [] },
    ],
    stage2: [{ name: "Hold Vast Reserves", scoredBy: [] }],
  });
});

it("parsePlayerActive", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const active = GameDataUtil.parsePlayerActive(playerDataArray[0]);
  assert.equal(active, true);
});

it("parsePlayerColor", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const color = GameDataUtil.parsePlayerColor(playerDataArray[0]);
  assert.equal(color.colorName, "white");
});

it("parsePlayerDataArray", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  assert.equal(playerDataArray.length, 6);
  assert.equal(playerDataArray[0].score, 2);
});

it("parsePlayerFaction", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const faction = GameDataUtil.parsePlayerFaction(playerDataArray[0]);
  assert.equal(faction, "vuilraith");
});

it("parsePlayerName", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const playerName = GameDataUtil.parsePlayerName(playerDataArray[0]);
  assert.equal(playerName, "thc");
});

it("parsePlayerScore", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const score = GameDataUtil.parsePlayerScore(playerDataArray[0]);
  assert.equal(score, 2);
});

it("parsePlayerStrategyCards", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const strategyCards = GameDataUtil.parsePlayerStrategyCards(
    playerDataArray[0]
  );
  assert.deepEqual(strategyCards, [{ faceDown: true, name: "Politics" }]);
});

it("parseRound", () => {
  const gameData = getGameData();
  const round = GameDataUtil.parseRound(gameData);
  assert.equal(round, 3);
});

it("parseSpeakerColorName", () => {
  const gameData = getGameData();
  const speakerColorName = GameDataUtil.parseSpeakerColorName(gameData);
  assert.equal(speakerColorName, "green");
});
