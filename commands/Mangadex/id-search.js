const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
const fetch = require("node-fetch");
const moment = require('moment');


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

//data filtering

    let premium;
    if(data.data.premium === true){
        premium = "True";
    }
    else premium = "False";

    let mdAtHome;
    if(data.data.mdAtHome === 1){
        mdAtHome = "Yes";
    }
    else mdAtHome = "No";

//Custom messages based on the role in MangaDex
    let messagetoshow;
    if(data.data.levelId === 20 || data.data.levelId ===16){
        messagetoshow = "is an administrator of MangaDex";
    }
    else if(data.data.levelId === 15){
        messagetoshow = "is a developer of MangaDex";
    }
    else if(data.data.levelId === 12 || data.data.levelId === 11){
        messagetoshow = "is a moderator of MangaDex";
    }
    else if(data.data.levelId === 10){
        messagetoshow = "is a public relation of MangaDex";
    }
    else if(data.data.levelId === 9){
        if(data.data.id == 2){
            messagetoshow = ", the overlord!";
        }
        else messagetoshow = "is a VIP related to MangaDex";
    }
    else if(data.data.levelId === 6){
        messagetoshow = "is a power uploader in MangaDex";
    }
    else if(data.data.levelId === 5){
        messagetoshow = "is a Group Leader";
    }
    else 
    messagetoshow = "is a normal user in MangaDex";

//time conversion unix > human lol [Thanks Teasday!]
    var date = new Date(data.data.joined * 1000);
    let cordate = date.toLocaleDateString("UTC");
    let cordateaprox = moment(date).startOf('day').fromNow();

    var seen = new Date(data.data.lastSeen * 1000);
    var seenAt = seen.toLocaleTimeString("UTC");
    let seenAtaprox = moment(seen).startOf('hour').fromNow();



    const uembed = {
        color: colorbed,
        title: `${data.data.username}`,
        url: `https://www.mangadex.org/user/${data.data.id}`,
        thumbnail:{
            url: data.data.avatar ? data.data.avatar : 'https://mangadex.org/images/avatars/default1.jpg'
        },
        description: `${data.data.username} ${messagetoshow}`,
        fields:[
            {
                name: "Type",
                value: lvlId[data.data.levelId],
                inline: true,
            },
            {
                name: "Uploads",
                value: `${data.data.uploads !== 0 ? `${data.data.uploads}` : 'None'}`,
                inline: true,
            },
            {
                name: "Profile Views",
                value: data.data.views,
                inline: true,
            },
            {
                name: "Supporter:",
                value: premium,
                inline: true,
            },
            {
                name: "MD@H client:",
                value: mdAtHome,
                inline: true,
            },
            {
                name: "Joined:",
                value: `${cordateaprox} [${cordate}]`,
                inline: true,
            },
            {
                name: "Last seen:",
                value: `${seenAtaprox} [${seenAt} UTC]`,
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




