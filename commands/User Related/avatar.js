const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
module.exports = {
name      :'avatar',
othername :'pfp',
args      : false,
guildOnly : true,
owner     : false,
execute(message, args){

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const nickname = message.guild.member(user).nickname;
    const name = nickname ? nickname : user.username;
    const avatar = `${user.avatarURL({format: 'png', size: 256, dynamic: true})}`;
    const role_color = message.guild.member(user).displayHexColor;
    let color = role_color ? role_color : colors.blue;

function e(){
    const embed = new Discord.MessageEmbed()
    .setTitle  ('Your Avatar!')
    .setColor  (color)
    .setImage  (avatar);

    if (message.mentions.users.first()){
        embed.title = `${name}\'s avatar!`;
    }
    message.channel.send(embed)
}
e();


}};