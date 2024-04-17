const embed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("OLDD Clan Battle Bot")
  .setDescription("Real time clan battle stats")
  .setThumbnail(olddLogo)
  .addFields(
    { name: "Current place", value: formattedPlace },
    { name: "\u200B", value: "\u200B" },
    {
      name: gameStats1.name,
      value: `${gameStats1.contribution} out of ${formattedAmount}`,
    },
    {
      name: gameStats2.name,
      value: `${gameStats2.contribution} out of ${formattedAmount2}`,
    },
    {
      name: gameStats3.name,
      value: `${gameStats3.contribution} out of ${formattedAmount3}`,
    },
    {
      name: gameStats4.name,
      value: `${gameStats4.contribution} out of ${formattedAmount4}`,
    }
  )
  .setTimestamp()
  .setFooter({
    text: "Made by RobDaDev",
    iconURL:
      "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
  });

////////////////////////////////////////////////////////////////////////////////////////////////

const Embed1 = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("OLDD Clan Battle Bot")
  // .setAuthor({ name: `Hello ${dcUsername}` })
  .setDescription("Real time clan battle stats")
  .setThumbnail(olddLogo)
  .addFields(
    { name: "Current place", value: formattedPlace },
    { name: "\u200B", value: "\u200B" },
    {
      name: goalText1,
      value: `${formatteProgress} out of ${formattedAmount}`,
      // inline: true,
    },
    {
      name: goalText2,
      value: `${formatteProgress2} out of ${formattedAmount2}`,
      // inline: true,
    },
    {
      name: goalText3,
      value: `${formatteProgress3} out of ${formattedAmount3}`,
      // inline: true,
    },
    {
      name: goalText4,
      value: `${formatteProgress4} out of ${formattedAmount4}`,
      // inline: true,
    }
  )
  .setTimestamp()
  .setFooter({
    text: "Made by RobDaDev",
    iconURL:
      "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
  });
