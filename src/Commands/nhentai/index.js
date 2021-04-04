const battleship = require("kongou");
const kongou = new battleship();
const { nhentai } = require("../../colors.json");
const { getBed } = require("./get");

module.exports = {
  name: "nhentai",
  description: "nhentai API search.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<search/get> <keyword/id>",
  category: "Features",

  async execute(message, args, prefix) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );
    if (args[0] === "get") {
      const data = getBed(await kongou.get(arg), nhentai);
      message.channel.send({embed: data});
    }
    if(args[0] === "search"){
        const res = await kongou.search(arg, 1, 1);
        const data = getBed(res, nhentai);
        message.channel.send({embed: data});
    }
    else return message.reply(this.name + ' only has ' + this.usage + '.');
  },
};
