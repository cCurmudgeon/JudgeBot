const request = require("superagent");
const cheerio = require("cheerio");

class pixvtitle {
  static getTitle(link) {
    return new Promise((resolve, reject) => {
      request
        .get(link)
        .then((res) => {
          const $ = cheerio.load(res.text);
          const title = $("#root").find("h1").text();
          const data = res.text;
          resolve({
            title,
          });
        })
        .catch(reject);
    });
  }
}
module.exports = pixvtitle;