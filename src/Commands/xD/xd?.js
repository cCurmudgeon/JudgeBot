module.exports = {
  name: "spit",
  description: "It just says whatever stuff sent to him/her",
  permission: ["SEND_MESSAGES"],
  args: true,
  usage: "<Message>",
  category: "Client",
  async execute(message, args, prefix, owner, colors) {
    const arg = message.content.slice(prefix.length + 1 + this.name.length);
    message.channel.send(arg).then((d) => {
      setTimeout(() => {
        d.delete();
      }, 4000);
    });
  },
};
