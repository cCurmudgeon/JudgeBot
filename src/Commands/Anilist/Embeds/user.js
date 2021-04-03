const anilistLogo = "https://anilist.co/img/logo_al.png";

function usrInfoBed(info, colors) {
  const uembed = {
    color: colors,
    author: {
      name: "AniList",
      icon_url: anilistLogo,
    },
    title: info.User.name,
    description: info.User.about ? info.User.about : "No description.",
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
