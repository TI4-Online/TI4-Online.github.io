const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function element() {
  return { style: {}, children: [], set innerHTML(value) { this.children = []; },
    appendChild(child) { this.children.push(child); } };
}

it("loads icon helpers and renders every technology column", () => {
  const html = fs.readFileSync(path.join(__dirname, "../frames/technology.html"), "utf8");
  assert(html.indexOf("/overlay/scripts/image-util.js") <
    html.indexOf("/overlay/scripts/refresh-technology.js"));

  const headers = Array.from({ length: 8 }, element);
  const columns = Array.from({ length: 8 }, element);
  const table = { getElementsByClassName: (name) =>
    name === "tech-header" ? headers : columns };
  const context = {
    document: { getElementById: () => table, createElement: element },
    window: { addEventListener() {} },
    BroadcastChannel: class {},
    console,
    ImageUtil: { getSrc: (name) => `/buddy/${name}` },
    GameDataUtil: {
      parsePlayerDataArray: (data) => data.players,
      parsePlayerColor: (player) => ({ colorHex: player.hex }),
      parsePlayerFaction: (player) => player.faction,
      parsePlayerTechnologies: (player) => player.technologies,
      colorNameToHex: (name) => ({ red: "#f00", white: "#fff" })[name],
    },
  };
  const source = fs.readFileSync(path.join(__dirname, "refresh-technology.js"), "utf8");
  vm.runInNewContext(source + "\nthis.Technology = Technology;", context);
  new context.Technology().update({ players: [
    { faction: "xxcha", hex: "#fff", technologies: [] },
    { faction: "norr", hex: "#0af", technologies: [
      { name: "Plasma Scoring", colorName: "red" }] },
    { faction: "mentak", hex: "#f0f", technologies: [
      { name: "Faction Tech", colorName: "white" }] },
  ] });
  assert.equal(columns[0].children.length, 0);
  assert.equal(columns[1].children[0].children[0].innerText, "Plasma Scoring");
  assert.equal(columns[1].children[0].children[1].src,
    "/overlay/images/technology/WarfareTech.png");
  assert.equal(columns[2].children[0].children.length, 1);
  assert.equal(headers[2].innerText, "mentak");
});
