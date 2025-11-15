"use strict";

class ImageUtil {
  constructor() {
    throw new Error("static only");
  }

  /**
   * Get the path to images hosted by streamer buddy.
   *
   * @param {string} imagePath - after "images/" dir
   * @returns {string} suitable for Image.src value
   */
  static getSrc(imagePath) {
    console.assert(typeof imagePath === "string");
    return `/overlay/images/${imagePath}`;
    //const protocol = location.protocol;
    //const port = protocol === "http:" ? 8080 : 8081;
    //return `${protocol}//localhost:${port}/static/images/${imagePath}`;
  }

  static colorNameToFilter(colorName) {
    console.assert(typeof colorName === "string");

    // Unfortunately there is no simple tint.  We could get the raw RGBA and manually
    // multiply and cache, but assume native operations will be fast.
    // https://angel-rs.github.io/css-color-filter-generator/
    const colorNameToFilter = {
      mask: "brightness(0) saturate(100%) invert(100%)",
      white:
        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(5%) hue-rotate(185deg) brightness(102%) contrast(101%);",
      blue: "brightness(0) saturate(100%) invert(75%) sepia(24%) saturate(963%) hue-rotate(166deg) brightness(94%) contrast(90%)",
      purple:
        "brightness(0) saturate(100%) invert(44%) sepia(10%) saturate(1930%) hue-rotate(236deg) brightness(96%) contrast(95%)",
      yellow:
        "brightness(0) saturate(100%) invert(93%) sepia(20%) saturate(2680%) hue-rotate(342deg) brightness(106%) contrast(101%)",
      red: "brightness(0) saturate(100%) invert(54%) sepia(46%) saturate(1077%) hue-rotate(313deg) brightness(98%) contrast(82%)",
      green:
        "brightness(0) saturate(100%) invert(30%) sepia(89%) saturate(1237%) hue-rotate(123deg) brightness(108%) contrast(101%)",
      orange:
        "brightness(0) saturate(100%) invert(53%) sepia(97%) saturate(1903%) hue-rotate(345deg) brightness(100%) contrast(101%)",
      pink: "brightness(0) saturate(100%) invert(55%) sepia(60%) saturate(1316%) hue-rotate(297deg) brightness(104%) contrast(101%)",
      black: "brightness(0) saturate(100%)",
    };
    return colorNameToFilter[colorName];
  }

  static colorStringToRGBA(colorString) {
    console.assert(typeof colorString === "string");

    const ctx = new OffscreenCanvas(1, 1).getContext("2d");
    ctx.clearRect(0, 0, 1, 1);

    // Validate by setting a different color and replacing.
    // If replacement takes, it is valid.
    ctx.fillStyle = "#000";
    ctx.fillStyle = colorString;
    const test1 = ctx.fillStyle;
    ctx.fillStyle = "#fff";
    ctx.fillStyle = colorString;
    const test2 = ctx.fillStyle;
    if (test1 !== test2) {
      throw new Error(`Bad colorString "${colorString}"`);
    }

    ctx.fillStyle = colorString;
    ctx.fillRect(0, 0, 1, 1);
    const rgba = ctx.getImageData(0, 0, 1, 1).data;
    console.assert(rgba.length === 4);
    return rgba;
  }

