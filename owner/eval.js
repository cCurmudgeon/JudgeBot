const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('../commands/Configurations/colors.json');
const bbcode = require('bbcode');
const fetch = require('node-fetch');

module.exports = {
name: 'eval',
description: 'evaluation',
args: false,
usage: '<usage>',
owner: true,

execute(message, args){

    const command = message.content.split(' ').slice(1).join(' ');
    message.channel.send(`\`\`\`js${eval(command)}\`\`\``);

}};