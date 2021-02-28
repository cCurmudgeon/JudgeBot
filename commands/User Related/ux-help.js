const fs = require('fs');
const Discord =  require('discord.js');
const colors = require('../Configurations/colors.json');
const prefix = colors.prefix;

module.exports = {
	name: 'help',
	description: 'List all of the commands or info about a specific command.',
	aliases: ['commands'],
	usage: '<command name>',

	execute(message, args) {
function h(){

	const help = {
		color: colors.blue,
		title: 'Command Hub',
		description: 'All the commands that you (user) can use.',
		image: {
			url: 'https://i.imgur.com/xQ6ULAo.png',
		},
		fields: [
			{
				name: 'User Related.',
				value: '``.help usr`` for more information!',
				inline: true,
			},
			{
				name: 'Moderation Related.',
				value: '``.help mod`` for more information!',
				inline: true,
			},
],
		footer: {
			text: 'Happy Dis~cording!'
		}};
}
}};
