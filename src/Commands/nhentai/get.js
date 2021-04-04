function getBed(data, color) {
  let categori = [];
  let tagg = [];

  data.category.forEach((cate) => {
    categori.push(cate.hyptxt);
  });
  data.tags.forEach((tag) => {
    tagg.push(tag.hyptxt);
  });
  if (tagg.toString().length >= 1000) {
    while (tags.toString().length >= 1000) {
      tagg.pop();
    }
  }
  const embed = {
    color: color,
    title: data.details.title.pretty,
    author: {
      name: "nhentai",
      icon_url: "https://i.imgur.com/hdUkQgO.png",
    },
    url: data.details.link,
    thumbnail: {
      url: data.images[0],
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
        value: data.details.title.japanese,
        inline: false,
      },
    ],
    footer: {
      text: "Uploaded on: " + data.details.upload_date_pretty,
    },
  };
  return embed;
}
module.exports = { getBed };
