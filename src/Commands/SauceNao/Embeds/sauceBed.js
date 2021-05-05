function querySauceBed(results, color) {
  results.forEach((result, i) => {
    if (!result.data.ext_urls) {
      results.splice(i, 1);
    }
  });
  results.sort(function (a, z) {
    return z.header.similarity - a.header.similarity;
  });
  // const shifted = results[0].data.ext_urls.shift();
  const first = {
    color: color,
    title: results[0].data.title
      ? results[0].data.title
      : "No title specified!" + " [" + results[0].header.similarity + "]",
    author: {
      name: "SauceNAO",
      icon_url: "https://i.imgur.com/JYHmuID.png",
    },
    //  url: shifted,
    thumbnail: {
      url: results[0].header.thumbnail,
    },
    description: results[0].data.ext_urls
      ? results[0].data.ext_urls.join(", ")
      : "No alternatives!",
  };
  results.shift();

  let titles = [];
  results.forEach((result, i) => {
    titles.push(
      `${i + 1}. [**${result.data.title ? result.data.title : "No title!"}**](${
        result.data.ext_urls ? result.data.ext_urls : ""
      }) with ${result.header.similarity}% similarity`
    );
  });

  const alts = {
    color: color,
    title: "Alternatives!",
    author: {
      name: "SauceNAO",
      icon_url: "https://i.imgur.com/JYHmuID.png",
    },
    description: titles.join("\n"),
  };
  return {
    highest: first,
    alts: alts,
  };
}
module.exports = { querySauceBed };

/* This code itself is really bad, I will redo it but I really don't want to.*/
