const fs = require('fs');
const Discord =  require('discord.js');
const colors = require('../Configurations/colors.json');

module.exports = {
    name: 'invite',
    description: 'invitation link for the bot.',
    args: false,
    execute(message, args){
        const invite = new Discord.MessageEmbed()
        .setTitle ("Here is the invite you asked for!")
        .setColor (colors.blue)
        .setDescription ('Click on the link.')
        .setURL ('https://discord.com/api/oauth2/authorize?client_id=799519710886363136&permissions=336030807&scope=bot');
    
    message.channel.send (invite);
    }
};