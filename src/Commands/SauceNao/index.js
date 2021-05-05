const dotenv = require("dotenv").config({
  path: "../../../secrets.env",
});
const baseurl = "https://saucenao.com/search.php";
const fetch = require("node-fetch");
const { querySauceBed } = require("./Embeds/sauceBed");

const support = ["gif", "jpg", "png", "bmp", "svg", "webp"];
module.exports = {
  name: "saucenao",
  description: "reverse searches using the SauceNAO API",
  permission: ["SEND_MESSAGES"],
  args: false,
  category: "Features",
  async execute(message, args, prefix, owner, colors) {
    let link;
    if (message.attachments.array().length !== 0) {
      link = message.attachments.array()[0].url;
    } else if (args[0] !== 0) {
      link = args[0];
    }
    let checkedLink;
    support.forEach((type) => {
      if (link.endsWith(type) === true) {
        checkedLink = link;
      }
    });
    console.log(checkedLink);
    if (checkedLink === undefined) {
      const popped = support.pop();
      return message.reply(
        `only ${support.join(", ")} and ${popped} are supported by SauceNAO.`
      );
    }

    const response = await fetch(
      baseurl +
        "?output_type=2&api_key=" +
        process.env.saucenao +
        "&url=" +
        checkedLink
    );
    if (response.status !== 200) {
      return (
        message.reply(
          "Error: " + response.statusText + " [" + response.status + "]"
        ) &&
        console.log(
          `Error: ${response.statusText} [${response.status}] at: \n ${response.url}`
        )
      );
    }
    const data = await response.json();
    message.channel.send({
      embed: querySauceBed(data.results, colors.saucenao),
    });
  },
};
