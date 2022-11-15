# TI4-Online.github.io

## Streamer Overlay

TTPG pushes game data to a local streamer proxy, the overlay reads it.

### Authorize local streamer proxy

The overlay is hosted on Github pages, which requires HTTPS secure connections and in turn uses a secure connection to read game data from the local streamer proxy.  The proxy provides a "self-signed certificate" but you need to authorize it.  Paste this into the Chrome address bar:

`chrome://flags/#allow-insecure-localhost`

Enable the first option, "Allow invalid certificates for resources loaded from localhost".

