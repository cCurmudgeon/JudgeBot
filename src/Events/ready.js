let branch = [];
const { exec } = require("child_process");
exec("git branch --show-current", (err, stdout, stderr) => {
  branch = stdout;
  if (err) {
    return;
  }
});

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    let guilds = [];
    client.guilds.cache.forEach((guild) => {
      guilds.push(guild.name);
    });
    console.log(guilds.join(", "));
    console.log(
      `${client.user.username} is active in ${client.guilds.cache.size} servers\n`
    );
    client.user.setActivity(branch + " branch!", { type: "WATCHING" });
    client
      .generateInvite({
        permissions: 336030807,
      })
      .then((invite) => {
        console.log(invite);
      });
    const channel = client.channels.cache.get("654887364619141122");
    console.log(await channel.messages.fetch({ limit: 20 }));
  },
};
