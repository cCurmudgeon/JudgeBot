const Discord = require('discord.js');
const colors = require('../Configurations/colors.json');
var moment = require('moment');


module.exports = {
  name: 'srvinfo',
  description: 'quick command handling',
  args: false,
  usage: '<usage>',

  execute(message, args) {

    function a() {
      let rolesize = message.guild.roles.cache.size;

      const verlvl = {
        "NONE": "None",
        "LOW": "Low",
        "MEDIUM": "Medium",
        "HIGH": "(╯°□°）╯︵ ┻━┻",
        "HIGHEST": "(ノಠ益ಠ)ノ彡┻━┻"
      };
      let inline = true;
      let sicon = message.guild.iconURL({
        format: "png",
        size: 512,
        dynamic: true,
      });
      let serverembed = new Discord.MessageEmbed()
        .setColor(colors.main)
        .setThumbnail(sicon)
        .setAuthor(message.guild.name)
        .addField("Name", message.guild.name, inline)
        .addField("Owner", message.guild.owner, inline)
        .addField("Region", message.guild.region, inline)
        .addField("Members", message.guild.memberCount, inline)
        .addField("Roles", rolesize, inline)
        .addField("Channels", message.guild.channels.cache.size, inline)
        .addField("Verification Level", verlvl[message.guild.verificationLevel], inline)
        .addField("You Joined on", `${moment.utc(message.member.joinedAt).format("dddd, MMMM Do YYYY")}`)
        .addField("Created on", `${moment.utc(message.guild.createdAt).format("dddd MMMM Do YYYY")}`)
        .addField("Server ID", message.guild.id, inline);

      if (args[0] === '-roles') {
        let rolemap = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(",");
        if (!rolemap) rolemap = "No roles";

        rolesembed = new Discord.MessageEmbed()
          .setColor(colors.main)
          .setTitle('All of the server roles.')
          .setDescription(rolemap);
        message.channel.send(rolesembed);
        return;
      } else serverembed.setFooter("Run -roles to get the roles list!");
      message.channel.send(serverembed);




    }
    a();
  }
};