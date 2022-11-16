/**
 * Fetch gamedata json at regular inverals, using last-modified timestamp to
 * avoid processing already-delivered results.
 *
 * Include this script and register an 'onGameDataUpdate' event listener:
 *
 * window.addEventListener("onGameDataUpdate", (event) => {
 *   console.log(`onGameDataUpdate ${event.detail.timestamp}`);
 * });
 */

const VERBOSE = true;
function DEBUG_LOG(msg) {
  if (!VERBOSE) {
    return;
  }
  console.log(msg);
}

let _lastModified = "n/a";

const processResponse = (response) => {
  DEBUG_LOG(
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
      DEBUG_LOG(`processRespone response status ${response.status}`);
    }
    return;
  }

  // The above 304 check fails if the cache rewrites it to a 200 using cached
  // content.  Consult the last-modified time, only process if different.
  const lastModified = response.headers.get("Last-Modified");
  if (lastModified && lastModified === _lastModified) {
    DEBUG_LOG("processRespone last modified unchanged");
    return;
  }
  _lastModified = lastModified; // remember

  // Report update to listeners via a custom event. The event extra data
  // MUST be stored using the reserved key 'detail'.
  response.json().then((json) => {
    const event = new CustomEvent("onGameDataUpdate", { detail: json });
    window.dispatchEvent(event);
  });
};

const processError = (error) => {
  DEBUG_LOG(`ERROR "${error}`);
};

const loopFetch = () => {
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
  DEBUG_LOG(`loopFetch url=${url} options=${JSON.stringify(options)}`);
  fetch(url, options).then(processResponse).catch(processError);
};

window.addEventListener("DOMContentLoaded", (window, event) => {
  setInterval(loopFetch, 3000);
  loopFetch(); // run immediately too
});
