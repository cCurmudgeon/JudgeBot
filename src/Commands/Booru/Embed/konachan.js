function resultBed(data, color) {
  let results = [];
  data.forEach((result, i) => {
    results.push(
      `${i + 1}. [${
        result.details.author ? result.details.author : "Not Specified"
      }](${result.details.siteUrl})`
    );
  });
  console.log(results);
  const embed = {
    color: color,
    title: "Search results from Konachan",
    author: {
      name: "Konachan",
      icon_url: "https://i.imgur.com/jj0EV2p.png",
    },
    description: results.join("\n"),
    footer: {
      text: "Choose one of the above and send the number represting the result",
    },
  };
  return embed;
}
function konaBed(data, color) {
  let tags = [];
  data.tags.forEach((tag) => {
    tags.push(tag.hyptxt);
  });
  if (tags.length > 1000) {
    while (tags.length > 1000) {
      tag.pop();
    }
  }
  const embed = {
    color: color,
    title: "Search result from Konachan",
    author: {
      name: "Konachan",
      icon_url: "https://i.imgur.com/jj0EV2p.png",
    },
    url: data.details.siteUrl,
    thumbnail: {
      url: data.details.image.full.image,
    },
    fields: [
      {
        name: "ID",
        value: data.details.id,
        inline: true,
      },
      {
        name: "Author",
        value: data.details.author,
        inline: true,
      },
      {
        name: "Age Rating",
        value: data.details.rating,
        inline: false,
      },
      {
        name: "Score",
        value: data.details.score,
        inline: true,
      },
      {
        name: "Source",
        value: data.details.source ? data.details.source : "WIP",
        inline: false,
      },
      {
        name: "Tags",
        value: tags.join(", "),
        inline: false,
      },
    ],
    footer: {
      text: "Uploaded on: " + data.metadata.created_at.pretty,
    },
  };
  return embed;
}
module.exports = { resultBed, konaBed };
