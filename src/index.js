const fs = require("fs");
const Discord = require("discord.js");
const dotenv = require("dotenv").config({
  path: "../secrets.env",
});
const client = new Discord.Client();
client.commands = new Discord.Collection();

const Folders = fs.readdirSync("./Commands");
for (const folder of Folders) {
  const Files = fs
    .readdirSync(`./Commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of Files) {
    const command = require(`./Commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const eventFiles = fs
  .readdirSync("./Events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./Events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client, process.env.prefix, process.env.owner));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client, process.env.prefix, process.env.owner));
  }
}

client.login(process.env.token);
