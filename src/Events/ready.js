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
    let i = 0;
    client.guilds.cache.forEach((guild) => {
      i = i + 1;
      guilds.push(i + ". " + guild.name);
    });
    console.log(
      `${client.user.username} is active in ${client.guilds.cache.size} servers.` +
        "\n \n" +
        guilds.join("\n") +
        "\n"
    );
    await client.user.setActivity(branch + " branch!", { type: "WATCHING" });
    await client
      .generateInvite({
        permissions: 336030807,
      })
      .then((invite) => {
        console.log(invite);
      });
  },
};
