const { query, usrq, charq } = require("./API/query");
const {
  aniInfoBed,
  manInfoBed,
  usrInfoBed,
  charInfoBed,
} = require("./Embeds/define");

const { fetch } = require("./API/api");

module.exports = {
  name: "anilist",
  description: "Shows anilist anime/manga, user and character information.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<type> <keywords>",
  type: ["anime", "manga", "user", "character"],
  typeReq: true,
  category: "Features",
  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );

    if (args[0] === "anime") {
      const response = await fetch(query, {
        search: arg,
        type: "ANIME",
      });
      if (response.error) {
        if (response.error.status === 404) {
          return message.reply("No results were found for the given keywords.");
        }
      }
      const embed = aniInfoBed(response, colors.anilist_blue);
      message.channel.send({ embed: embed });
    }
    if (args[0] === "manga") {
      const response = await fetch(query, {
        search: arg,
        type: "MANGA",
      });
      if (response.error) {
        if (response.error.status === 404) {
          return message.reply("No results were found for the given keywords.");
        }
      }
      const embed = manInfoBed(response, colors.anilist_blue);
      message.channel.send({ embed: embed });
    }
    if (args[0] === "user") {
      const response = await fetch(usrq, {
        search: arg,
      });
      if (response.error) {
        if (response.error.status === 404) {
          return message.reply("No results were found for the given keywords.");
        }
      }
      const embed = usrInfoBed(response, colors.anilist_blue);
      message.channel.send({ embed: embed });
    }
    if (args[0] === "character") {
      const response = await fetch(charq, {
        search: arg,
      });
      if (response.error) {
        if (response.error.status === 404) {
          return message.reply("No results were found for the given keywords.");
        }
      }
      const embed = charInfoBed(response, colors.anilist_blue);
      message.channel.send({ embed: embed });
    }
  },
};
