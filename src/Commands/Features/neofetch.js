const os = require("os");
const process = require("process");
const { statusBed } = require("./Embeds/statusBed");
module.exports = {
  name: "status",
  description: "Returns client host system information.",
  args: false,
  permission: ["SEND_MESSAGES"],
  category: "Client",
  async execute(message, args, prefix, owner, colors) {
    let data = {
      host: {
        name: os.hostname(),
        type: os.type(),
        uptime: Math.round(os.uptime() / 60) + " Minutes",
      },
      cpu: {
        model: os.cpus()[0].model,
        arch: os.arch(),
      },
      mem: {
        free: Math.round(os.freemem() / 1e9) + " GB",
        total: Math.round(os.totalmem() / 1e9) + " GB",
        process: Math.round(process.memoryUsage().rss / 1e6) + " MB",
      },
      process: {
        uptime: Math.round(process.uptime() / 60) + " Minutes",
        version: process.version,
      },
    };
    console.log(data);
    message.channel.send({ embed: statusBed(data, colors.main) });
  },
};
