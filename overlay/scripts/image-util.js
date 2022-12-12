class ImageUtil {
  constructor() {
    throw new Error("static only");
  }

  /**
   *
   * @param {string} imagePath - after "images/" dir
   * @returns {string} suitable for Image.src value
   */
  static getSrc(imagePath) {
    //return `/overlay/images/${imagePath}`;
    const protocol = location.protocol;
    const port = protocol === "http:" ? 8080 : 8081;
    return `${protocol}//localhost:${port}/static/images/${imagePath}`;
  }
}
