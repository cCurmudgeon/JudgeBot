function saucify(result, color) {
  console.log(result);
  let altSites = [];
  if (result[1] !== undefined) {
    result.shift();
    result.forEach((resu) => {
      altSites.push(`[${resu.site}](${resu.url})`);
    });
  } else altSites.push(`[${result[0].site}](${result[0].url})`);
  altSites.sort();
  const embed = {
    colors: color,
    author: {
      name: "SauceNAO",
      icon_url: "https://i.imgur.com/JYHmuID.png",
    },
    title: "SauceNAO Search Results",
    url: result[0].url,
    description: "Alternatives: " + altSites.join(", "),
    thumbnail: {
      url: result[0].thumbnail,
    },
    fields: [
      {
        name: "Similarity of the highest likely image.",
        value: result[0].similarity,
        inline: true,
      },
      {
        name: "Author/Artist",
        value: `[${result[0].authorName}](${result[0].authorUrl})`,
        inline: true,
      },
    ],
    footer: {
      text: "Aye! Thanks Xamayon!",
    },
  };

  return embed;
}
module.exports = { saucify };
