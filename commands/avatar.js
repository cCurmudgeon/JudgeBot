const fs = require('fs');
const Discord  = require('discord.js');
const config = require('../config.json')
module.exports = {
name      :'avatar',
othername :'pfp',
args      : false,
guildOnly : true,
owner     : false,
execute(message, args){


    if (message.mentions.users.size){
        const user_filter = message.mentions.users.first()
        const mention_avatar = `${user_filter.avatarURL({format: 'png', size: 256, dynamic: true})}`
        const mention_name = user_filter.username
        const role_color = message.guild.member(message.mentions.users.first()).displayHexColor

        const avatar = new Discord.MessageEmbed()
            .setTitle  (`${mention_name}'s avatar!`)
            .setColor  (role_color)
            .setImage  (mention_avatar)
        return message.reply (avatar)
    }

    if (args[0] === 'me' || 'I' || 'i'){
        function lol (){
    const nonmention_avatar = message.author.avatarURL({format: 'png', size: 256})
    const role_color = message.guild.member(message.author).displayHexColor
        const avatar = new Discord.MessageEmbed()
        .setColor       (role_color)
        .setTitle       ("Your avatar!")
        .setDescription ("Mention a user next time to show their avatar!")
        .setImage       (nonmention_avatar)
    return message.reply(avatar); 
    }} lol()





}}