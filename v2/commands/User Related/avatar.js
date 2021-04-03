const Discord = require("discord.js");
const colors = require("../Configurations/colors.json");

module.exports = {
  name: "avatar",
  othername: "pfp",
  guildOnly: true,
  WIP: false,

  execute(message, args) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    }
    if (args[0] === true) {
      user = message.guild.members.get(args[0]);
      console.log(user);
    }
    if (!args[0] && !message.mentions.users.first()) {
      user = message.author;
      console.log(user);
    }

    const nickname = message.guild.member(user).nickname;
    const name = nickname ? nickname : user.username;
    const avatar = `${user.avatarURL({
      format: "png",
      size: 256,
      dynamic: true,
    })}`;
    const role_color = message.guild.member(user).displayHexColor;
    let color = role_color ? role_color : colors.main;

    function e() {
      const embed = new Discord.MessageEmbed()
        .setTitle("Your Avatar!")
        .setColor(color)
        .setImage(avatar);

      if (message.mentions.users.first()) {
        embed.title = `${name}\'s avatar!`;
      }
      message.channel.send(embed);
    }
    e();
  },
};