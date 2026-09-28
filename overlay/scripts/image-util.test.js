const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

it("loads only overlay-specific tokens from the website", () => {
  const source = fs.readFileSync(path.join(__dirname, "image-util.js"), "utf8");
  const context = { console, location: { protocol: "https:" } };
  vm.runInNewContext(source + "\nthis.ImageUtil = ImageUtil;", context);
  const getSrc = context.ImageUtil.getSrc;

  assert.equal(
    getSrc("tokens/tradegood_1.png"),
    "https://localhost:8081/static/images/tokens/tradegood_1.png"
  );
  assert.equal(
    getSrc("tokens/commodity_1.png"),
    "https://localhost:8081/static/images/tokens/commodity_1.png"
  );
  assert.equal(
    getSrc("tokens/exploration_cybernetic.png"),
    "https://localhost:8081/static/images/tokens/exploration_cybernetic.png"
  );
  for (const token of ["speaker_square.png", "benediction_square.png"]) {
    assert.equal(
      getSrc("tokens/" + token),
      "https://ti4-online.github.io/overlay/images/tokens/" + token
    );
  }
  assert.equal(
    getSrc("faction-icons/xxcha_icon.png"),
    "https://ti4-online.github.io/overlay/images/faction-icons/xxcha_icon.png"
  );
});
