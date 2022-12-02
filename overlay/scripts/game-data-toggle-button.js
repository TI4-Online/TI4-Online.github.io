/**
 * Add a button with id 'game-data-toggle-button' to have this manage it.
 */
class GameDataToggle {
  static getInstance() {
    if (!GameDataToggle.__instance) {
      GameDataToggle.__instance = new GameDataToggle();
    }
    return GameDataToggle.__instance;
  }

  constructor() {
    this._toggleButton = undefined;
    this._gameDataIsActive = false;

    window.addEventListener("onGameDataStart", (event) => {
      this._gameDataIsActive = true;
      this._updateToggleButton();
    });
    window.addEventListener("onGameDataStop", (event) => {
      this._gameDataIsActive = false;
      this._updateToggleButton();
    });
  }

  setToggleButton(button) {
    this._toggleButton = button;

    this._toggleButton.addEventListener("click", () => {
      console.log("GameDataToggle.toggleButton.onClick");
      this._toggle();
    });

    this._updateToggleButton();
    return this;
  }

  _updateToggleButton() {
    if (!this._toggleButton) {
      return;
    }
    if (this._gameDataIsActive) {
      this._toggleButton.innerText = "Auto-refresh ACTIVE, click to stop";
    } else {
      this._toggleButton.innerText = "Auto-refresh STOPPED, click to start";
    }
  }

  _toggle() {
    if (this._gameDataIsActive) {
      GameDataRefresh.getInstance().stop();
    } else {
      GameDataRefresh.getInstance().start();
    }
  }
}

window.addEventListener("DOMContentLoaded", (window, event) => {
  const button = document.getElementById("game-data-toggle-button");
  if (!button) {
    console.error("GameDataToggle: missing 'game-data-toggle-button' element");
    return;
  }
  GameDataToggle.getInstance().setToggleButton(button);
});
