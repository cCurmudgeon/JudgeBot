const fs = require('fs');
const Discord =  require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();

module.exports ={
    name: 'info',
    description: 'bot info',
    args: false,
    execute(message, args){

        var nickname = message.guild.member(message.author).nickname;
        var name = nickname ? nickname : message.author.username;
        /*const acccreated = client.user.createdTimestamp;*/
        const IDbot = client.user.id
        const size = client.guilds.cache.size
    
        const info = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle('bruh')
        .setDescription('Alpha 0.1.0')
        .addFields(
         { name: 'Creator', value: 'bruh',inline: true },
         { name: 'Created Date', value: 'problem was this', inline: true },
         { name: '\u200B', value: '\u200B' },
         { name: 'ID', value: IDbot, inline: true },
         { name: 'In', value: `${size} guilds.`}
        )
    
        message.channel.send(info);
    }

}