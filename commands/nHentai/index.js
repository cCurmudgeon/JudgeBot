const colors = require("../Configurations/colors.json");
const nhentaiAPI = require("../../API/nhentaiAPI/index");
const { prefix } = require("../../config.json");
let api = new nhentaiAPI();

module.exports = {
  name: "nhentai",
  execute(message, args) {
    const search = async (Arg) => {
      await api.search(Arg).then((data) => {
        const res = data[0];
        const embed = {
          title: res.title.pretty,
          url: res.link,
          author: {
            name: "nHentai",
          },
          thumbnail: {
            url: res.cover,
          },
          fields: [
            {
              name: "Native Title",
              value: res.title.japanese,
              inline: true,
            },
            {
              name: "Scanlator",
              value: res.scanslator,
              inline: true,
            },
            {
              name: "Uploaded Date",
              value: res.upload_date,
              inline: true,
            },
            {
              name: "Total Pages",
              value: res.no_pages,
              inline: true,
            },
            {
              name: "Total Favorites",
              value: res.favs,
              inline: true,
            },
            {
              name: "Tags",
              value: res.tags
            },
          ],
        };
        message.channel.send({ embed: embed });
      });
    };

    let Arg;
    if (args[0] === "search") {
      Arg = message.content.slice(
        prefix.length + 1 + this.name.length + 1 + args[0].length
      );
      search(Arg);
    }
  },
};

/*{
    id: '352888',
    title: "[r.i.s factory (Ruschuto)] M's (Kantai Collection -KanColle-) [English] [friggo] [Digital]",
    language: 'english',
    thumbnail: {
      s: 'https://t.nhentai.net/galleries/1876765/thumb.jpg',
      w: '250',
      h: '353'
    }
  }*/
