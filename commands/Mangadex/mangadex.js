const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('.././Configurations/colors.json');
const dotenv = require("dotenv").config({ path: '../../tokens.env' });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



module.exports = {
name: 'mangadex',
othername: 'aliases',
description: 'mangadex quick search',
args: true,
usage: '<titleid> || <userid>',


execute(message, args){


    
if(args[0] == 'user'){


    let promise = message.content.slice(14);
    let request = new XMLHttpRequest();
    request.open("GET", `https://api.mangadex.org/v2/user/${promise}`);
    request.send();
    request.onload = () => {
        if(request.status == 200){
            if(message.author.id === process.env.OWNER_ID){
            message.channel.send(`\`\`\`${request.responseText}\`\`\``);
            //message.channel.send();
            }}
        else {
            message.channel.send(`User id given is wrong or not available.`);
        }};
}
   
}};




