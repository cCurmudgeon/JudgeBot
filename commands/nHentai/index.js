const search = require('./src/search');

module.exports = {
name: 'nhentai',
execute(message, args){

    async function s() {
        let response;
        response = await search.search(args[0]);

        message.channel.send({
            embed: {
                ...response
            }
        });
        
    }s();

}};