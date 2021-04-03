const { helpBed, cumand } = require("./Embeds/help");
module.exports = {
  name: "help",
  description: "Maps all of the commands.",
  args: false,
  category: "Client",
  async execute(message, args, prefix, owner, main) {
    const commandcollection = message.client.commands;
    let commands = [];
    commandcollection.map((command) => {
      commands.push({
        name: command.name,
        description: command.description,
        permission: command.permissions,
        args: command.args,
        usage: command.usage,
        category: command.category,
      });
    });
    if (!args.length) {
      message.channel.send({
        embed: helpBed(commands, prefix, main),
      });
    } else {
      console.log(args[0]);
      let answer = [];
      commands.forEach((command) => {
        if (command.name === args[0]) {
          answer.push({
            name: command.name,
            description: command.description,
            usage: command.usage,
            category: command.category,
          });
        }
      });
      message.channel.send({
        embed: cumand(answer[0], prefix, main),
      });
    }
  },
};
