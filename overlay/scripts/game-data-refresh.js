"use strict";

/**
 * Fetch gamedata json at regular inverals, using last-modified timestamp to
 * avoid processing already-delivered results.
 *
 * Include this script and register an "onGameDataEvent" broadcast channel.
 * Event messages are objects, with event.type from:
 *
 * - START : fetch loop started
 * - STOP : fetch loop stopped
 * - UPDATE : new data (parsed JSON object in event.detail)
 * - NOT_MODIFIED : received data has not changed
 * - ERROR : response error (string in event.detail)
 *
 * new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
 *   console.log(`onGameDataEvent ${event.data.type}`);
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

    this._broadcastChannel = new BroadcastChannel("onGameDataEvent");
    this._lastJson = undefined;

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
    this._broadcastChannel.postMessage({
      type: "START",
    });

    if (this._loopFetchHandle) {
      clearInterval(this._loopFetchHandle);
      this._loopFetchHandle = undefined;
    }

    // Periodic refresh.
    this._loopFetchHandle = setInterval(
      this._loopFetchHandler,
      this._refreshInterval
    );

    // Run "immediately" but give others a moment to set up.
    setTimeout(() => {
      this._loopFetchHandler();
    }, 500);
    return this;
  }

  stop() {
    console.log("GameDataRefresh.stop");

    this._broadcastChannel.postMessage({
      type: "STOP",
    });

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
      this._broadcastChannel.postMessage({
        type: "NOT_MODIFIED",
        detail: this._lastJson,
      });
      return; // not modified
    }

    // Abort if error.
    if (!response.ok) {
      let errorString;
      if (response.status === 404) {
        errorString = `type "!buddy" in chat to start`;
      } else {
        errorString = `response status code ${response.status}`;
      }
      this._broadcastChannel.postMessage({
        type: "ERROR",
        detail: errorString,
      });

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
      this._broadcastChannel.postMessage({
        type: "NOT_MODIFIED",
        detail: this._lastJson,
      });
      return;
    }
    this._lastModified = lastModified; // remember

    // Report update to listeners via a custom event. The event extra data
    // MUST be stored using the reserved key 'detail'.
    response.json().then((json) => {
      this._lastJson = json;
      this._broadcastChannel.postMessage({
        type: "UPDATE",
        detail: json,
      });
    });
  }

  _processError(error) {
    this.debugLog(`ERROR "${error}"`);

    // Replace "TypeError: failed to fetch" with a more direct error message.
    let errorString = `${error}`;
    if (errorString.toLowerCase().includes("failed to fetch")) {
      errorString = "Server (TI4 Streamer Buddy) not running?";
    }

    this._broadcastChannel.postMessage({
      type: "ERROR",
      detail: errorString,
    });

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
      headers: {
        "Cache-Control": "no-store",
      },
      mode: "cors",
    };
    this.debugLog(`loopFetch url=${url} options=${JSON.stringify(options)}`);
    fetch(url, options)
      .then(this._processResponseHandler)
      .catch(this._procesErrorHandler);
  }
}

// Only run in the top-most window.  Allows iframe content to pop-out.
if (window.self === window.top) {
  window.addEventListener("DOMContentLoaded", (window, event) => {
    const queryString = document.location.search;
    const urlParams = new URLSearchParams(queryString);
    const useDemoData = urlParams.get("demo") === "true";
    const stopOnError = urlParams.get("stop") === "true";
    const verbose = urlParams.get("verbose") === "true";

    GameDataRefresh.getInstance()
      .setStopOnError(stopOnError)
      .setVerbose(verbose)
      .setDemoGameData(useDemoData)
      .start();
  });
}
