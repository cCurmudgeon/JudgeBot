const battleship = require("kongou");
const kongou = new battleship();
const { getBed } = require("./Embeds/embed");

module.exports = {
  name: "nhentai",
  description: "nhentai API search.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<search/get> <keyword/id>",
  category: "Features",

  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );
    if (args[0] === "get") {
      const res = getBed(await kongou.get(arg), colors.nhentai);
      message.channel.send({ embed: res });
    }
    if (args[0] === "search") {
      const res = getBed(await kongou.search(arg, 1, 1), colors.nhentai);
      message.channel.send({
        embed: res,
      });
    } else return message.reply(".help " + this.name + " for help.");
  },
};
