module.exports = {
  name: "svrinfo",
  async execute(message, args, prefix, owner, colors) {
    const msgsvr = message.guild.member(message.author);
    data = {
      name: msgsvr.guild.name,
      icon: msgsvr.guild.icon,
      region: msgsvr.guild.region,
      members: msgsvr.guild.memberCount,
      large: msgsvr.guild.large,
      features: msgsvr.guild.features,
      afk: {
        timeout: msgsvr.guild.afkTimeout,
        channel: msgsvr.guild.afkChannelID,
      },
      channel: {
        system: msgsvr.guild.systemChannelID,
        rules: msgsvr.guild.rulesChannelID,
        updates: msgsvr.guild.publicUpdatesChannelID,
      },
      premium: {
        tier: msgsvr.guild.premiumTier,
        premiumSubCount: msgsvr.guild.premiumSubscriptionCount,
      },
      veriLevel: msgsvr.guild.verificationLevel,
      explicitFilter: msgsvr.guild.explicitContentFilter,
      joined: msgsvr.guild.joinedTimestamp,
      notifs: msgsvr.guild.defaultMessageNotifications,
      vanity: {
        url: msgsvr.guild.vanityURLCode,
        usage: msgsvr.guild.vanityURLUses,
      },
    };
    console.log(data);
  },
};
