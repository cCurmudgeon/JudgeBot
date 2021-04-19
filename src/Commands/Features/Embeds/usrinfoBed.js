const moment = require("moment");
const Truse = {
  true: "Yes",
  false: "No",
};
function usrinfoBed(user, member, rolemap, color) {
  const embed = {
    color: color,
    title: "User Information",
    thumbnail: {
      url: user.avatarURL({ format: "png", size: 256, dynamic: true }),
    },
    description: "<@" + user.id + ">",
    fields: [
      {
        name: "ID",
        value: user.id,
        inline: false,
      },
      {
        name: "Nickname",
        value: member.nickname !== null ? `${member.nickname}` : "Not given.",
        inline: true,
      },
      {
        name: "Presence Activity",
        value: member.presence.activities[0]
          ? member.presence.activities[0].name
          : "No shown",
        inline: true,
      },
      {
        name: "Status",
        value: member.presence.status,
        inline: true,
      },
      {
        name: "Joined the server on",
        value: moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY"),
        inline: true,
      },
      {
        name: "Joined Discord on",
        value: moment.utc(user.createdAt).format("dddd, MMMM Do YYYY"),
        inline: true,
      },
      {
        name: "Roles",
        value: rolemap,
        inline: false,
      },
    ],
  };
  return embed;
}
module.exports = { usrinfoBed };
