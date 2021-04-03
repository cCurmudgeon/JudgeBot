const colors = require("../Configurations/colors.json");
function uwu(data) {
  let tags = [];
  let lang = [];
  let cate = [];

  data.tags.forEach((tag) => {
    tags.push(tag.hyptxt);
  });
  data.langauge.forEach((tag) => {
    lang.push(tag.hyptxt);
  });
  data.category.forEach((tag) => {
    cate.push(tag.hyptxt);
  });

  if (tags.toString().length >= 1000) {
    while (tags.toString().length >= 1000) {
      tags.pop();
    }
    console.log(tags);
  }

  const embed = {
    color: colors.nhentai,
    title: data.details.title.pretty,
    author: {
      name: "nhentai",
      icon_url: "https://nhentai.net/favicon.ico",
    },
    url: data.details.link,
    thumbnail: {
      url: data.images[0],
    },
    image: { url: data.images[0] },
    fields: [
      {
        name: "Native Title",
        value: data.details.title.japanese,
        inline: false,
      },
      {
        name: "Scanlator",
        value: data.info.scanlator,
        inline: true,
      },
      {
        name: "Langauge",
        value: lang[0],
        inline: true,
      },
      {
        name: "Category",
        value: cate.join(", "),
        inline: true,
      },
      {
        name: "Tags",
        value: tags.join(", "),
      },
    ],
    footer: {
      text: `Uploaded on ${data.details.upload_date_pretty}`,
    },
  };
  return embed;
}

module.exports = { uwu };
