const fs = require('fs');
const Discord =  require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'invite',
    description: 'invitation link for the bot.',
    args: false,
    execute(message, args){
        const invite = new Discord.MessageEmbed()
        .setTitle ("Here is the invite you asked for!")
        .setColor (config.color)
        .setDescription ('Click on the link below.')
        .setImage ('https://i.imgur.com/GyFYKzR.png')
        .setURL ('https://discord.com/oauth2/authorize?client_id=775740192531152917&scope=bot&permissions=8')
    
    message.channel.send (invite);
    }
}