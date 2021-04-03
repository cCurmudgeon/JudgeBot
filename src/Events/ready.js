module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    let guilds = [];
    client.guilds.cache.forEach((guild) => {
      guilds.push(guild.name);
    });
    console.log(guilds.join(", "));
    console.log(
      `${client.user.username} is active in ${client.guilds.cache.size} servers\n`
    );

    client
      .generateInvite({
        permissions: 336030807,
      })
      .then((invite) => {
        console.log(invite);
      });
  },
};
