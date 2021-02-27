const fs = require('fs');
const Discord =  require('discord.js');
const colors = require('../Configurations/colors.json');
const prefix = colors.prefix;

module.exports = {
	name: 'help',
	description: 'List all of the commands or info about a specific command.',
	aliases: ['commands'],
	usage: '<command name>',
	cooldown: 2,

	execute(message, args) {
message.channel.send('WIP')
}};
