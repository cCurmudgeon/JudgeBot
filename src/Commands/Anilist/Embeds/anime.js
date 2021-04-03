const { capitalize } = require("../API/filters");
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
const truefalse = {
  true: "Yes",
  false: "No",
};

function aniInfoBed(info, colors) {
  const anibed = {
    color: colors,
    author: {
      name: "AniList",
      icon_url: anilistLogo,
    },
    title: info.Media.title.english
      ? info.Media.title.english
      : info.Media.title.romaji,
    description: pipe(removespacers, shorten)(info.Media.description),
    url: info.Media.siteUrl,
    thumbnail: {
      url: info.Media.coverImage.extraLarge,
    },
    fields: [
      {
        name: "NSFW",
        value: truefalse[info.Media.isAdult],
        inline: true,
      },
      {
        name: "Format",
        value: capitalize(info.Media.format),
        inline: true,
      },
      {
        name: "Type",
        value: capitalize(info.Media.type),
        inline: true,
      },
      {
        name: "Rating",
        value: info.Media.averageScore
          ? info.Media.averageScore
          : "Not Rated by users",
        inline: true,
      },
      {
        name: "Episodes",
        value: info.Media.episodes ? info.Media.episodes : "Not specified",
        inline: true,
      },
      {
        name: "Status",
        value: capitalize(info.Media.status),
        inline: true,
      },
      {
        name: "Genre",
        value: info.Media.genres.join(", ")
          ? info.Media.genres.join(", ")
          : "Not specified",
        inline: false,
      },
      {
        name: "Native Title",
        value: info.Media.title.native + " [" + info.Media.title.romaji + "]",
        inline: false,
      },
    ],
  };
  return anibed;
}
module.exports = { aniInfoBed };
