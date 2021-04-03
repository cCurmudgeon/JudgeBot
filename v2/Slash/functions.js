const dotenv = require("dotenv").config({ path: "../tokens.env" });
const fs = require("fs");
const { DiscordInteractions } = require("slash-commands");
const interaction = new DiscordInteractions({
  applicationId: process.env.CLI_ID,
  authToken: process.env.TOKEN,
  publicKey: process.env.PUB_KEY,
});

// IMPORTANT STUFF BRUH -- Edit as you like
const guildID = ["698062395263942686"];
const edit_comID = null;
const cmdtopath = null; //Edit file path

//Set Commands
async function initiate() {
  const commandFolders = fs.readdirSync("./Commands");
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const files = require(`./Commands/${folder}/${file}`);
      await interaction
        .createApplicationCommand(files.command, guildID[0])
        .then(console.log)
        .catch(console.error);
    }
  }
}
//Logs the commands cached in both global or not.
async function log() {
  await interaction
    .getApplicationCommands()
    .then(console.log)
    .catch(console.error);
  await interaction
    .getApplicationCommands(guildID[0])
    .then(console.log)
    .catch(console.error);
}
//Edits commands.
async function edit() {
  await interaction
    .editApplicationCommand(cmdtopath, edit_comID, guildID[0])
    .then(console.log)
    .catch(console.error);
}
// Delete commands
async function del(ID) {
  await interaction
    .deleteApplicationCommand(ID, guildID[0])
    .then(console.log)
    .catch(console.error);
}

module.exports = {
  initiate, log, edit, del
};
