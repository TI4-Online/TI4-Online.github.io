/**
 * Fetch gamedata json at regular inverals, using last-modified timestamp to
 * avoid processing already-delivered results.
 *
 * Include this script and register an 'onGameDataUpdate' event listener:
 *
 * window.addEventListener("onGameDataUpdate", (event) => {
 *   console.log(`onGameDataUpdate ${event.detail.timestamp}`);
 * });
 *
 * Putting this in a class is primarily for namespace isolation.
 */
class GameDataRefresh {
  constructor() {
    this._loopFetchHandle = undefined;
    this._lastModified = undefined;
    this._refreshInterval = 3000;
    this._verbose = false;

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

  start() {
    this._loopFetchHandle = setInterval(
      this._loopFetchHandler,
      this._refreshInterval
    );
    this._loopFetchHandler(); // run immediately too
    return this;
  }

  stop() {
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
      return; // not modified
    }

    // Stop if error.  Report the status code if other than "not found"
    if (response.status !== 200) {
      if (response.status !== 404) {
        this.debugLog(`processRespone response status ${response.status}`);
      }
      return;
    }

    // The above 304 check fails if the cache rewrites it to a 200 using cached
    // content.  Consult the last-modified time, only process if different.
    const lastModified = response.headers.get("Last-Modified");
    if (lastModified && lastModified === this._lastModified) {
      this.debugLog("processRespone last modified unchanged");
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
    this.debugLog(`ERROR "${error}`);
  }

  _loopFetch() {
    // If response includes Last-Modified header chrome will set the if-modified-since
    // header for us.  We cannot set it manually due to CORS restrictions.
    const protocol = location.protocol;
    const port = protocol === "http:" ? 8080 : 8081;
    const url = `${protocol}//localhost:${port}/data?key=buddy`;
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
  new GameDataRefresh().start();
});
