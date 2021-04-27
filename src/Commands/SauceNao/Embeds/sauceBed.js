function querySauceBed(results, color) {
  let titles = [];

  results.forEach((result, i) => {
    titles.push(
      `${i + 1}. [**${result.data.title ? result.data.title : "No title!"}**](${
        result.data.ext_urls ? result.data.ext_urls : ""
      }) with ${result.header.similarity}% similarity`
    );
  });
  return {
    color: color,
    title: "Source Results from SauceNAO",
    author: {
      name: "SauceNAO",
      icon_url: "https://i.imgur.com/JYHmuID.png",
    },
    description: titles.join("\n"),
  };
}
module.exports = { querySauceBed };
