const { capitalize } = require("./Options/filters");
const {main} = require('../colors.json');
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
      if(message.author.id !== owner){
      const perms = capitalize(command.permissions);
      const authorperms = message.channel.permissionsFor(message.author);
      if (!authorperms || !authorperms.has(command.permissions)) {
        return message.reply(
          `To use this command you need \`\`${perms}\`\` permission(s)`
        );
      }
    }}

    if (command.args && !args.length) {
      message.reply(`.help ${command.name} for information.`);
    }

    if (command.owner && message.author.id != owner) {
      return message.reply("Command is restricted.");
    }

    try {
      command.execute(message, args, prefix, owner, main);
      console.log(command.name + " was executed by " + message.author.tag);
    } catch (error) {
      console.log(error);
      if (message.author == process.env.OWNER_ID) {
        message.channel.send(`${error}`);
      } else message.reply("Welp I ran into a problem!");
    }
  },
};
