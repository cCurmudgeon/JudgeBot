const fs = require('fs');
const Discord  = require('discord.js');

module.exports.reload = {
name: "reload",
othername: "-r",
description: "Owner based reload command",
args: true,
usage: "<file name>",
owner: true,

execute(message, args){

    if(!args[1]) return message.channel.send('```Missing filename```');
    const commandName = args[1].toLowerCase();
    delete require.cache[require.resolve(`./${commandName}.js`)];       
        try {
            const newCommand = require(`./${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (err) {
            return message.reply('```Defined file was not found or corrupted.```').then(console.log(err));
        }    
        message.channel.send(`${commandName}.js has been reloaded.`);
        const gid = message.guild.name
        console.log(`${commandName} was reloaded in ${gid}`)
        return;
}}

module.exports.leave = {
    name: "leave",
    description: "Owner based leave command",
    args: true,
    owner: true,
    
    execute(message, args){

    const gid = message.guild.name
    const gidid = message.guild.id
    message.guild.leave()
    message.channel.send('welp').then(console.log[`Left from ${gid} [${gidid}]`])
    return;
}}
