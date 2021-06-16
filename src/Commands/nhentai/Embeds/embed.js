const moment = require("moment");
function getBed(data, color) {
  let categori = [];
  let tagg = [];
  data.category.forEach((cate) => {
    categori.push(cate.hyptxt);
  });
  if (data.tags.length !== 0) {
    data.tags.forEach((tag) => {
      tagg.push(tag.hyptxt);
    });
    if (tagg.toString().length >= 1000) {
      while (tagg.toString().length >= 990) {
        tagg.pop();
      }
      tagg.push("and so it goes...");
    }
  } else tagg.push("No Tags");

  return embed;
}
module.exports = { getBed };
