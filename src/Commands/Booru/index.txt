const { konachan } = require("../../API/Haruna/src/index");
const konacchi = new konachan();
const { resultBed, konaBed } = require("./Embed/konachan");
module.exports = {
  name: "booru",
  description: "A booru ani-board based searches",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<type> <keyword>",
  type: ["konachan"],
  category: "Features",

  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );
    if (args[0] === "konachan" || args[0] === "-k") {
      await konacchi
        .posts(arg, 5, 1, 4)
        .then((data) =>
          message.channel
            .send({ embed: resultBed(data, colors.konachan) })
            .then((lastmessage) => {
              const filter = (secmessage) =>
                secmessage.author.id === message.author.id;
              const collector = message.channel.createMessageCollector(filter, {
                time: 15000,
              });
              collector.on("collect", (mess) => {
                const number = parseInt(mess.content);
                const repl = konaBed(data[number - 1], colors.konachan, arg);
                lastmessage.edit({ embed: repl });
              });
            })
        )
        .catch((error) => message.reply(error.message));
    }
  },
};
