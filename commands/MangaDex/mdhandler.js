const dotenv = require("dotenv").config({
  path: "../../tokens.env",
});
const moment = require("moment");
const bbcode = require("bbcode");
const api = require("mangadex-full-api");
const usrname = process.env.MDUSR;
const pass = process.env.MDPASS;

const { prefix } = require("../../config.json");
const filters = require("./ids");
const colors = require("../Configurations/colors.json");
const fetch = require("node-fetch");

module.exports = {
  name: "mangadex",
  description: "quick command handling",
  args: true,
  usage: "<type> <name>",
  WIP: false,

  execute(message, args) {
    const command = "mangadex";
    const arg = message.content.slice(
      prefix.length + 1 + command.length + 1 + args[0].length
    );
    console.log(arg);
    message.reply("Search will take a bit of time, sit tight!");

    //----------------------------------------------------------------------------------
    const regex = /\[(|\/).+?]/gm;
    const pipe = (op1, op2) => (arg) => op2(op1(arg));
    const removespacers = (string) => string.replace(regex, "");
    const shorten = (string) => {
      const mark = bbcode.parse(string);
      markdown = mark.replace(/<br>/gm, "\n");
      if (markdown.length > 400) {
        return markdown.substring(0, 400) + "...";
      } else {
        return markdown;
      }
    };
    const truefalse = {
      true: "Yes",
      false: "No",
    };
    //----------------------------------------------------------------------------------
    async function manga() {
      api.agent.login(usrname, pass, false).then(async () => {
        var manga = new api.Manga();
        await manga.fillByQuery(arg).catch(error => {
          console.log(error);
        });

        if(manga.id === undefined){
          return message.reply(`No manga named ${arg} found.`);
        }


        let data = {
          id: manga.id,
          url: manga.url,
          title: manga.title,
          altTitle: manga.altTitles.join(", "),
          author: manga.authors,
          views: manga.views,
          genre: manga.genreNames.join(", "),
          cover: manga.cover,
          lang: filters.ids.lang[manga.language],
          hentai: truefalse[manga.hentai],
          desc: pipe(removespacers, shorten)(manga.description),
          links: manga.links,
          rating: manga.rating,
          ratemean: manga.ratingMean,
          rateusr: manga.ratingUserCount,
          favicon: "https://i.imgur.com/gFzVv6g.png",
        };
        const mangaembed = {
          color: colors.MD_yellow,
          title: data.title,
          url: data.url,
          author: {
            name: "MangaDex",
            icon_url: data.favicon,
            url: "https://mangadex.org",
          },
          thumbnail: {
            url: data.cover,
          },
          description: data.desc,
          fields: [
            {
              name: "Horny?",
              value: data.hentai,
              inline: true,
            },
            {
              name: "Author",
              value: data.author,
              inline: true,
            },
            {
              name: "Language",
              value: data.lang,
              inline: true,
            },
            {
              name: "Bayesian Rating",
              value: data.rating,
              inline: true,
            },
            {
              name: "Mean Rating",
              value: `${data.ratemean} from ${data.rateusr} readers`,
              inline: true,
            },
            {
              name: "Views",
              value: data.views,
              inline: true,
            },
            {
              name: "Genres",
              value: data.genre,
              inline: false,
            },
            {
              name: "Alternative Titles",
              value: data.altTitle,
              inline: false,
            },
          ],
        };
        message.channel.send({ embed: mangaembed });
      });
    }
    //----------------------------------------------------------------------------------
    async function user() {
      api.agent.login(usrname, pass, false).then(async () => {
        var user = new api.User();
        await user.fillByQuery(arg).catch((error) => console.log(error));

        if(user.id === undefined){
          return message.reply(`No user named ${arg} found.`);
        }

        //time conversion unix > human lol [Thanks Teasday!]
        var date = new Date(user.timeJoined * 1000);
        let cordate = date.toLocaleDateString("UTC");
        var seen = new Date(user.timeLastSeen * 1000);
        let seenAtaprox = moment(seen).startOf("minutes").fromNow();

        let data = {
          id: user.id,
          url: user.url,
          user: user.username,
          bio: pipe(removespacers, shorten)(user.biography),
          avatar: user.avatar,
          views: user.views,
          uploads: user.uploads,
          lvl: filters.ids.lvlId[user.levelId],
          seen: seenAtaprox,
          joined: cordate,
          prem: user.premium,
          mdHome: user.mdAtHome,
          favicon: "https://i.imgur.com/gFzVv6g.png",
        };
        const uembed = {
          color: colors.MD_yellow,
          title: data.user,
          url: data.url,
          author: {
            name: "MangaDex",
            icon_url: data.favicon,
            url: "https://mangadex.org",
          },
          thumbnail: {
            url: data.avatar,
          },
          description: data.bio,
          fields: [
            {
              name: "ID",
              value: data.id,
              inline: true,
            },
            {
              name: "Role",
              value: data.lvl,
              inline: true,
            },
            {
              name: "Uploads",
              value: data.uploads,
              inline: true,
            },
            {
              name: "MD@Home client?",
              value: truefalse[data.mdHome],
              inline: true,
            },
            {
              name: "Premium?",
              value: truefalse[data.prem],
              inline: true,
            },
            {
              name: "Views",
              value: data.views,
              inline: true,
            },
            {
              name: "Last Seen",
              value: data.seen,
              inline: false,
            },
            {
              name: "Joined MangaDex",
              value: data.joined,
              inline: false,
            },
          ],
        };
        message.channel.send({ embed: uembed });
      });
    }
    async function group() {
      api.agent.login(usrname, pass, false).then(async () => {
        var group = new api.Group();
        await group.fillByQuery(arg).catch((error) => console.log(error));

        if(group.id === undefined){
          return message.reply(`No group named ${arg} found.`);
        }

        //time conversion unix > human lol [Thanks Teasday!]
        var date = new Date(group.founded * 1000);
        let cordate = date.toLocaleDateString("UTC");

        let data = {
          id: group.id,
          url: group.url,
          title: group.title,
          desc: pipe(removespacers, shorten)(group.description),
          lang: group.language,
          views: group.views,
          uploads: group.uploads,
          follow: group.followers,
          mems: group.members,
          leader: group.leader.username,
          found: group.founded,
          banner: group.banner,
          inact: truefalse[group.inactive],
          favicon: "https://i.imgur.com/gFzVv6g.png",
        };
        console.log(`${data.leader}, ${data.found}`)
        const gembed = {
          color: colors.MD_yellow,
          title: data.title,
          url: data.url,
          image: {
            url: data.banner,
          },
          author: {
            name: "MangaDex",
            icon_url: data.favicon,
            url: "https://mangadex.org",
          },
          description: data.desc,
          fields: [
            {
              name: "ID",
              value: data.id,
              inline: true,
            },
            {
              name: "Leader",
              value: data.leader,
              inline: true,
            },
            {
              name: "Uploads",
              value: data.uploads,
              inline: true,
            },
            {
              name: "Views",
              value: data.views,
              inline: true,
            },
            {
              name: "Language",
              value: data.lang,
              inline: true,
            },
            {
              name: "Views",
              value: data.views,
              inline: true,
            },
            {
              name: "Follows",
              value: data.follow,
              inline: false,
            },
            {
              name: "Founded",
              value: data.found,
              inline: false,
            },
          ],
        };
        message.channel.send({ embed: gembed });
      });
    }
    if (args[0] === "manga" || args[0] === "m") {
      manga();
    } else if (args[0] === "users" || args[0] === "u") {
      user();
    } else if (args[0] === "group" || args[0] === "g") {
      group();
    } else return;
  },
};
