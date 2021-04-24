module.exports = {
  name: "guildMemberAdd",
  once: false,
  execute(member, client) {
    //Also ^ member is just client.on("guildMemberAdd", member => {}) || just an event listener nothing special.

    // This is what I prefer.
    // This fetches any channel that has "general" in it's name and send the message there.
    const response = [];
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );
    if (!channel) return;
    response.push("Welcome to " + member.guild.name + ", " + member + "\n");
    response.push("Server has " + member.guild.memberCount + " members now!");
    channel.send(response);

    // This is what you had.
    // Uses the channel and guild IDs.
    //From what I see your code doesn't have a problem...?
    if (member.guild.id === "698062395263942686") {
      client.channels.cache
        .get("817143622956613642")
        .send(
          `Welcome ${member}, we hope you have a great time here! \n We have ${member.guild.memberCount} members now!`
        );
    }

    //If I have to use your method, I'll do something like this.
    //Reason being I don't have to call for client again. And I'm based.
    if (member.guild.id === "698062395263942686") {
      const channel = member.guild.channels.cache.find(
        (ch) => ch.id === "817143622956613642"
      );
      channel.send(
        `Welcome ${member}, we hope you have a bad time here! \n We have ${member.guild.memberCount} members now!`
      );
    }
  },
};
