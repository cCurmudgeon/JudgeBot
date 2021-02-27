const fs = require('fs');
const Discord  = require('discord.js');

module.exports = {
name: 'reload',
othername: '-r',
description: 'Reload command (client owner)',
args: false,
usage: '<filename>',
owner: true,
execute(message, args){

    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
   
    const commandFolders = fs.readdirSync('./commands');
    const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));
    delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

    try {
        const newCommand = require(`../${folderName}/${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
        console.error(error);
        message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
    }
    message.channel.send(`Command \`${command.name}\` was reloaded!`);
}};

/*if(!args[0]) return message.channel.send('```Missing filename```');
const commandName = args[0].toLowerCase();
delete require.cache[require.resolve(`./${commandName}.js`)];       
try {
    const newCommand = require(`../${folderName}/${command.name}.js`);
    message.client.commands.set(newCommand.name, newCommand);
} catch (error) {
    console.error(error);
    message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
} 
    message.channel.send(`${commandName}.js has been reloaded.`);
    const gid = message.guild.name;
    console.log(`${commandName} was reloaded in ${gid}`);
    return;*/