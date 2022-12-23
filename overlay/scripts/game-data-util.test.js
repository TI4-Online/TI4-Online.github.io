"use strict";

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

it("parseHexSummary", () => {
  const gameData = getGameData();
  const hexSummary = GameDataUtil.parseHexSummary(gameData);
  assert.equal(
    hexSummary,
    "3+3+3Gdy2f;Gs4i,7+0+6Rdi3f1t;Rimps,14+0-6;Bimps;,16-3+3Y3f;Yo;Yis;Yo,18+0+0RtWcdh3f1t;W2m3i,23+0+4Rcf;Rmp,24-3+1;Yo,25+2+0;Gi;,26-1-3;Bm;,27+1+5;Ri*i;Ro,30-3-1Yf2d1t;Yi;Pi,31+3+1Wd;Wi;Gi,35-1-5;Bis*W;Bi,36+1-1Wcf*h;Wo;Ws3i,37+2+2BtPtRtWtYt;Go;Gi,40+1-3Brt;,41+1+1Gy*n,42+1-5Br,45-2+4*e,46-2-4Bcf,47+2-2,48-1+5,49+2+4Gc2f1t,50-1+1*e,54+3-3Wi*h;Ws2i,58-3-3Pf2d;Pimps;P2i;P2i,59+3-1Wd;Wi,61-1-1Py;Pi,62+0+2Rd;Rmp,63-2-2Pyt;Pi,64-1+3Ycfr;Yi;,65+2-4Wd;Wp3i,67-2+0Pcft;Po,72+0-2Bcf;Bm;Bim,75-2+2;Yo*d;Yo*z;Yo,78+0-4*e,79+1+3*e;,82+5-1;;"
  );
});

it("parseLaws", () => {
  const gameData = getGameData();
  const laws = GameDataUtil.parseLaws(gameData);
  assert.deepEqual(laws, [
    {
      name: "Committee Formation",
      players: [{ colorHex: "#6EC1E4", colorName: "blue" }],
    },
    {
      name: "Representative Government",
      players: [],
    },
  ]);
});

it("parseObjectives", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const objectives = GameDataUtil.parseObjectives(gameData);
  assert.deepEqual(objectives, {
    custodians: [
      { abbr: "custodians", name: "custodians", scoredBy: ["green"] },
    ],
    other: [
      {
        abbr: "Shard of the Throne",
        name: "Shard of the Throne",
        scoredBy: ["red"],
      },
    ],
    secret: [
      { abbr: "LEGENDARY PLANET", name: "Seize an Icon", scoredBy: ["white"] },
      {
        abbr: "MR W/ 3 SHIPS",
        name: "Occupy the Seat of the Empire",
        scoredBy: ["yellow"],
      },
      {
        abbr: "SYS ADJ TO HOME",
        name: "Threaten Enemies",
        scoredBy: ["purple"],
      },
      {
        abbr: "4 PLANETS W/ MECH",
        name: "Mechanize the Military",
        scoredBy: ["blue"],
      },
      { abbr: "WIN W/ FLAGSHIP", name: "Unveil Flagship", scoredBy: ["white"] },
    ],
    sftt: [
      {
        abbr: "Support for the Throne (Yellow)",
        name: "Support for the Throne (Yellow)",
        scoredBy: ["purple"],
      },
      {
        abbr: "Support for the Throne (Blue)",
        name: "Support for the Throne (Blue)",
        scoredBy: ["white"],
      },
      {
        abbr: "Support for the Throne (Purple)",
        name: "Support for the Throne (Purple)",
        scoredBy: ["white"],
      },
      {
        abbr: "Support for the Throne (Green)",
        name: "Support for the Throne (Green)",
        scoredBy: ["white"],
      },
    ],
    stage1: [
      {
        abbr: "3 COMMAND TOKENS",
        name: "Lead From the Front",
        scoredBy: ["purple", "green"],
      },
      {
        abbr: "8 INFLUENCE",
        name: "Sway the Council",
        scoredBy: ["blue", "purple", "yellow", "green"],
      },
      {
        abbr: "3 EDGE SYS",
        name: "Populate the Outer Rim",
        scoredBy: ["white", "blue", "purple", "red"],
      },
      { abbr: "FLAG/WAR SUN", name: "Engineer a Marvel", scoredBy: [] },
    ],
    stage2: [
      { abbr: "6 INF 6 RES 6 TG", name: "Hold Vast Reserves", scoredBy: [] },
    ],
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
  assert.equal(playerName, "Player Name");
});

it("parsePlayerResources", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const resources = GameDataUtil.parsePlayerResources(playerDataArray[0]);
  assert.deepEqual(resources, {
    alliances: ["blue"],
    commodities: 2,
    influence: { avail: 2, total: 13 },
    leaders: { commander: "locked", hero: "locked" },
    resources: { avail: 9, total: 12 },
    teckSkips: { blue: 1, green: 0, red: 0, yellow: 1 },
    tokens: { fleet: 4, strategy: 1, tactics: 4 },
    tradegoods: 7,
    traits: { cultural: 1, hazardous: 1, industrial: 3 },
  });
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

it("parsePlayerTechnologies", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const technologies = GameDataUtil.parsePlayerTechnologies(playerDataArray[0]);
  assert.deepEqual(technologies, [
    { colorHex: "#e46d72", colorName: "red", name: "Self Assembly Routines" },
    { colorHex: "#e46d72", colorName: "red", name: "Vortex" },
    { colorHex: "#e46d72", colorName: "red", name: "Duranium Armor" },
    { colorHex: "#FFFFFF", colorName: "white", name: "Carrier II" },
    { colorHex: "#FFFFFF", colorName: "white", name: "Fighter II" },
    { colorHex: "#FFFFFF", colorName: "white", name: "Dimensional Tear II" },
  ]);
});

it("parsePlayerUnitUpgrades", () => {
  const gameData = getGameData();
  const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
  const unitUpgrades = GameDataUtil.parsePlayerUnitUpgrades(playerDataArray[0]);
  assert.deepEqual(unitUpgrades, ["carrier", "fighter", "space_dock"]);
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

it("parseWhispers", () => {
  const gameData = getGameData();
  const whispers = GameDataUtil.parseWhispers(gameData);
  assert.equal(whispers.length, 8);
  assert.deepEqual(whispers[0], {
    backwardStr:
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&nbsp;&nbsp;&nbsp;&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;",
    colorHexA: "#00a14b",
    colorHexB: "#e46d72",
    colorNameA: "green",
    colorNameB: "red",
    forwardStr:
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  });
});
