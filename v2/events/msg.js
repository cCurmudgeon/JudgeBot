const config = require("../config.json");
const prefix = config.prefix;
const {work, owner, welp} =  require('./Fillers/embeds');
module.exports = {
  name: "message",
  once: false,

  execute(message, client) {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) || client.commands.find((cmd) => 
      cmd.othername && cmd.othername.includes(commandName));

    if (!command) return;
    if (!message.content === command) return;
    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply("Command is restricted inside DMs, use a guild!");
    }

    if (command.permissions && !process.env.OWNER_ID) {
      permsToString = command.permissions
        .toString()
        .toLowerCase()
        .replace(/_/g, " ");
      //permsToUpper = capitalizeFirstLetter(permsToString);
      const authorperms = message.channel.permissionsFor(message.author);
      if (!authorperms || !authorperms.has(command.permissions)) {
        return message.reply(
          `To use this command you need \`\`${permsToString}\`\` permission(s)`
        );
      }
    }

    if (command.args && !args.length) {
      let reply = `.help ${command.name} for information.`;
      message.reply(reply);
    }

    if (command.WIP === true) {
      if (message.author.id != process.env.OWNER_ID) {
        if (message.author.id != process.env.WIP_MEM) {
          return message.reply({ embed: work });
        }
      }
    }

    if (command.owner && message.author.id != process.env.OWNER_ID) {
      return message.reply({ embed: owner });
    }
  
    try {
      command.execute(message, args);
      console.log(command.name + " was executed by " + message.author.tag);
    } catch (error) {
      if (message.author == process.env.OWNER_ID) {
        console.log(error);
        message.channel.send(`${error}`);
      } else message.reply({ embed: welp });
    }
  },
};
