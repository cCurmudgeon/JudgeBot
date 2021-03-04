const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
const fetch = require('node-fetch');
module.exports = {
name: 'name',
othername: 'aliases',
description: 'quick command handling',
args: false,
usage: '<usage>',
owner: false,
WIP : true,
execute(message, args){

    if (reaction.message.id != "stored_msg_id") return; // or you can compare the message objects

const eRole = message.guild.roles.get('688477690344374283');
switch (reaction.emoji.name) { 
     case "❤️": reaction.message.guild.member(user).addRole(eRole); break;
     // etc.
}

}};