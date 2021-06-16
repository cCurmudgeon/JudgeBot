const { capitalize } = require("../../../Extra/extra");
const TurndownService = require("turndown");
const turndownService = new TurndownService();
const anilistLogo = "https://anilist.co/img/logo_al.png";

const pipe = (op1, op2) => (arg) => op2(op1(arg));
const removespacers = (string) =>
  string.replace(/<br>/gm, "\n").replace(/<br \/>/gm, "");
const shorten = (string) => {
  const markdown = turndownService.turndown(string);
  if (markdown.length > 400) {
    return markdown.substring(0, 400) + "...";
  } else {
    return markdown;
  }
};
function usrInfoBed(info, colors) {
  const uembed = {
    color: colors,
    author: {
      name: "AniList",
      icon_url: anilistLogo,
    },
    title: info.User.name,
    description: pipe(
      removespacers,
      shorten
    )(info.User.about ? info.User.about : "No description."),
    url: info.User.siteUrl,
    thumbnail: {
      url: info.User.avatar.large,
    },
    fields: [
      {
        name: "Days Watched",
        value: Math.round(info.User.statistics.anime.minutesWatched / 60 / 24),
        inline: true,
      },
      {
        name: "Chapters Read",
        value: new Intl.NumberFormat().format(
          info.User.statistics.manga.chaptersRead
        ),
        inline: true,
      },
    ],
  };
  return uembed;
}
module.exports = { usrInfoBed };
