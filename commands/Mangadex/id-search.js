const Discord  = require('discord.js');
const colors = require('../Configurations/colors.json');
const fetch = require("node-fetch");
const moment = require('moment');
const bbcode = require('bbcode');
var converter = require('html-to-markdown');


module.exports = {
name: 'mangadexid',
othername: 'mdid',
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
    colorbed = colors.MDyellow;

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

    let deschtml = bbcode.parse(data.data.description);
    var description = converter.convert(deschtml);

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

    async function m(){
        manga = args[1];
        const response = await fetch(`https://api.mangadex.org/v2/manga/${manga}`);
        const data = await response.json();
        console.log(data);

        const tags = {

            "1"   : "4-Koma",
            "2"   : "Action",
            "3"   : "Adventure",
            "4"   : "Award Winning",
            "5"   : "Comedy",
            "6"   : "Cooking",
            "7"   : "Doujinshi",
            "8"   : "Drama",
            "9"   : "Ecchi",
            "10"  : "Fantasy",
            "11"  : "Gyaru",
            "12"  : "Harem",
            "13"  : "Historical",
            "14"  : "Horror",
            "15"  : "null",
            "16"  : "Martial Arts",
            "17"  : "Mecha",
            "18"  : "Medical",
            "19"  : "Music",
            "20"  : "Mystery",
            "21"  : "Oneshot",
            "22"  : "Psychological",
            "23"  : "Romance",
            "24"  : "School Life",
            "25"  : "Sci-Fi",
            "26"  : "null",
            "27"  : "null",
            "28"  : "Shoujo Ai",
            "29"  : "null",
            "30"  : "Shounen Ai",
            "31"  : "Slice of Life",
            "32"  : "Smut",
            "33"  : "Sports",
            "34"  : "Supernatural",
            "35"  : "Tragedy",
            "36"  : "Long Strip",
            "37"  : "Yaoi",
            "38"  : "Yuri",
            "39"  : "null",
            "40"  : "Video Games",
            "41"  : "Isekai",
            "42"  : "Adaptation",
            "43"  : "Anthology",
            "44"  : "Web Comic",
            "45"  : "Full Color",
            "46"  : "User Created",
            "47"  : "Official Colored",
            "48"  : "Fan Colored",
            "49"  : "Gore", 
            "50"  : "Sexual Violence",
            "51"  : "Crime",
            "52"  : "Magical Girls",
            "53"  : "Philosophical",
            "54"  : "Superhero",
            "55"  : "Thirller",
            "56"  : "Wuxia",
            "57"  : "Aliens",
            "58"  : "Animals",
            "59"  : "Crossdressing",
            "60"  : "Demons",
            "61"  : "Deliquents",
            "62"  : "Genderswap",
            "63"  : "Ghosts",
            "64"  : "Monster Girls",
            "65"  : "Loli",
            "66"  : "Magic",
            "67"  : "Military",
            "68"  : "Monsters",
            "69"  : "Ninja",
            "70"  : "Office Workers",
            "71"  : "Police",
            "72"  : "Post-Apoclyptic",
            "73"  : "Reincarnation",
            "74"  : "Reverse Harem",
            "75"  : "Samurai",
            "76"  : "Shota",
            "77"  : "Survival",
            "78"  : "Time Travel",
            "79"  : "Vampires",
            "80"  : "Traditional Games",
            "81"  : "Virtual Reality",
            "82"  : "Zombies",
            "83"  : "Incest",
            "84"  : "Mafia",
            "85"  : "Villainess",
            
        };

    
const res = data.data;
//let sliced = res.tags.slice(' ').join(', ');
//Thanks Tracreed!
str = [];
res.tags.forEach(tag => str.push(tags[tag]));

console.log(str);
str = str.join(', ');

//Color coordination

let colorbed;
if(res.publication.language === 'jp'){
    colorbed = colors.lang_jp;
}
if(res.publication.language === 'kr'){
    colorbed = colors.lang_kr;
}
if(res.publication.language === 'cn'){
    colorbed = colors.lang_cn;
}
if(res.isHentai === true){
    colorbed = colors.Hentaired;
}

//More UX friendly true false;
let hentie;
if(res.isHentai === true){
    hentie = 'Yes';
}else hentie = 'No';

var views = res.views;
String(views).replace(/(.)(?=(\d{3})+$)/g,'$1,');

var follows = res.follows;
String(follows).replace(/(.)(?=(\d{3})+$)/g,'$1,');

let deschtml = bbcode.parse(res.description);
var description = converter.convert(deschtml);

        const membed = {
            color: colorbed,
            title: `${res.title}`,
            url: `https://www.mangadex.org/manga/${res.id}`,
            thumbnail:{
                url: res.mainCover
            },
            description: description,
            fields:[
                {
                    name: "Artist",
                    value: res.artist,
                    inline: true,
                },
                {
                    name: "Author",
                    value: res.author,
                    inline: true,
                },
                {
                    name: "Hentai:",
                    value: hentie,
                    inline: true,
                },
                {
                    name: "Views",
                    value: views,
                    inline: true,
                },
                {
                    name: "Follows",
                    value: follows,
                    inline: true,
                },
                {
                    name: "Rating",
                    value: `${res.rating.bayesian} from ${res.rating.users} users.`,
                    inline: true,
                },
                {
                    name: "Tags",
                    value: str,
                    inline: false,
                },],
            footer: 'Use <.help mangadex> for more MangaDex commands!',                
        };
        message.channel.send({embed: membed});

    }
    async function t(){
        const response = await fetch('https://api.mangadex.org/v2/tag');
        const data = await response.json();
        console.log(data);
    }

if(args[0] == 'user'){
u();
}

if(args[0] == 'manga'){
m();
}
if(args[0] == 'tag'){
t();
}

}};




