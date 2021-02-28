const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
const fetch = require("node-fetch");


module.exports = {
name: 'mangadexid',
description: 'mangadex quick search',
args: true,
usage: '<titleid> || <userid>',


execute(message, args){

    async function u(){
        user = args[1];
        const response = await fetch(`https://api.mangadex.org/v2/user/${user}`);
        const data = await response.json();
        console.log(data);
 
       const lvlId = {
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
            "20" : "Administrator 2"
        };
 //Staff Repekt
    let colorbed;
    if(data.data.levelId === 20 || data.data.levelId ===16){
        colorbed = colors.MD_admin;
    }
    else if(data.data.levelId === 15){
        colorbed = colors.MD_dev;
    }
    else if(data.data.levelId === 12 || data.data.levelId === 11){
        colorbed = colors.MD_mod;
    }
    else if(data.data.levelId === 10){
        colorbed = colors.MD_PR;
    }
    else if(data.data.levelId === 9){
        if(data.data.id == 2){
            colorbed = colors.MD_holo;
        }
        else colorbed = colors.MD_vip;
    }
    else if(data.data.levelId === 6){
        colorbed = colors.MD_PU;
    }
    else if(data.data.levelId === 5){
        colorbed = colors.MD_GL;
    }
    else 
    colorbed = colors.MDYellow;
//end of staff respekt

    const uembed = {
        color: colorbed,
        title: `${data.data.username}`,
        url: `https://www.mangadex.org/user/${data.data.id}`,
        thumbnail:{
            url: data.data.avatar ? data.data.avatar : 'https://mangadex.org/images/avatars/default1.jpg'
        },
        description: data.data.biography,
        fields:[
            {
                name: "Username",
                value: data.data.username,
                inline: true,   
            },
            {
                name: "Type",
                value: lvlId[data.data.levelId],
                inline: true,
            },
            {
                name: "Joined Mangadex on:",
                value: data.data.joined/(90^10+7),
                inline: false,
            },
            {
                name: "Last seen on:",
                value: data.data.lastSeen/(90^10+7),
                inline: true,
            },
            {
                name: "Supporter:",
                value: "data.data.premium",
                inline: true,
            },
            {
                name: "MD@H client:",
                value: data.data.mdAtHome,
                inline: true,
            },
            {
                name: "Profile Views",
                value: data.data.views,
                inline: true,
            },
            {
                name: "Uploads",
                value: `${data.data.uploads !== 0 ? `${data.data.uploads}` : 'None'}`,
                inline: true,
            },],
        footer: 'Use <.help mangadex> for more MangaDex commands!',                
    };
    message.channel.send({embed: uembed});
    }

if(args[0] == 'user'){
u();
}   
}};




