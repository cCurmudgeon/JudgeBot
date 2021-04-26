const battleship = require("kongou");
const kongou = new battleship();
const { getBed } = require("./Embeds/embed");
const { queryBed } = require("./Embeds/queryBed");
module.exports = {
  name: "nhentai",
  description: "nhentai API search.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<type> <keyword/id>",
  type: ["search", "get"],
  category: "Features",

  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );
    if (args[0] === "get") {
      await kongou
        .get(arg)
        .then((data) => {
          message.channel.send({ embed: getBed(data, colors.nhentai) });
        })
        .catch((error) => {
          console.log(error);
          message.reply(error.message);
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
              });
              collector.on("collect", (mess) => {
                const number = parseInt(mess.content);
                lastmessage.edit({
                  embed: getBed(data[number - 1], colors.nhentai),
                });
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
