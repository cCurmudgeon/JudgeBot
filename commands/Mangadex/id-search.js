const fs = require('fs');
const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
const dotenv = require("dotenv").config({ path: '../../tokens.env' });
const fetch = require("node-fetch");

module.exports = {
name: 'mangadexid',
description: 'mangadex quick search',
args: true,
usage: '<titleid> || <userid>',


execute(message, args){

    async function u(){
        user = args[1];
        const response = await fetch(`https://api.mangadex.org/v2/user/${user}`)
        const data = await response.json();
        console.log(data);




       const levelId = {
            "0"  : "Banned",
            "1"  : "Guest",
            "2"  : "Validating",
            "3"  : "Member",
            "4"  : "Contributor",
            "5"  : "Group Leader",
            "6"  : "Power Uploader",
            "9"  : "VIP",
            "10" : "Public Relations",
            "11" : "Forum Moderator",
            "12" : "Moderator (Global)",
            "15" : "Developer",
            "16" : "Administrator 1",
            "20" : "Administrator 2"};

        const uembed = {
            color: colors.MDYellow,
            title: `${data.data.username}'s MangaDex information.`,
            url: `https://www.mangadex.org/user/${data.data.id}`,
            thumbnail:{
                url: data.data.avatar ? data.data.avatar : 'https://mangadex.org/images/avatars/default1.jpg'
            },
            fields:[
                {
                    name: "Username",
                    value: data.data.username,
                    inline: true,   
                },
                {
                    name: "Type",
                    value: levelId[data.data.levelId],
                    inline: true,
                },
                {
                    name: "Joined Mangadex on:",
                    value: data.data.joined,
                    inline: true,
                },
                {
                    name: "Last seen on:",
                    value: data.data.lastSeen,
                    inline: true,
                },
                {
                    name: "test",
                    value: "test"
                }
        
            ],
            footer: 'Use <.help mangadex> for more MangaDex commands!',
                
        };
    message.channel.send({embed: uembed});
    }

if(args[0] == 'user'){

u();
}   
}};




