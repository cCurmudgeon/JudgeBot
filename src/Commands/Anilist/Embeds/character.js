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

function charInfoBed(info, colors) {
  let name;
  if (!info.Character.name.last) {
    name = info.Character.name.first;
  } else name = info.Character.name.first + " " + info.Character.name.last;
  const cembed = {
    color: colors,
    title: name,
    author: {
      name: "AniList",
      icon_url: anilistLogo,
    },
    url: info.Character.siteUrl,
    description: pipe(removespacers, shorten)(info.Character.description),
    image: {
      url: info.Character.image.large,
    },
  };
  return cembed;
}
module.exports = { charInfoBed };
