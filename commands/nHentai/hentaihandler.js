const colors = require("../Configurations/colors.json");
const nhentai = require("nhentai-js");
const bbcode = require("bbcode");

module.exports = {
  name: "hentie",
  args: false,
  usage: "<id>",
  WIP: false,
  execute(message, args) {
    const id = args[0];

    //--------------------------------------------------------------------
    const regex = /\([^()]*\)/g;
    const capitalize = (string) =>
      string
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
        )
        .join(" ")
        .replace(regex, "");

    //---------------------------------------------------------------------

    async function s() {
      if (nhentai.exists(id)) {
        const work = await nhentai.getDoujin(id);
        console.log(work);
        let data = {
          title: work.title,
          native: work.nativeTitle ? work.nativeTitle : work.title,
          artist: work.details.artists,
          lang: work.details.languages,
          cate: work.details.categories,
          pages: work.details.pages,
          upload: work.details.uploaded,
          group: work.details.groups,
          tags: work.details.tags,
          url: work.link,
          favicon: "https://i.imgur.com/uLAimaY.png",
        };
        let reader = {
          pages: work.pages,
        };
        let tagdata = [];
        data.tags.forEach(tag => tagdata.push(`https://nhentai.net/tag/${tag}`));
        tagged = tagdata.toString().replace(regex, "").replace(" ", "-");
        console.log(tagged);

        const embed = {
          color: colors.nhentai,
          title: data.title,
          url: data.url,
          image: {
            url: reader.pages[0],
          },
          author: {
            name: "nHentai",
            icon_url: data.favicon,
            url: "https://nhentai.net",
          },
          fields: [
            {
              name: "Language",
              value: capitalize(data.lang),
              inline: true,
            },
            {
              name: "Artist",
              value: capitalize(data.artist),
              inline: true,
            },
            {
              name: "Category",
              value: capitalize(data.cate),
              inline: true,
            },
            {
              name: "Pages",
              value: data.pages,
              inline: true,
            },
            {
                name: "Group",
                value: data.group,
                inline: true,
            },
            {
              name: "Uploaded Date",
              value: data.upload,
              inline: true,
            },
            {
              name: "Native Title",
              value: data.native,
              inline: false,
            },
            {
              name: "Tags",
              value: "wip",
              inline: false,
            },
          ],
        };
        message.channel.send({ embed: embed });
      }
    }
    s();
  },
};
