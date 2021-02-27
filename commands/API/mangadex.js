const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');

module.exports = {
name: 'manga',
othername: 'aliases',
description: 'mangadex quick search',
args: true,
usage: '<title>',

execute(message, args){

    async function m(){
        fetch ('https://mangadex.org/api/v2/').then()

    }
}};