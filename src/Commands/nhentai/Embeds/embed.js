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
  const embed = {
    color: color,
    title: data.details.title.pretty,
    author: {
      name: "nhentai",
      icon_url: "https://i.imgur.com/hdUkQgO.png",
    },
    url: data.details.link,
    thumbnail: {
      url: data.images.thumb[0],
    },
    fields: [
      {
        name: "ID",
        value: data.details.id,
        inline: true,
      },
      {
        name: "Language",
        value: data.language[0].hyptxt,
        inline: true,
      },
      {
        name: "Category",
        value: categori.join(", "),
        inline: true,
      },
      {
        name: "Tags",
        value: tagg.join(", "),
        inline: false,
      },
      {
        name: "English Title",
        value: data.details.title.english,
        inline: false,
      },
      {
        name: "Native Title",
        value: data.details.title.japanese
          ? data.details.title.japanese
          : data.details.title.pretty,
        inline: false,
      },
    ],
    footer: {
      text:
        "Uploaded on: " +
        moment(new Date(data.details.upload_date)).format(
          "MMMM Do YYYY, h:mm:ss a"
        ),
    },
  };
  return embed;
}
module.exports = { getBed };
