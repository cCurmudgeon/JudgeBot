const Discord =  require('discord.js');


module.exports = {
    name: 'clear',
    othername: ['purge'],
    description: 'Clear messages.',
    args: true,
    usage: '<user>',
    guildOnly: true,
    permissions: 'MANAGE_MESSAGES',
    execute(message, args){

        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('Please define an amount to delete.');
        }
        else if (amount <= 1 || amount > 100) {
            return message.reply('Due to Discord limitations give me a number between 1 and 99.');
        }
        message.channel.bulkDelete(amount, true);
        message.channel.send(`Cleared \`\`${amount - 1}\`\` of messages.`).catch(err => {
            console.error(err);
            message.author.send('Discord doesn\'t allow bots to bulk delete messages that are older than 2 weeks.');});

        setTimeout(() => {
            message.channel.bulkDelete(1, true);
        }, 2000);

    
    }};