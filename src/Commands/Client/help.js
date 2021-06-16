const { helpBed, specificHelp } = require("./Embeds/helpBed");
const Truse = {
  true: "Yes",
  false: "No",
};
module.exports = {
  name: "help",
  async execute(message, args, prefix, owner, colors) {
    const commandcollection = message.client.commands;
    let commands = [];
    commandcollection.map((command) => {
      if (command.name !== "help" && !command.owner) {
        commands.push({
          name: command.name,
          description: command.description,
          permission: command.permissions,
          args: command.args,
          usage: command.usage,
          typeReq: command.typeReq,
          type: command.type,
          category: command.category,
        });
      }
    });
    if (!args.length) {
      return message.channel.send({
        embed: helpBed(commands, prefix, colors.main),
      });
    } else {
      if (args[0] === "help") {
        return message.reply("lol no");
      }
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
            typeReq: command.typeReq ? Truse[command.typeReq] : "No",
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
        return message.channel.send({
          embed: specificHelp(answer[0], prefix, colors.main),
        });
    }
  },
};
