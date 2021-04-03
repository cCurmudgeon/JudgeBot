const { uwu } = require("./embed");
const {mum} = require('./serbed');
const {prefix} = require('../../config.json');
const nhentai = require("../../API/nhentai-js/src/index");
const api = new nhentai();


module.exports = {
  name: "nhentai",
async execute(message, args) {
    const arg = message.content.slice(
      prefix.length + 1 + this.name.length + 1 + args[0].length
    );
    const data = mum(await api.query(arg));
    message.channel.send({embed: data}).then(() => {
      const filter = m => m.author.id === message.author.id && (m.content >= 1 && m.content <= 25);
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(res => {
        let no = (res.content - 1);
        const resu = data[no].details.id
        const result = uwu(await api.get(resu));
        message.channel.send({embed: result});
      });
    });

  },
};
