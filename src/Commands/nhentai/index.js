/*const Kongou = require("kongou");
const { getBed } = require("./Embeds/embed");
const { queryBed } = require("./Embeds/queryBed");

module.exports = {
  name: "nhentai",
  description: "nhentai API search.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<type> <id/ keyword>",
  type: ["get", "random", "search"],
  category: "Features",

  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );
    if (args[0] === "get") {
      await Kongou.get(arg)
        .then((data) => {
          data.images.thumbnails;
          const embed = {
            color: color,
            title: data.title.pretty,
            author: {
              name: "nhentai",
              icon_url: "https://i.imgur.com/hdUkQgO.png",
            },
            url: data.siteURL,
            thumbnail: {
              url: data.images.thumbnails[0],
            },
            fields: [
              {
                name: "ID",
                value: data.id,
                inline: true,
              },
              {
                name: "Language",
                value: `[${data.languages[0].name}](${data.languages[0].url})`,
                inline: true,
              },
              {
                name: "Category",
                value: data.category.map(
                  (category) => `[${category.name}](${category.url})`
                ),
                inline: true,
              },
              {
                name: "Tags",
                value: data.tags.map((tag) => `[${tag.name}](${tag.url})`),
                inline: false,
              },
              {
                name: "English Title",
                value: data.details.title.english,
                inline: false,
              },
              {
                name: "Native Title",
                value: data.details.title.japanese
                  ? data.details.title.japanese
                  : data.details.title.pretty,
                inline: false,
              },
            ],
            footer: {
              text:
                "Uploaded on: " +
                moment(new Date(data.details.upload_date)).format(
                  "MMMM Do YYYY, h:mm:ss a"
                ),
            },
          };
        })
        .catch((error) => {
          console.log(error);
          return message.reply(error.message);
        });
    } else if (args[0] === "random") {
      await kongou
        .random()
        .then((data) => {
          message.channel.send({ embed: getBed(data, colors.nhentai) });
        })
        .catch((error) => {
          console.log(error);
          return message.reply(error.message);
        });
    } else if (args[0] === "search") {
      await kongou
        .query(arg, 1, 1)
        .then((data) => {
          message.channel
            .send({ embed: queryBed(data, colors.nhentai) })
            .then((lastmessage) => {
              const filter = (secmessage) =>
                secmessage.author.id === message.author.id;
              const collector = message.channel.createMessageCollector(filter, {
                time: 15000,
                max: 1,
              });
              collector.on("collect", (mess) => {
                const number = parseInt(mess.content);
                if (number !== NaN) {
                  mess.delete();
                  lastmessage.edit({
                    embed: getBed(data[number - 1], colors.nhentai),
                  });
                } else return message.reply("-----");
              });
            });
        })
        .catch((error) => {
          console.log(error);
          message.reply(error.message);
        });
    }
  },
};
*/

const Kongou = require("kongou");
const moment = require("moment");
module.exports = {
  name: "nhentai",
  description: "nhentai API search...",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<type> <id/ keyword>",
  type: ["get", "search"],
  typeReq: true,
  category: "Features",
  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );

    Kongou.query({ keyword: arg }).then((data) => {
      let queryData = data.map(
        (result, i) =>
          `${i + 1}. [${result.title.pretty}](${result.siteURL}) by [${
            result.artist[0].name
          }](${result.artist[0].url})`
      );
      if (queryData.toString().length > 1024) {
        while (queryData.toString().length > 1000) queryData.pop();
      }
      message.channel
        .send({
          embed: {
            color: colors.nhentai,
            title: "Search Results",
            author: {
              name: "nhentai",
              icon_url: "https://i.imgur.com/hdUkQgO.png",
            },
            description: queryData.join("\n \n"),
          },
        })
        .then((sentMessage) => {
          const collector = message.channel.createMessageCollector(
            (mes) => message.author.id === mes.author.id,
            {
              time: 15000,
              max: 1,
            }
          );
          collector.on("collect", (message) => {
            if (isNaN(parseInt(message.content)))
              return message.reply("Event closed: Needed a number.");
            message.delete();
            const result = data[parseInt(message.content) - 1];
            console.log(result.siteURL);
            let embed = {
              color: colors.nhentai,
              title: result.title.pretty
                ? result.title.pretty
                : result.title.english,
              thumbnail: {
                url: result.images.thumbnails[0],
              },
              description: result.siteURL,
              fields: [
                {
                  name: "ID",
                  value: result.id,
                  inline: true,
                },
                {
                  name: "Artist",
                  value: result.artist[0].id
                    ? `[${result.artist[0].name}](${result.artist[0].url})`
                    : "No artist mentioned!",
                  inline: true,
                },
                {
                  name: "Category",
                  value: result.category
                    .map((category) => `[${category.name}](${category.url})`)
                    .join("\n"),
                  inline: true,
                },
                {
                  name: "Characters",
                  value: result.characters.id
                    ? result.characters
                        .map(
                          (character) => `[${character.name}](${character.url})`
                        )
                        .join(", ")
                    : "No characters mentioned!",
                  inline: true,
                },
                {
                  name: "Group",
                  value: result.groups[0].id
                    ? `[${result.groups[0].name}](${result.groups[0].url})`
                    : "No group mentioned!",
                  inline: true,
                },
                {
                  name: "Language",
                  value: `[${result.languages[0].name}](${result.languages[0].url})`,
                  inline: true,
                },
                {
                  name: "Parody?",
                  value: result.parodies[0].id
                    ? result.parodies
                        .map((parody) => `[${parody.name}](${parody.url})`)
                        .join(", ")
                    : "Not a parody!",
                  inline: true,
                },
                {
                  name: "Scanlator",
                  value: result.scanlator
                    ? result.scanlator
                    : "No scanlator mentioned!",
                  inline: true,
                },
                {
                  name: "Tags",
                  value: result.tags
                    .map((tag) => `[${tag.name}](${tag.url})`)
                    .join(", "),
                  inline: false,
                },
                {
                  name: "English Title",
                  value: result.title.english
                    ? result.title.english
                    : "English title not available.",
                  inline: false,
                },
                {
                  name: "Native Title",
                  value: result.title.native
                    ? result.title.native
                    : result.title.pretty,
                  inline: false,
                },
              ],
              footer: {
                text:
                  "Uploaded on: " +
                  moment(result.upload_date.date).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  ),
              },
            };
            sentMessage.edit({ embed: embed });
          });
        });
    });
  },
};
