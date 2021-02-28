const Discord =  require('discord.js');
const colors = require('../Configurations/colors.json');

module.exports = {
    name: 'invite',
    description: 'invitation link for the bot.',
    args: false,
    execute(message, args){
        const clientinv = message.client.generateInvite({permissions: 336030807});
        const invite = new Discord.MessageEmbed()
        .setTitle ("Here is the invite you asked for!")
        .setColor (colors.blue)
        .setDescription ('Click on the link.')
        .setURL (`${clientinv}`);
    message.channel.send (invite);
    }
};