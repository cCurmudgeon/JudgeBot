const { usrinfoBed } = require("./Embeds/usrinfoBed");
module.exports = {
  name: "usrinfo",
  description: "Shows user info related to that specific server/guild.",
  permission: ["SEND_MESSAGES"],
  args: false,
  usage: "\u200b",
  type: ["\u200b"],
  category: "User Related",
  async execute(message, args, prefix, owner, colors) {
    let user;
    if (message.mentions.users.first()) user = message.mentions.users.first();
    else user = message.author;
    const member = message.guild.member(user);
    let rolemap = member.roles.cache
      .sort((a, z) => z.position - a.position)
      .map((r) => r)
      .join(", ");
    let color;
    if (message.guild.member(user).displayHexColor === "#000000")
      color = colors.main;
    else color = message.guild.member(user).displayHexColor;
    if (rolemap.length > 1024) rolemap = "To many roles to display";
    if (!rolemap) rolemap = "No roles are available in this guild/server.";
    message.channel.send({ embed: usrinfoBed(user, member, rolemap, color) });
  },
};
