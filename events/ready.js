module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    console.log(`${client.user.username} is online.`);

    client.guilds.cache.forEach((guild) => {
      console.log(`${guild.name} || ${guild.id}`);
    });
    var size = client.guilds.cache.size;
    console.log(`${client.user.username} is active in ${size} servers`);

    client
      .generateInvite({
        permissions: 336030807,
      })
      .then((invite) => {
        console.log(invite);
      });
  },
};
