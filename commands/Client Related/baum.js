const Discord =  require('discord.js');
const colors = require('../Configurations/colors.json');

module.exports = {
    name: 'baum',
    description: 'Baumkuchen commands',
    args: false,
    owner: true,
execute(message, args){

        
   
    if(args[0] === '-r'){
        const exampleEmbed = {
            color: colors.blue,
            description: 'Rules you have to adhere to when enjoying your stay in this server. We expect you to abide by the Discord ToS and Community Guidelines which can be found below!',
            image: {
                url: 'https://i.imgur.com/h2MKp8Q.png',
            },
            fields: [
                {
                    name: 'Be Civil.',
                    value: 'Don\'t be too crass, cussing is fine but keep it to a minimum.'
                },
                {
                    name: 'Kids linger here too!',
                    value: 'NSFW content should be placed within their respective channels',
                },
                {
                    name: 'verba vana aut risui non loqui.',
                    value: 'Keep shitposting/spamming in the specific channels.',
                },
                {
                    name: 'Verbum Dei.',
                    value: 'Moderator\'s word is final.',
                },
                {
                    name: "Discord ToS.",
                    value: "https://discord.com/terms",
                },
                {
                    name: "Discord Community Guidelines.",
                    value: "https://discord.com/guidelines",
                }],
            footer: {
                text: 'Happy Dis~cording!'
            }};
        message.channel.send({ embed: exampleEmbed });
       
    }
}};

/* How you do spaces in embeds.
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
*/