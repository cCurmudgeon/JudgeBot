const fetch = require("node-fetch");

module.exports = {
  name: "fetch",
  description: "Returns body of fetched url using node-fetch.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<url>",
  category: "Client",
  async execute(message, args, prefix, owner, colors) {
    await fetch(args[0])
      .then(async (data) => {
        const rest = await data.json();
        message.channel.send(`\`\`\`${rest}\`\`\``);
      })
      .catch((error) => {
        message.reply(error.message);
      });
  },
};
