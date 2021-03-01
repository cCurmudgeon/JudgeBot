const fs = require('fs');
const Discord =  require('discord.js');
const colors = require('../Configurations/colors.json');



module.exports ={
    name: 'info',
    description: 'bot info',
    args: false,
    execute(message, args){
        
        const client = message.client;
        var name = client.user.username;
        const acccreated = client.user.createdTimestamp();
        const IDbot = client.user.id;
        const size = client.guilds.cache.size;
        
        const info = {
            title: `${name}`,
            description: 's',
        };
 
    }

};