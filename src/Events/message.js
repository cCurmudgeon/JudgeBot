const { capitalize } = require("./Options/filters");
const colors = require("../colors.json");
module.exports = {
  name: "message",
  once: false,

  execute(message, client, prefix, owner) {
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.othername && cmd.othername.includes(commandName)
      );

    if (!command) return;
    if (command.permissions) {
      if (message.author.id !== owner) {
        const perms = capitalize(command.permissions);
        const authorperms = message.channel.permissionsFor(message.author);
        if (!authorperms || !authorperms.has(command.permissions)) {
          return message.reply(
            `To use this command you need \`\`${perms}\`\` permission(s)`
          );
        }
      }
    }
    if (command.args && !args.length) {
      return message.reply(
        `\`${prefix}help ${command.name}\` for information.`
      );
    }

    if (command.owner && message.author.id != owner) {
      return message.reply("Command is restricted.");
    }
    if (args[0] === "help") {
      let arr = [command.name];
      return client.commands
        .get("help")
        .execute(message, arr, prefix, owner, colors);
    }
    if (command.typeReq && !command.type.includes(args[0])) {
      message.reply("A specified type is not given!");
      let arr = [command.name];
      return client.commands
        .get("help")
        .execute(message, arr, prefix, owner, colors);
    }

    try {
      command.execute(message, args, prefix, owner, colors);
      console.log(
        command.name +
          " was executed by " +
          message.author.tag +
          "\n" +
          "with [ " +
          args.join(", ") +
          " ] arguments. \n"
      );
    } catch (error) {
      console.log(error);
      if (message.author.id === owner) {
        message.channel.send(error.message);
      } else message.reply("Welp I ran into a problem!");
    }
  },
};
