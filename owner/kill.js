const Discord  = require('discord.js');

module.exports = {
name: 'kill',
owner: true,
execute(message, args){
    async function s(){
    await message.reply(`${message.client.user.username} node process is killed! PM2 restart process is starting.`);

    process.exit();
}s();
}};