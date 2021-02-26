const fs = require('fs');
const Discord =  require('discord.js');
const config = require('./config.json');
const dotenv = require('dotenv').config()
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
config.prefix = tokens.env.DISCORD_TOKEN
/*
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}*/

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);

    let commandFiles = files.filter(f => f.split(".").pop() === "js");
    if(commandFiles.length <= 0) {
        console.log("No commands found to load!");
        return;
    }

    console.log(`Loading ${commandFiles.length} commands!`);

    commandFiles.forEach((f, i) => {
        let command = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(command.name, command);
    });
});

client.once('ready', () => {
	
	//client.user.setActivity(``, {type: config.watch});//
	console.log('Horny Police is back in action lmfao!');
		
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} || ${guild.id}`);
	})
	var size = client.guilds.cache.size
		console.log(`${client.name} is active in ${size} servers`)
	
    client.generateInvite({permissions: 336030807}).then(invite => {
		console.log(`Click here to invite the bot to your server:\n${invite}`);
	})
})




client.on('message', async message => {

if (!message.content.startsWith(config.prefix) || message.author.bot) return;


const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.othername && cmd.othername.includes(commandName));
if (!command) return;
if (!message.content == command) return;

if (command.guildOnly && message.channel.type === 'dm') {
	return message.reply('Haa! You can\'t do that inside dms');
}

if (command.args && !args.length) {

	let reply = `Hey! missing arguments, ${message.author}!`;

	if (command.usage) {
			reply += `\nYou should do it like this : \`${prefix}${command.name} ${command.usage}\``;
}
    return message.channel.send(reply);
}

if (command.owner = true && message.author.id != config.ownerID){
	let reply = `This is a client owner command.`
	console.log(`User : ${message.author.username} | ${message.author.id} tried to use a client command.`)
	message.reply(reply);
	return;
} 

if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}
const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;
if (timestamps.has(message.author.id)) {

	const expire = timestamps.get(message.author.id) + cooldownAmount;
	
	if (now < expire) {
		const timeLeft = (expire - now) / 1000;
		return message.reply(`Hey! Wait ${timeLeft.toFixed(1)} more second(s) before you can use the: \`${command.name}\` again.`);
	}
}

try {
	command.execute(message, args);
} 
catch (error) {
	console.error(error);
	message.reply('Something is acting up!');
}
});

client.login (config.token)
