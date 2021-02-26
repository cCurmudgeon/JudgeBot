const Discord =  require('discord.js');

module.exports = {
    name: 'baum',
    description: 'Baumkuchen commands',
    args: false,
    owner: true,
execute(message, args){

    if(args[0] === '-r'){
        function i(){
            const exampleEmbed = {
            color: 0x0099ff,
            description: 'Rules you have to adhere to when enjoying your stay in this server.',
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
                    name: 'Verbum Dei',
                    value: 'Moderator\'s word is final.',
                }],
            footer: {
                text: 'Happy Dis~cording!'
            }};
        message.channel.send({ embed: exampleEmbed });
       }
       i()
    }
}}

/* How you do spaces in embeds.
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
*/