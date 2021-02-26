const fs = require('fs');
const Discord =  require('discord.js');
const config = require('../config.json');
const prefix = config.prefix

module.exports = {
	name: 'help',
	description: 'List all of the commands or info about a specific command.',
	aliases: ['commands'],
	usage: '<command name>',
	cooldown: 2,
	execute(message, args) {

        const data = [];
		const {commands} = message.client

		function a(){

			const embed ={
				color: config.blue,
				title: 'Help',
				url: 'https://discord.js.org',
				author: {
					name: 'Some name',
					icon_url: 'https://i.imgur.com/wSTFkRM.png',
					url: 'https://discord.js.org',
				},
				description: 'Some description here',
				thumbnail: {
					url: 'https://i.imgur.com/wSTFkRM.png',
				},
				fields: [
					{
						name: 'Regular field title',
						value: 'Some value here',
					},
					{
						name: '\u200b',
						value: '\u200b',
						inline: false,
					},
					{
						name: 'Inline field title',
						value: 'Some value here',
						inline: true,
					},
					{
						name: 'Inline field title',
						value: 'Some value here',
						inline: true,
					},
					{
						name: 'Inline field title',
						value: 'Some value here',
						inline: true,
					},
				],
				image: {
					url: 'https://i.imgur.com/wSTFkRM.png',
				},
				timestamp: new Date(),
				footer: {
					text: 'Some footer text here',
					icon_url: 'https://i.imgur.com/wSTFkRM.png',
				},
			}};
			

        if(!args.length){

            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`n\`${prefix} help [commandname]\` to get info on a specific command!`);

            return message.author.send(data, { split: true }).then(() => {
		if (message.channel.type === 'dm') return;
		message.reply('I\'ve sent you a DM with all my commands!');})
        .catch(error => {
		    console.error(`Error openning DMs | ${message.author.tag}.\n`, error);
		    message.reply('Failed opening a DM, check your DM options in server privacy settings.');
	    });
        }
	},
};
