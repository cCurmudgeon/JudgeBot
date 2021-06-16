function statusBed(data, color) {
  return {
    color: color,
    title: "Client Host Information",
    fields: [
      {
        name: "Host - Name",
        value: data.host.name,
        inline: true,
      },
      {
        name: "Host - System Type",
        value: data.host.type,
        inline: true,
      },
      {
        name: "Host - Uptime",
        value: data.host.uptime,
        inline: true,
      },
      {
        name: "CPU - Model",
        value: data.cpu.model,
        inline: true,
      },
      {
        name: "CPU - Architecture",
        value: data.cpu.arch,
        inline: true,
      },
      {
        name: "Memory - Total",
        value: data.mem.total,
        inline: true,
      },
      {
        name: "Memory - Free",
        value: data.mem.free,
        inline: true,
      },
      {
        name: "Memory - Process Usage",
        value: data.mem.process,
        inline: true,
      },
      {
        name: "Process - Uptime",
        value: data.process.uptime,
        inline: true,
      },
      {
        name: "Process - Nodejs Version",
        value: data.process.version,
        inline: true,
      },
    ],
  };
}
module.exports = { statusBed };
