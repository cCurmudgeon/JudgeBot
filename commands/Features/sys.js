const si = require("systeminformation");
const colors = require("../Configurations/colors.json");

module.exports = {
  name: "client-info",
  othername: "clinfo",
  WIP: true,

  execute(message, args) {
    async function s() {

      const cpu = await si
        .cpuTemperature()
        .then((data) => data)
        .catch((error) => console.error(error));

      const mem = process.memoryUsage().rss;
      let clemem = Math.round(mem / 1000000);

      const embed = {
        color: colors.main,
        title: "Client Information.",
        fields: [
          {
            name: "CPU Temperature [Main]",
            value: `${cpu.main}°C`,
            inline: true,
          },
          {
            name: "RSS [Resident Set Size]",
            value: `${clemem} MB`,
            inline: true,
          },
        ],
      };
      message.channel.send({
        embed: embed,
      });
    }
   if(args[0] === 'sys'){
    s();
   } 
  }
};
