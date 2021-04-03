const colors = require('../Configurations/colors.json');

module.exports = {
	name: 'help',
	execute(message, args) {

		const help = {
			color: colors.main,
			title: 'Command Hub',
			description: 'All the commands that you (user) can use.',
			fields: [{
					name: 'User Related.',
					value: '``.help usr`` for more information!',
					inline: false,
				},
				{
					name: 'Moderation Related.',
					value: '``.help mod`` for more information!',
					inline: false,
				},
				{
					name: 'MangaDex API.',
					value: '``.help mangadex`` for more information!',
					inline: false,
				},
				{
					name: 'Anilist API.',
					value: '``.help anilist`` for more information!',
					inline: false,
				}
			],
		};

		const usr = {
			color: colors.main,
			title: 'User Related Commands.',
			description: 'All the user related commands.',
			fields: [{
					name: 'User Avatar.',
					value: '``.avatar`` or ``.avatar @mention``',
					inline: false,
				},
				{
					name: 'Server Infomation.',
					value: '``.srvinfo``, for roles use ``.srvinfo -roles``',
					inline: false,
				},
				{
					name: 'User Information.',
					value: '``.usrinfo`` or ``.usrinfo @mention``',
					inline: false,
				},
				{
					name: 'Help.',
					value: '``.help`` or ``.help <command name>``',
					inline: false,
				}
			],
		};
		const mod = {
			color: colors.main,
			title: 'Moderation Commands.',
			description: 'All of these commands at least require manage message permission for both bot and command activator.',
			fields: [{
					name: 'Clear/Nuke Messages.',
					value: '``.clear <number between 1-99>`` or ``.purge <number between 1-99>``',
					inline: false,
				},
				{
					name: 'Warn User.',
					value: '``.warn @mention``',
					inline: false,
				}
			],
		};
		const md = {
			color: colors.MD_yellow,
			title: 'MangaDex API Based Commands.',
			description: 'Please refrain from spamming these commands.',
			fields: [{
					name: 'User Search based on ID.',
					value: '``.mangadexid user <id>``',
					inline: false,
				},
				{
					name: 'User Search based on username. [WIP]',
					value: '``.mangadexname user <username>``',
					inline: false,
				},
				{
					name: 'Manga Search based on ID.',
					value: '``.mangadexid manga <id>``',
					inline: false,
				},
				{
					name: 'Manga Search based on name. [WIP]',
					value: '``.mangadexname manga <name>``',
					inline: false,
				}
			],
			footer: {
				text: 'MangaDex is dying so please bear with me while the api request rate becomes more stable.'
			}
		};
		const anilist = {
			color: colors.anilist_blue,
			title: 'Anilist API based commands.',
			description: 'Please don\'t spam these commands!',
			fields: [{
					name: 'Anime search.',
					value: '``.anilist anime <name>``',
					inline: false,
				},
				{
					name: 'Manga search.',
					value: '``.anilist manga <name>``',
					inline: false,
				},
				{
					name: 'User search.',
					value: '``.anilist user <name>``',
					inline: false,
				},
				{
					name: 'Character search.',
					value: '``.anilist character <name>``'
				}
			],
			footer: {
				text: '``a, m, u, c`` can also be used as prefixes.'
			}
		};

		if (!args[0]) {
			message.channel.send({
				embed: help
			});
		}
		if (args[0] === 'mod') {
			message.channel.send({
				embed: mod
			});
		}
		if (args[0] === 'user') {
			message.channel.send({
				embed: usr
			});
		}
		if (args[0] === 'mangadex') {
			message.channel.send({
				embed: md
			});
		}
		if (args[0] === 'anilist') {
			message.channel.send({
				embed: anilist
			});
		}
	}
};