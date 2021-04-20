function saucify(result, color) {
  if (result[0].similarity < 40) {
    const lowsim = {
      colors: color,
      author: {
        name: "SauceNAO",
        icon_url: "https://i.imgur.com/JYHmuID.png",
      },
      title: "No results found!",
      image: {
        url:
          "https://media1.tenor.com/images/0f6b30e2ce79ae5c2b7e0f174783e9b2/tenor.gif",
      },
    };
    return lowsim;
  }
  let altSites = [];
  if (result[1] !== undefined) {
    result.forEach((resu) => {
      altSites.push(`[${resu.site}](${resu.url})`);
    });
    altSites.shift();
  } else altSites.push(`[${result[0].site}](${result[0].url})`);
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
