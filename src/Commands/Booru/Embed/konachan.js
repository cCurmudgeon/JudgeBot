const modes = {
  1: "Konachan",
  2: "Yande.re",
};
function resultBed(data, color, mode) {
  let results = [];
  data.forEach((result, i) => {
    results.push(
      `${i + 1}. [${
        result.details.author ? result.details.author : "Not Specified"
      }](${result.details.siteUrl})`
    );
  });
  const embed = {
    color: color,
    title: "Search results from " + modes[mode],
    author: {
      name: modes[mode],
      icon_url: "https://i.imgur.com/jj0EV2p.png",
    },
    description: results.join("\n"),
    footer: {
      text: "Choose one of the above and send the number represting the result",
    },
  };
  return embed;
}
function FillBed(data, color, mode) {
  let tags = [];
  data.tags.forEach((tag) => {
    console.log(tag);
    tags.push(`[${tag.name}](${tag.url})`);
  });
  if (tags.length > 1000) {
    while (tags.length > 1000) {
      tag.pop();
    }
  }
  const embed = {
    color: color,
    title: "Search result from " + modes[mode],
    author: {
      name: modes[mode],
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
module.exports = { resultBed, FillBed };
