const {prefix} = require('../../config.json');
const colors = require("../Configurations/colors.json");
const TurndownService = require("turndown");
const turndownService = new TurndownService();
const anilistLogo = "https://anilist.co/img/logo_al.png";
const query = require("./query");

//-+-+-+-+-+-+-+-+-+-+-+-+-Allow to Fetch+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
const {
    GraphQLClient
} = require("graphql-request");

const client = new GraphQLClient("https://graphql.anilist.co", {
    redirect: "follow"
});

const fetch = (query, variables) =>
    client
    .request(query, variables)
    .then(data => data)
    .catch(error => ({
        error: error.response.errors[0] || "Unknown Error"
    }));

//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
module.exports = {
    name: 'anilist',

    execute(message, args, ) {

        //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
        const pipe = (op1, op2) => arg => op2(op1(arg));
        const removespacers = string => string.replace(/<br>/gm, "\n").replace(/<br \/>/gm, "");
        const shorten = string => {
            const markdown = turndownService.turndown(string);
            if (markdown.length > 400) {
                return markdown.substring(0, 400) + "...";
            } else {
                return markdown;
            }
        };
        const capitalize = string => string.split("_").map(word => word.charAt(0)
            .toUpperCase() + word.substring(1).toLowerCase()).join(" ");
        //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

        const command = 'anilist';
        const arg = message.content.slice(prefix.length + 1 + command.length + 1 + args[0].length);

        //=====================Anime/Manga Search================================
        const search = async (arg, type) => {
            const response = await fetch(query.aniq, {
                search: arg,
                type
            });

            if (response.error) {
                console.log(response.error);
                if (response.error.status === 404) {
                    message.reply(`No results`);
                }
                return;
            }
            const data = response.Media;
            let info = {
                title: data.title.english ? data.title.english : data.title.romaji,
                native: data.title.native,
                id: data.id,
                desc: data.description,
                genre: (data.genres).join(", "),
                format: data.format,
                type: data.type,
                image: data.coverImage.extraLarge,
                link: data.siteUrl,
                average: data.averageScore,
                status: data.status,
                episodes: data.episodes,
                hentai: data.isAdult,
                anilogo: anilistLogo,
            };
            const truefalse = {
                "true": "Yes",
                "false": "No"
            };
            const embed = {
                color: colors.anilist_blue,
                author: {
                    name: 'AniList',
                    icon_url: info.anilogo
                },
                title: `${info.title}`,
                description: pipe(removespacers, shorten)(info.desc),
                url: info.link,
                thumbnail: {
                    url: info.image
                },
                fields: [{
                        name: 'Horny?',
                        value: truefalse[info.hentai],
                        inline: true
                    },
                    {
                        name: 'Format',
                        value: capitalize(info.format),
                        inline: true
                    },
                    {
                        name: 'Type',
                        value: capitalize(info.type),
                        inline: true
                    },
                    {
                        name: 'Rating',
                        value: info.average,
                        inline: true
                    },
                    {
                        name: 'Episodes',
                        value: info.episodes,
                        inline: true
                    },
                    {
                        name: 'Status',
                        value: capitalize(info.status),
                        inline: true
                    },
                    {
                        name: 'Genre',
                        value: info.genre,
                        inline: false
                    },
                    {
                        name: 'Native Title',
                        value: info.native,
                        inline: false
                    }
                ]
            };
            message.channel.send({
                embed: embed
            });
        };
        //=========================User search=============================================
        const usearch = async (arg) => {
            const response = await fetch(query.usrq, {
                search: arg
            });

            if (response.error) {
                console.log(response.error);
                if (response.error.status === 404) {
                    message.reply(`No results`);
                }
                return response;
            }


            const data = response.User;

            let dec;
            if (data.about === null) {
                dec = 'User doesn\'t have a description.';
            } else dec = data.about;

            let info = {

                name: data.name,
                id: data.id,
                about: pipe(removespacers, shorten)(dec),
                avatar: data.avatar.large,
                minwatc: (data.statistics.anime.minutesWatched / 60 / 24),
                charead: data.statistics.manga.chaptersRead,
                link: data.siteUrl,
                anilogo: anilistLogo
            };

            const uembed = {
                color: colors.anilist_blue,
                author: {
                    name: 'AniList',
                    icon_url: info.anilogo
                },
                title: `${info.name}`,
                description: info.about,
                url: info.link,
                thumbnail: {
                    url: info.avatar
                },
                fields: [{
                        name: 'Days Watched',
                        value: Math.round(info.minwatc),
                        inline: true
                    },
                    {
                        name: 'Chapters Read',
                        value: info.charead,
                        inline: true
                    }
                ]

            };
            message.channel.send({
                embed: uembed
            });
        };
        //=====================Character Search=======================================

        const csearch = async arg => {
            const response = await fetch(query.charq, {
                search: arg
            });

            if (response.error) {
                console.log(response.error);
                if (response.error.status === 404) {
                    message.reply(`No results`);
                }
                return response;

            }

            const data = response.Character;

            let name = data.name.first;
            if (data.name.last != null) {
                name += ` ${data.name.last}`;
            }

            let info = {
                name: name,
                url: data.siteUrl,
                imageUrl: data.image.large,
                description: data.description
            };

            const cembed = {
                color: colors.anilist_blue,
                title: info.name,
                url: info.url,
                description: pipe(removespacers, shorten)(info.description),
                image: {
                    url: info.imageUrl
                },
            };
            message.channel.send({
                embed: cembed
            });
        };



        //=====================Argument Listeners=================================
        if (args[0] === 'anime' || args[0] === 'a') {
            responce = search(arg, "ANIME");
        } else if (args[0] === 'manga' || args[0] === 'm') {
            response = search(arg, "MANGA");
        } else if (args[0] === 'user' || args[0] === 'u') {
            response = usearch(arg);
        } else if (args[0] === 'character' || args[0] === 'c') {
            response = csearch(arg);
        } else
            message.reply('``.help anilist`` **for command information.**');

    }
};