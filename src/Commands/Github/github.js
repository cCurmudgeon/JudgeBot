const jeyson = require("../../../package.json");
const repolink = jeyson.repository.url.replace(".git", "/").replace("git+", "");
console.log(repolink);

module.exports = {
  name: "git",
  description: "Throws the git repo in package file.",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<type>",
  type: ["home", "--branch"],
  category: "Client",
  execute(message, args) {
    if (args[0] === "--branch" || args[0] === "-b") {
      message.reply(repolink + "tree/" + args[1]);
    } else if (args[0] === "home") {
      message.reply(repolink);
    }
  },
};
