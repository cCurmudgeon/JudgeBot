function helpBed(data, prefix, color) {
  let client = [];
  let mod = [];
  let feature = [];
  let usrRelated = [];
  data.forEach((command) => {
    if (command.category === "Moderation") {
      mod.push(" " + command.name + " ");
    }
    if (command.category === "Client") {
      client.push(" " + command.name + " ");
    }
    if (command.category === "User Related") {
      usrRelated.push(" " + command.name + " ");
    }
    if (command.category === "Features") {
      feature.push(" " + command.name + " ");
    }
  });
  const embed = {
    color: color,
    title: "Command Base",
    description: `${prefix}help \`\`<commandname>\`\` for more information.`,
    fields: [
      {
        name: "Client",
        value: `\`${client.join("\n")}\``,
        inline: true,
      },
      {
        name: "Moderation",
        value: `\`${mod.join("\n")}\``,
        inline: true,
      },
      {
        name: "User Related",
        value: `\`${usrRelated.join("\n")}\``,
        inline: true,
      },
      {
        name: "Features",
        value: `\`${feature.join("\n")}\``,
        inline: true,
      },
    ],
  };
  return embed;
}
function specificHelp(data, prefix, color) {
  const embed = {
    color: color,
    title: data.name + " help",
    description: data.description,
    fields: [
      {
        name: "Name/Prefix",
        value: data.name,
        inline: true,
      },
      {
        name: "Category",
        value: data.category,
        inline: true,
      },
      {
        name: "Arguments?",
        value: data.args,
        inline: true,
      },
      {
        name: "Permissions Required",
        value: data.permission,
        inline: true,
      },
      {
        name: "Types",
        value: "``" + data.type + "``",
        inline: false,
      },
      {
        name: "Usage",
        value: "``" + data.usage + "``",
        inline: false,
      },
    ],
  };
  return embed;
}
module.exports = { helpBed, specificHelp };
