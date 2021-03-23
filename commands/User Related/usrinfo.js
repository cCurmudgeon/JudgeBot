const Discord = require('discord.js');
const colors = require('../Configurations/colors.json');
var moment = require('moment');


module.exports = {
    name: 'usrinfo',
    othernames: ['userinfo'],
    args: false,
    guildOnly: false,
    execute(message, args) {

        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        const member = message.guild.member(user);

        let rolemap = member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(",");
        if (rolemap.length > 1024) rolemap = "To many roles to display";
        if (!rolemap) rolemap = "No roles";
        let roled = member.roles;

        function a() {
            const embed = new Discord.MessageEmbed()
                .setColor(colors.main)
                .setTitle('User Information')
                .setThumbnail(user.avatarURL({
                    format: "png",
                    size: 256,
                    dynamic: true,
                }))
                .addField(`Username:`, `${user.tag} || ${user}`, true)
                .addField('\u200b', '\u200b')
                .addField("ID:", `${user.id}`, true)
                .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
                .addField("Bot:", `${user.bot}`, true)
                .addField("In Server", message.guild.name, true)
                .addField("Presence Activity", `${user.presence.activities[0] ? user.presence.activities[0].name : "User isn't playing"}`, true)
                .addField("Status:", `${user.presence.status}`, true)
                .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
                .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
                .addField('\u200b', '\u200b')
                .addField("Roles:", rolemap, false);



            message.channel.send({
                embed
            });

        }
        a();

    }
};