function mum(data) {
  let titles = [];
  console.log(data);
  data.forEach((datum, i) => {
    titles.push(i + 1 + ". " + datum.details.title.pretty);
  });
  const embed = {
    title: "nhentai search results.",
    description: titles.join("\n"),
    footer: {
      text: "Send the specific number.",
    },
  };
  return embed;
}

module.exports = { mum };
