const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
const fetch = require('node-fetch');
module.exports = {
name: 'test',
othername: 'test',
description: 'quick command handling',
args: false,
usage: '<usage>',
owner: false,
WIP : true,
execute(message, args){

	let a = message.guild.members.cache.get(user => user.username === args[0]);
	message.channel.send(a); 

}};