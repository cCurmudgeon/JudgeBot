module.exports = {
  name: "avatar",
  description: "Returns the avatar of the user.",
  permission: ["SEND_MESSAGES"],
  args: false,
  usage: "Nothing or <type>",
  type: ["@Username", "Username"],
  category: "User Related",
  async execute(message, args, prefix, owner, colors) {
    try {
      let user;
      if (!args[0] && !message.mentions.users.first()) user = message.author;
      if (message.mentions.users.first()) user = message.mentions.users.first();

      const name = message.guild.member(user).nickname
        ? message.guild.member(user).nickname
        : user.username;

      let color;
      if (message.guild.member(user).displayHexColor === "#000000")
        color = colors.main;
      else color = message.guild.member(user).displayHexColor;

      const avatar = await user.avatarURL({
        format: "png",
        size: 256,
        dynamic: true,
      });
      const res = {
        color: color,
        title: name + "'s Avatar",
        url: avatar,
        image: {
          url: avatar,
        },
      };

      message.channel.send({ embed: res });
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
