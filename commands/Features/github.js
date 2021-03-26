const colors = require('../Configurations/colors.json');

module.exports = {
name: 'github',
othername: 'git',
execute(message, args){
    let link = 'https://github.com/cCurmudgeon/Reimu/tree/';
    message.channel.send(link + arg[0]);
}}