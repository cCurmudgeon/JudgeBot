const fs = require('fs');
const Discord  = require('discord.js');
const prefix = '.';
module.exports = {
name: 't',
description: 'quick command handling',
args: false,
usage: '<usage>',
owner: true,
execute(message, args){
    const channel = message.client.channels.cache.get('668267133813391360');
    const pog = message.content.slice(prefix.length);
    const poggers = pog.slice(prefix.length);
    let messaged = (poggers);
    channel.send(messaged);
    message.delete();
}};