const fs = require('fs');
const Discord  = require('discord.js');
const config = require('../config.json')
module.exports = {
name      :'cat',
args      : false,
guildOnly : false,

execute(message, args){

    function getCharacters() {
        return fetch(`https://rickandmortyapi.com/api/character`)
          .then((response) => response.json())
          .then((response) => response.results);
      }
      
      getCharacters().then((characters) => {
        console.log(characters);
      });
}}