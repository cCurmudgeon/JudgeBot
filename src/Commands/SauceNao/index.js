const dotenv = require("dotenv").config({
  path: "../../../secrets.env",
});
const sagiri = require("sagiri");
const client = sagiri(process.env.sauceNAO);
const colors = require("../../colors.json");
const { saucify } = require("./Embeds/sauce");
module.exports = {
  name: "sauce",
  description: "reverse searches using the SauceNAO API",
  permission: ["SEND_MESSAGES"],
  args: false,
  category: "Features",
  async execute(message, args, prefix) {
    let link;
    if (message.attachments.array().length !== 0) {
      link = message.attachments.array()[0].url;
      console.log("Ello!");
    } else link = args[0];
    message.channel.send({
      embed: saucify(await client(link), colors.sauceNAO),
    });
  },
};