  /**
   * Draw image at location, cache for future use.
   *
   * Will only draw once ready, drawing when images load can break Z order.
   *
   * Bake in expensive resize, filter, shadow, etc operations.
   *
   * Mandatory parameters:
   * - width (number)
   * - height (number)
   *
   * Optional parameters:
   * - color (string) // replace image with color
   * - filter (string)
   * - outlineColor (string)
   * - outlineWidth (number)
   * - shadowColor (string) // outline with fade (outside main outline, if any)
   * - shadowWidth (number)
   * - tintColor (string)
   *
   * @param {Canvas.Context} ctx
   * @param {string} src
   * @param {number} x
   * @param {number} y
   * @param {Object} params
   */
  static drawMagic(ctx, src, x, y, params) {
    console.assert(ctx);
    console.assert(typeof src === "string");
    console.assert(typeof x === "number");
    console.assert(typeof y === "number");
    console.assert(typeof params === "object");

    // Work with a copy so we can mutate it.
    const copy = {};
    for (const [k, v] of Object.entries(params)) {
      copy[k] = v;
    }
    params = copy;

    // Mandatory params.
    console.assert(typeof params.width === "number");
    console.assert(typeof params.height === "number");

    for (const [k, v] of Object.entries(params)) {
      if (v === undefined) {
        delete params[k];
        continue;
      }
      if (k === "width") {
        console.assert(typeof v === "number");
      } else if (k === "height") {
        console.assert(typeof v === "number");
      } else if (k === "filter") {
        console.assert(typeof v === "string");
      } else if (k === "color") {
        console.assert(typeof v === "string");
      } else if (k === "shadowColor") {
        console.assert(typeof v === "string");
      } else if (k === "shadowWidth") {
        console.assert(typeof v === "number");
      } else if (k === "tintColor") {
        console.assert(typeof v === "string");
      } else if (k === "outlineColor") {
        console.assert(typeof v === "string");
      } else if (k === "outlineWidth") {
        console.assert(typeof v === "number");
      } else {
        throw new Error(`unknown option "${k}"`);
      }
    }

    // Only deal in integers.
    params.width = Math.floor(params.width);
    params.height = Math.floor(params.height);
    const outlineWidth = Math.floor(params.outlineWidth || 0);
    const shadowWidth = Math.floor(params.shadowWidth || 0);
    const margin = outlineWidth + shadowWidth;

    // Create a cache key from the image src and params.
    params.src = src;
    const cacheKey = JSON.stringify(params, Object.keys(params).sort());

    // If ready, draw now!
    if (!ImageUtil.__cache) {
      ImageUtil.__cache = {};
    }
    let cachedImage = ImageUtil.__cache[cacheKey];
    if (cachedImage) {
      if (!cachedImage.image) {
        return; // still loading
      }
      // Ready to draw!
      ctx.drawImage(cachedImage.image, x - margin, y - margin);
      return;
    }

    // Not ready.  We could be clever about caching an untinted base version.
    // For now do all the manipulation for each tint color.  Sure this is an
    // order of magnitude more setup, but simple to manage.
    cachedImage = {}; // store an 'in-progress' marker
    ImageUtil.__cache[cacheKey] = cachedImage;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const w = params.width + margin * 2;
      const h = params.height + margin * 2;
      const offscreenCanvas = new OffscreenCanvas(w, h);
      const ctx = offscreenCanvas.getContext("2d", {
        willReadFrequently: true,
      });

      ctx.clearRect(0, 0, w, h);

      // Draw base image using any filters (e.g. brightness).
      if (params.filter) {
        ctx.filter = params.filter;
      }
      ctx.drawImage(image, margin, margin, params.width, params.height);
      ctx.filter = "none";

      if (params.color) {
        const color = ImageUtil.colorStringToRGBA(params.color);
        const imageData = ctx.getImageData(0, 0, w, h);
        const rgbaArray = imageData.data;
        console.assert(rgbaArray.length === w * h * 4);
        for (let i = 0; i < rgbaArray.length; i += 4) {
          if (rgbaArray[i + 3] > 0) {
            rgbaArray[i + 0] = color[0];
            rgbaArray[i + 1] = color[1];
            rgbaArray[i + 2] = color[2];
            rgbaArray[i + 3] = color[3];
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Apply tint.  Can tint using filter then blend multiply, but the
      // filters are black magic (not a simple color).
      if (params.tintColor) {
        const tint = ImageUtil.colorStringToRGBA(params.tintColor);
        const imageData = ctx.getImageData(0, 0, w, h);
        const rgbaArray = imageData.data;
        console.assert(rgbaArray.length === w * h * 4);
        for (let i = 0; i < rgbaArray.length; i += 4) {
          rgbaArray[i + 0] = (rgbaArray[i + 0] * tint[0]) / 255;
          rgbaArray[i + 1] = (rgbaArray[i + 1] * tint[1]) / 255;
          rgbaArray[i + 2] = (rgbaArray[i + 2] * tint[2]) / 255;
          rgbaArray[i + 3] = (rgbaArray[i + 3] * tint[3]) / 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Draw outline + shadow.
      if (outlineWidth || shadowWidth) {
        const imageData = ctx.getImageData(0, 0, w, h);
        const rgbaArray = imageData.data;
        console.assert(rgbaArray.length === w * h * 4);

        // Use a flood method to compute distance from image.
        // There are more efficient solutions, but this is simple
        // and only needed for setup.
        const floodArray = new Uint8ClampedArray(w * h);
        for (let i = 0; i < floodArray.length; i++) {
          floodArray[i] = 255;
        }

        const getAlpha = (x, y) => {
          const rgbaIndex = (x + y * w) * 4;
          return rgbaArray[rgbaIndex + 3];
        };
        const getFlood = (x, y) => {
          if (x < 0 || x >= w || y < 0 || y >= h) {
            return 255;
          }
          const floodIndex = x + y * w;
          return floodArray[floodIndex];
        };
        const setFlood = (x, y, value) => {
          const floodIndex = x + y * w;
          floodArray[floodIndex] = value;
        };

        // Seed a flood from visbile pixels.  Can be used to fade the outine!
        // Flood value is 0 for part of image, increasing with distance.
        for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
            if (getAlpha(x, y) > 0) {
              setFlood(x, y, 0);
            }
          }
        }
        const numIterations = outlineWidth + shadowWidth;
        for (let iteration = 0; iteration < numIterations; iteration++) {
          for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
              const pixel = getFlood(x, y);
              if (pixel === 0) {
                continue; // part of image
              }
              const left = getFlood(x - 1, y);
              const top = getFlood(x, y - 1);
              const right = getFlood(x + 1, y);
              const bottom = getFlood(x, y + 1);
              const neighbor = Math.min(left, top, right, bottom);
              const newValue = neighbor + 1;
              if (pixel > newValue) {
                setFlood(x, y, newValue);
              }
            }
          }
        }

        // Draw outline AND shadow.  We could use shadow blur, but this gives
        // more control over alpha fade.
        const outlineColor = ImageUtil.colorStringToRGBA(
          params.outlineColor || "white"
        );
        const shadowColor = ImageUtil.colorStringToRGBA(
          params.shadowColor || "black"
        );
        const overallWidth = outlineWidth + shadowWidth;
        let rep = false;
        for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
            const flood = getFlood(x, y);
            if (flood === 0) {
              continue; // part of image
            } else if (flood <= outlineWidth) {
              if (!rep) {
                rep = true;
              }
              const rgbaIndex = (x + y * w) * 4;
              rgbaArray[rgbaIndex] = outlineColor[0];
              rgbaArray[rgbaIndex + 1] = outlineColor[1];
              rgbaArray[rgbaIndex + 2] = outlineColor[2];
              rgbaArray[rgbaIndex + 3] = outlineColor[3];
            } else if (flood <= overallWidth) {
              const rgbaIndex = (x + y * w) * 4;
              const d = 1 - (flood - outlineWidth) / shadowWidth;
              rgbaArray[rgbaIndex] = shadowColor[0];
              rgbaArray[rgbaIndex + 1] = shadowColor[1];
              rgbaArray[rgbaIndex + 2] = shadowColor[2];
              rgbaArray[rgbaIndex + 3] = Math.floor(shadowColor[3] * d);
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // DONE!
      cachedImage.image = offscreenCanvas;
    };
    image.src = src;
  }

  /**
   * See https://github.com/dobarkod/canvas-bezier-multiple
   * @param {Context} ctx
   * @param {Array.{Array.{number,number}} points
   * @param {number} tension, default 0.25
   */
  static bezierCurveThrough(ctx, points, tension) {
    "use strict";

    // Default tension of one-quarter gives nice results
    tension = tension || 0.25;

    const l = points.length;

    // If we're given less than two points, there's nothing we can do
    if (l < 2) {
      return;
    }

    ctx.beginPath();

    // If we only have two points, we can only draw a straight line
    if (l == 2) {
      ctx.moveTo(points[0][0], points[0][1]);
      ctx.lineTo(points[1][0], points[1][1]);
      ctx.stroke();
      return;
    }

    // Helper function to calculate the hypotenuse
    function h(x, y) {
      return Math.sqrt(x * x + y * y);
    }

    /* For each interior point, we need to calculate the tangent and pick
     * two points on it that'll serve as control points for curves to and
     * from the point. */
    const cpoints = [];
    points.forEach(function () {
      cpoints.push({});
    });

    for (let i = 1; i < l - 1; i++) {
      const pi = points[i], // current point
        pp = points[i - 1], // previous point
        pn = points[i + 1]; // next point;

      /* First, we calculate the normalized tangent slope vector (dx,dy).
       * We intentionally don't work with the derivative so we don't have
       * to handle the vertical line edge cases separately. */

      const rdx = pn[0] - pp[0], // actual delta-x between previous and next points
        rdy = pn[1] - pp[1], // actual delta-y between previous and next points
        rd = h(rdx, rdy), // actual distance between previous and next points
        dx = rdx / rd, // normalized delta-x (so the total distance is 1)
        dy = rdy / rd; // normalized delta-y (so the total distance is 1)

      /* Next we calculate distances to previous and next points, so we
       * know how far out to put the control points on the tangents (tension).
       */

      const dp = h(pi[0] - pp[0], pi[1] - pp[1]), // distance to previous point
        dn = h(pi[0] - pn[0], pi[1] - pn[1]); // distance to next point

      /* Now we can calculate control points. Previous control point is
       * located on the tangent of the curve, with the distance between it
       * and the current point being a fraction of the distance between the
       * current point and the previous point. Analogous to next point. */

      const cpx = pi[0] - dx * dp * tension,
        cpy = pi[1] - dy * dp * tension,
        cnx = pi[0] + dx * dn * tension,
        cny = pi[1] + dy * dn * tension;

      cpoints[i] = {
        cp: [cpx, cpy], // previous control point
        cn: [cnx, cny], // next control point
      };
    }

    /* For the end points, we only need to calculate one control point.
     * Picking a point in the middle between the endpoint and the other's
     * control point seems to work well. */

    cpoints[0] = {
      cn: [
        (points[0][0] + cpoints[1].cp[0]) / 2,
        (points[0][1] + cpoints[1].cp[1]) / 2,
      ],
    };
    cpoints[l - 1] = {
      cp: [
        (points[l - 1][0] + cpoints[l - 2].cn[0]) / 2,
        (points[l - 1][1] + cpoints[l - 2].cn[1]) / 2,
      ],
    };

    /* Now we can draw! */

    ctx.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < l; i++) {
      const p = points[i],
        cp = cpoints[i],
        cpp = cpoints[i - 1];

      /* Each bezier curve uses the "next control point" of first point
       * point, and "previous control point" of second point. */
      ctx.bezierCurveTo(cpp.cn[0], cpp.cn[1], cp.cp[0], cp.cp[1], p[0], p[1]);
    }

    ctx.stroke();
  }
}
