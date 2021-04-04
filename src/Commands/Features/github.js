const jeyson = require("../../../package.json");
const repolink = jeyson.repository.url.replace(".git", "/").replace("git+", '');
console.log(repolink);

module.exports = {
  name: "git",
  description: "Throws the repo link from package file.",
  args: true,
  usage: "<type>",
  category: "Client",
  execute(message, args, prefix, owner, main) {
      if(message.author.id !== owner)return;
      if(args[0] === 'home'){
          message.reply(repolink);
      }
  },
};
