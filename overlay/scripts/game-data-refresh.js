/**
 * Fetch gamedata json at regular inverals, using last-modified timestamp to
 * avoid processing already-delivered results.
 *
 * Include this script and register an event listener for any of the following:
 * - onGameDataStart : fetch loop started
 * - onGameDataStop : fetch loop stopped
 * - onGameDataUpdate : new data (parsed JSON object in event.detail)
 * - onGameDataNotModified : received data has not changed
 * - onGameDataError : response error (string in event.detail)
 *
 * window.addEventListener("onGameDataUpdate", (event) => {
 *   console.log(`onGameDataUpdate ${event.detail.timestamp}`);
 * });
 *
 * Putting this in a class is primarily for namespace isolation.
 */
class GameDataRefresh {
  static getInstance() {
    if (!GameDataRefresh.__instance) {
      GameDataRefresh.__instance = new GameDataRefresh();
    }
    return GameDataRefresh.__instance;
  }

  constructor() {
    this._loopFetchHandle = undefined;
    this._lastModified = undefined;
    this._refreshInterval = 3000;
    this._verbose = false;
    this._stopOnError = false;
    this._demo = false;

    // Handlers for class functions.
    this._processResponseHandler = (v) => {
      this._processResponse(v);
    };
    this._procesErrorHandler = (v) => {
      this._processError(v);
    };
    this._loopFetchHandler = () => {
      this._loopFetch();
    };
  }

  setRefreshIntervalMsecs(value) {
    if (this._loopFetchHandle) {
      throw new Error("cannot set inverval after start");
    }
    this._refreshInterval = value;
    return this;
  }

  setVerbose(value) {
    this._verbose = value;
    return this;
  }

  setStopOnError(value) {
    this._stopOnError = value;
    return this;
  }

  isStarted() {
    return this._loopFetchHandle ? true : false;
  }

  start() {
    console.log("GameDataRefresh.start");

    // Do before calling loopfetch to happen before update event.
    const event = new CustomEvent("onGameDataStart");
    window.dispatchEvent(event);

    if (this._loopFetchHandle) {
      clearInterval(this._loopFetchHandle);
      this._loopFetchHandle = undefined;
    }

    this._loopFetchHandle = setInterval(
      this._loopFetchHandler,
      this._refreshInterval
    );
    this._loopFetchHandler(); // run immediately too
    return this;
  }

  stop() {
    console.log("GameDataRefresh.stop");

    const event = new CustomEvent("onGameDataStop");
    window.dispatchEvent(event);

    clearInterval(this._loopFetchHandle);
    this._loopFetchHandle = undefined;
    return this;
  }

  setDemoGameData(value) {
    this._demo = value;
    return this;
  }

  debugLog(msg) {
    if (this._verbose) {
      console.log(msg);
    }
  }

  _processResponse(response) {
    this.debugLog(
      `processResponse ${JSON.stringify({
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        body: response.body,
      })}`
    );

    // Check if the response is "not modified" from our if-modified-since request.
    if (response.status === 304) {
      const event = new CustomEvent("onGameDataNotModified");
      window.dispatchEvent(event);
      return; // not modified
    }

    // Abort if error.
    if (!response.ok) {
      let errorString;
      if (response.status === 404) {
        errorString = `no data, type "!buddy" in chat to start`;
      } else {
        errorString = `response status code ${response.status}`;
      }
      const event = new CustomEvent("onGameDataError", {
        detail: errorString,
      });
      window.dispatchEvent(event);

      if (this._stopOnError) {
        this.stop();
      }
      return;
    }

    // The above 304 check fails if the cache rewrites it to a 200 using cached
    // content.  Consult the last-modified time, only process if different.
    const lastModified = response.headers.get("Last-Modified");
    if (lastModified && lastModified === this._lastModified) {
      this.debugLog("processRespone last modified unchanged");
      const event = new CustomEvent("onGameDataNotModified");
      window.dispatchEvent(event);
      return;
    }
    this._lastModified = lastModified; // remember

    // Report update to listeners via a custom event. The event extra data
    // MUST be stored using the reserved key 'detail'.
    response.json().then((json) => {
      const event = new CustomEvent("onGameDataUpdate", { detail: json });
      window.dispatchEvent(event);
    });
  }

  _processError(error) {
    this.debugLog(`ERROR "${error}"`);

    // Replace "TypeError: failed to fetch" with a more direct error message.
    let errorString = `${error}`;
    if (errorString.toLowerCase().includes("failed to fetch")) {
      errorString = "Server (TI4 Streamer Buddy) not running?";
    }

    const event = new CustomEvent("onGameDataError", {
      detail: errorString,
    });
    window.dispatchEvent(event);

    if (this._stopOnError) {
      this.stop();
    }
  }

  _loopFetch() {
    // If response includes Last-Modified header chrome will set the if-modified-since
    // header for us.  We cannot set it manually due to CORS restrictions.
    const protocol = location.protocol;
    const port = protocol === "http:" ? 8080 : 8081;
    let url = `${protocol}//localhost:${port}/data?key=buddy`;
    if (this._demo) {
      url = "/overlay/demo/demo.json";
    }
    const options = {
      method: "GET",
      headers: {},
      mode: "cors",
    };
    this.debugLog(`loopFetch url=${url} options=${JSON.stringify(options)}`);
    fetch(url, options)
      .then(this._processResponseHandler)
      .catch(this._procesErrorHandler);
  }
}

window.addEventListener("DOMContentLoaded", (window, event) => {
  const gameDataRefresh = GameDataRefresh.getInstance() // config here
    .setStopOnError(true)
    .setVerbose(false);

  const queryString = document.location.search;
  console.log(`XXX ${queryString}`);
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get("demo") === "true") {
    console.log("GameDataRefresh: using demo URL");
    gameDataRefresh.setDemoGameData(true);
  }

  // Start after a short delay, make sure other scripts have event
  // listeners set up, etc.
  setTimeout(() => {
    if (!gameDataRefresh.isStarted()) {
      gameDataRefresh.start();
    }
  }, 100);
});
