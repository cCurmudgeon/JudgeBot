const { helpBed, specificHelp } = require("./Embeds/helpBed");
const Truse = {
  true: "Yes",
  false: "No",
};
module.exports = {
  name: "help",
  description: "Maps all of the commands.",
  permission: ["SEND_MESSAGES"],
  args: false,
  category: "Client",
  async execute(message, args, prefix, owner, colors) {
    const commandcollection = message.client.commands;
    let commands = [];
    commandcollection.map((command) => {
      commands.push({
        name: command.name,
        description: command.description,
        permission: command.permissions,
        args: command.args,
        usage: command.usage,
        type: command.type,
        category: command.category,
      });
    });
    if (!args.length) {
      message.channel.send({
        embed: helpBed(commands, prefix, colors.main),
      });
    } else {
      let answer = [];
      commands.forEach((command) => {
        if (command.name === args[0]) {
          answer.push({
            name: command.name,
            description: command.description,
            permission: command.permission
              ? command.permission.join(", ")
              : "Nothin' Special",
            args: Truse[command.args],
            usage: command.usage
              ? prefix + command.name + " " + command.usage
              : prefix + command.name + " [Any specified type or nothing]",
            type: command.type
              ? command.type.join(", ")
              : "No Type(s) Specified!",
            category: command.category,
          });
        }
      });
      if (answer.length === 0) {
        return message.reply("No commands by the name of " + args).then(
          message.channel.send({
            embed: helpBed(commands, prefix, colors.main),
          })
        );
      } else
        message.channel.send({
          embed: specificHelp(answer[0], prefix, colors.main),
        });
    }
  },
};
