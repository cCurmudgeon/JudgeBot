const TurndownService = require("turndown");
const turndownService = new TurndownService();
const {prefix} = require('../../config.json');
module.exports = {
name: 'turndown',
args: true,
usage: '<text>',

execute(message, args){

const command = 'turndown';
const arg = message.content.slice(prefix.length + command.length);
let downed = turndownService.turndown(arg);
message.channel.send(downed);


}};

