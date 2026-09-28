"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

it("grows the objective frame and renders a converted public card outside secrets", () => {
  const rows = [];
  const parent = { appendChild: (row) => rows.push(row) };
  const makeRow = () => {
    const name = { style: {}, innerText: "" };
    const score = { style: {}, innerText: "", innerHTML: "" };
    return {
      parentNode: parent,
      cloneNode: makeRow,
      getElementsByClassName: (kind) =>
        kind === "objective-name" ? [name] : [score],
      name,
      score,
    };
  };
  for (let i = 0; i < 17; i++) rows.push(makeRow());

  const objective = (name, scoredBy = []) => ({
    name,
    abbr: name,
    scoredBy,
  });
  const groups = {
    stage1: Array.from({ length: 10 }, (_, i) => objective(`Stage I ${i}`)),
    stage2: Array.from({ length: 5 }, (_, i) => objective(`Stage II ${i}`)),
    extraPublic: [objective("Converted Secret", ["white"])],
    secret: [],
    custodians: [objective("custodians")],
    sftt: [],
    other: [objective("Other A"), objective("Other B")],
  };
  const context = {
    document: { getElementsByClassName: () => rows },
    window: { addEventListener() {} },
    BroadcastChannel: class {},
    console,
    GameDataUtil: {
      parsePlayerDataArray: (data) => data.players,
      parsePlayerColor: () => ({ colorName: "white", colorHex: "#fff" }),
      parseObjectives: () => groups,
      colorNameToHex: () => "#ffde17",
    },
  };
  const source = fs.readFileSync(
    path.join(__dirname, "refresh-objectives.js"), "utf8"
  );
  vm.runInNewContext(source + "\nthis.Objectives = Objectives;", context);
  new context.Objectives().update({ players: [{}] });

  assert.equal(rows.length, 21);
  assert.equal(rows[15].name.innerText, "Converted Secret");
  assert.equal(rows[15].name.style.backgroundColor, "#ffde17");
  assert.equal(rows[15].score.style.backgroundColor, "#fff");
  assert.equal(rows[16].name.innerText, "Secrets");
  assert.equal(rows[16].score.innerText, "");
});
