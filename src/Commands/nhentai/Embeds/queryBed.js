function queryBed(data, color) {
  let titles = [];
  data.forEach((result, i) => {
    titles.push(
      i +
        1 +
        ". [" +
        result.details.title.pretty +
        "[" +
        result.details.id +
        "]" +
        "](" +
        result.details.link +
        ")"
    );
  });
  const embed = {
    color: color,
    title: "Search Results",
    author: {
      name: "nhentai",
      icon_url: "https://i.imgur.com/hdUkQgO.png",
    },
    description: titles.join("\n"),
  };
  return embed;
}
module.exports = { queryBed };
