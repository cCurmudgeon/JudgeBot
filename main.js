const fs = require('fs');
const Discord =  require('discord.js');

const dotenv = require("dotenv").config({ path: './tokens.env' });
token = process.env.TOKEN;

const config = require('./config.json');
const prefix = config.prefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();




const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
        console.log(`${file} loaded!`);
		client.commands.set(command.name, command);
	}
}




fs.readdir("./owner", (err, files) => {
    if(err) console.error(err);

    let ownerFiles = files.filter(f => f.split(".").pop() === "js");
    if(ownerFiles.length <= 0) {
        console.log("No commands found to load!");
        return;
    }

    console.log(`Loading ${ownerFiles.length} client commands!`);

    ownerFiles.forEach((f) => {
        let clicommand = require(`./owner/${f}`);
        console.log(`${f} loaded!`);
        client.commands.set(clicommand.name, clicommand);
    });
});




client.once('ready', () => {
	
	//client.user.setActivity(``, {type: config.watch});//
	console.log(`${client.user.username} is online.`);
		
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} || ${guild.id}`);
	});
	var size = client.guilds.cache.size;
		console.log(`${client.user.username} is active in ${size} servers`);
	
    client.generateInvite({permissions: 336030807}).then(invite => {
		console.log(`Click here to invite the bot to your server:\n${invite}`);
	});
});




client.on('message', async message => {

if (!message.content.startsWith(config.prefix) || message.author.bot) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.othername && cmd.othername.includes(commandName));

	if (!command) return;
	if (!message.content == command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Command is restricted inside DMs, use a guild!');
	}

	if (command.owner && message.author.id != process.env.OWNER_ID){
    	return message.reply('Client owner command!');
	}

	if (command.args && !args.length) {
		let reply = `Hey! missing arguments, ${message.author}!`;
	if (command.usage) {
		reply += `\nYou should do it like this : \`${prefix}${command.name} ${command.usage}\``;
	}
    	return message.channel.send(reply);
	}


	try {
		command.execute(message, args);
		message.delete();
	} 
	catch (error) {
    	if(message.author == process.env.OWNER_ID){	
			console.log(error);
    	message.channel.send(`${error}`);
    	}
    	else message.reply('Something is acting up!');
	}

});

client.login (token);
