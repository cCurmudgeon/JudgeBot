const { Message } = require("discord.js");
const TurndownService = require("turndown");
const turndownService = new TurndownService();

const colors = require('../../Configurations/colors.json');

const pipe = (op1, op2) => arg => op2(op1(arg));
const removeSpoilers = str => str.replace(/<span[^>]*>.*<\/span>/g, "");
const shorten = str => {
    const markdown = turndownService.turndown(str);
    if (markdown.length > 400) {
        return markdown.substring(0, 400) + "...";
    } else {
        return markdown;
    }
};

const discordMessage = ({
    title,
    id,
    cover,
    upload,
} = {}) => {
    return({
        title: title,
        thumbnail: {
            url: cover
        },
        description: `${id} at ${upload}`,
    });
};

module.exports = discordMessage;