"use strict";

/**
 * Fetch simplified gamedata json at regular inverals, using last-modified
 * timestamp to avoid processing already-delivered results.
 *
 * Include this script and register an "onSimplifiedGameDataEvent" broadcast channel.
 * Event messages are objects, with event.type from:
 *
 * - START : fetch loop started
 * - STOP : fetch loop stopped
 * - UPDATE : new data (parsed JSON object in event.detail)
 * - NOT_MODIFIED : received data has not changed
 * - ERROR : response error (string in event.detail)
 *
 * new BroadcastChannel("onSimplifiedGameDataEvent").onmessage = (event) => {
 *   console.log(`onSimplifiedGameDataEvent ${event.data.type}`);
 * };
 *
 * Putting this in a class is primarily for namespace isolation.
 */
class SimplifiedGameDataRefresh {
  static getInstance() {
    if (!SimplifiedGameDataRefresh.__instance) {
      SimplifiedGameDataRefresh.__instance = new SimplifiedGameDataRefresh();
    }
    return SimplifiedGameDataRefresh.__instance;
  }

  constructor() {
    this._loopFetchHandle = undefined;
    this._lastModified = undefined;
    this._refreshInterval = 3000;
    this._verbose = false;
    this._stopOnError = false;
    this._demo = false;

    this._broadcastChannel = new BroadcastChannel("onSimplifiedGameDataEvent");
    this._lastJson = undefined;

    // If response includes Last-Modified header chrome will set the if-modified-since
    // header for us.  We cannot set it manually due to CORS restrictions.
    const protocol = location.protocol;
    const port = protocol === "http:" ? 8080 : 8081;
    this._localhostUrl = `${protocol}//localhost:${port}/data?key=buddy-simplified`;
    this._url = this._localhostUrl;

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
    console.log("SimplifiedGameDataRefresh.start");

    // Do before calling loopfetch to happen before update event.
    this._broadcastChannel.postMessage({
      type: "START",
    });

    if (this._loopFetchHandle) {
      clearInterval(this._loopFetchHandle);
      this._loopFetchHandle = undefined;
    }

    // Watch for remote URLs, reduce fetch frequency.
    if (!this._url.startsWith("/") && !this._url.includes("://localhost")) {
      this._refreshInterval = 60 * 1000;
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
    console.log("SimplifiedGameDataRefresh.stop");

    this._broadcastChannel.postMessage({
      type: "STOP",
    });

    clearInterval(this._loopFetchHandle);
    this._loopFetchHandle = undefined;
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
    let url = this._url;
    const options = {
      method: "GET",
      headers: {
        //"Cache-Control": "no-store", // cannot use with CORS
      },
      mode: "cors",
    };
    this.debugLog(`loopFetch url=${url} options=${JSON.stringify(options)}`);
    fetch(url, options)
      .then(this._processResponseHandler)
      .catch(this._procesErrorHandler);
  }
}

// Unlike the frames setup, ALWAYS register this refresh because the scenes
// will be loaded inside where the Twitch/OBS browser puts it (one per scene).
window.addEventListener("DOMContentLoaded", (window, event) => {
  const queryString = document.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stopOnError = urlParams.get("stop") === "true";
  const verbose = urlParams.get("verbose") === "true";

  SimplifiedGameDataRefresh.getInstance()
    .setStopOnError(stopOnError)
    .setVerbose(verbose)
    .start();
});
console.log("GameDataRefresh");
