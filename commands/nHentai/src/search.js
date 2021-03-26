const discordMessage = require("./embed");
const { API } = require("nhentai-api");

const api = new API();

const search = async (searchArg) => {
  api.getBook(searchArg).then((book) => {
    return discordMessage({
      name: book.title,
      id: book.id,
      cover: book.cover,
      upload: book.uploaded,
    });
  });
};

module.exports = {
  search,
};
