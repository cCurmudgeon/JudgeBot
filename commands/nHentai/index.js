const { response } = require("express");
const { API } = require("nhentai-api");
const api = new API();

module.exports = {
  name: "nhentai",
  execute(message, args) {
    const search = async (searchArg) => {
      await api.getBook(searchArg).then((book) => {
        console.log(book);

        const data = {
          title: book.title.pretty,
          id: book.id,
          cover: book.cover[0],
          upload: book.uploaded,
        };
        const embed = {
          title: data.title,
          thumbnail: {
            url: data.cover,
          },
          description: `${data.id} at ${data.upload}`,
        };
        message.channel.send({embed: embed});
      });
    };

    async function a(){
      if (args[0] === "book" || args[0] === "b") {
        await search(args[1]);

      }
    }a();
  },
};
