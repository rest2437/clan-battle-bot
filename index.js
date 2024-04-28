require("dotenv").config(); // Import and configure dotenv

const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const baseApi = "https://biggamesapi.io/api/clan/oldd";
const userApi = "https://users.roblox.com/v1/users";
const avatarAPI = "https://thumbnails.roblox.com/v1/users/avatar-3d?userId=";

const olddLogo =
  "https://cdn.discordapp.com/attachments/1227714444348493946/1227717017243750562/MOSHED-2024-4-10-15-20-40-ezgif.com-crop.gif?ex=66296b92&is=6616f692&hm=86cebc9abb80cf0fc10c347c26eda303d791c1e757d8e273a90eff9b26cc19fe&";
const goalTypeDescriptions = {
  7: "Earn Diamonds",
  9: "Break Diamond Breakables",
  12: "Craft Tier 3 Potions",
  13: "Upgrade to Tier III Enchants",
  15: "Collect Enchants",
  20: "Hatch Best Eggs",
  21: "Break Breakables in Best Area",
  22: "Complete the Classic Obby",
  23: "Complete the Minefield",
  24: "Complete Atlantis minigame",
  25: "Digsite",
  26: "Catch Fish in Fishing Minigame",
  27: "Ice Obby Completions",
  28: "Pyramid Obby",
  29: "Jungle Obby",
  33: "Use Flags",
  34: "Use Tier 4 Potions",
  35: "Use Fruits",
  36: "Sled Race",
  37: "Break Coin Jars in Best Area",
  38: "Break Comets in Best Area",
  39: "Break Mini-Chests in Best Area",
  40: "Make Golden Pets from Best Egg",
  41: "Make Rainbow Pets from Best Egg",
  42: 'Hatch Rare "??" Pets',
  43: "Break Piñatas in Best Area",
  44: "Break Lucky Blocks in Best Area",
  45: "Find Chests in Advanced Digsite",
  46: "Catch Fish in Advanced Fishing",
  47: "Index New Pets",
  48: "Break Black Lucky Blocks",
  49: "Collect Fish Shards",
  50: "Collect from Magic Pool",
  51: "Sell Items at Booth",
  52: "Trade with Players",
  53: "Give Free Gifts in Trade",
  54: "Send Free Gifts in Mail",
  55: "Use Secret Key",
  56: "Use Crystal Key",
  57: "Upgrade Fruits",
  58: "Plant in Garden",
  59: "Complete Cart Ride into Preston",
  60: "Complete Hoverboard Obby",
  61: "Spin the Diamond Wheel",
  62: "Complete Item Creator Quests",
  63: "Get Critical Hits",
  64: "Collect Lootbags",
  65: "Collect Fruits",
  66: "Break Piñatas",
  67: "Break Lucky Blocks",
  73: "Break Breakables in Treasure Hideout",
  74: "Drink XP Potions",
};
let prevGoalText1, prevGoalText2, prevGoalText3, prevGoalText4;
let previousMessageId = null; // Variable to store the previous message ID

const discordToRoblox = {
  dropjawed: 155552042,
  duvalgunman: 261851814,
  iincx: 2543300498,
  bdubbins: 3188275156,
  savagexmummy: 1642679118,
  _perf3kcja: 350892979,
  irishkerr: 4099964409,
  ririmaz777: 3718853761,
  sky_rg_: 2934351834,
  natrivan: 1029021537,
  realrzmf: 3761383052,
  deedee4871: 1355566788,
  ctxgal: 5395863668,
  xavierorc: 3348190942,
  pj_sky: 1336081197,
  nakiaura: 2414635042,
  i8ursoul_: 1939753351,
  robdadev: 2387943199,
  chrismilla89: 2402748970,
  cook1221: 4330567436,
  thedude420_69: 2949766930,
  riphunter101234: 2812561883,
  abdoelgameddddd: 2359664949,
  lightoftwelve: 3434366941,
  dianajigmey: 3281019376,
  hugecatguy: 2989505997,
  ".vexnation": 3677493935,
  kimco4087: 955636909,
};

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  const mine = new SlashCommandBuilder()
    .setName("mine")
    .setDescription("Shows your stats");

  const top10 = new SlashCommandBuilder()
    .setName("top10")
    .setDescription("Top 10 players");

  const clan = new SlashCommandBuilder()
    .setName("clan")
    .setDescription("shows clan stats");

  const tasks = new SlashCommandBuilder()
    .setName("tasks")
    .setDescription("Shows clan tasks");

  const test = new SlashCommandBuilder()
    .setName("test")
    .setDescription("For testing");

  const addMe = new SlashCommandBuilder()
    .setName("addme")
    .setDescription("Add me on Roblox");

  const top10Command = top10.toJSON();
  const mineCommand = mine.toJSON();
  const clanCommand = clan.toJSON();
  const tasksCommand = tasks.toJSON();
  const testCommand = test.toJSON();
  const addMeCommand = addMe.toJSON();

  client.application.commands.set([
    top10Command,
    mineCommand,
    clanCommand,
    tasksCommand,
    testCommand,
    addMeCommand,
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  else if (interaction.commandName === "clan") {
    try {
      const dcUsername = interaction.user.username;
      const response = await axios.get(baseApi);
      const goalsData = response.data.data.Battles.GoalBattleTwo.Goals;
      const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
      const formattedPlace = JSON.stringify(currentPlace, null, 2);

      // Initialize an array to hold the fields for the embed
      const embedFields = [];

      // Iterate through each goal data to create embed fields
      for (const goalData of goalsData) {
        const { Progress, Amount, Type, Contributions } = goalData;
        const formattedProgress = JSON.stringify(Progress, null, 2);
        const formattedAmount = JSON.stringify(Amount, null, 2);

        // Determine the text for the field based on the goal type
        const goalText = goalTypeDescriptions[Type] || "Unknown Goal";

        // Sort contributions by points (descending order)
        const sortedContributions = Object.entries(Contributions).sort(
          (a, b) => b[1] - a[1]
        );

        // Initialize the value string for the goal field
        let goalValue = `**${formattedProgress} out of ${formattedAmount}\n**`;

        // Append user contributions to the value string with medals
        for (const [index, [userId, points]] of sortedContributions.entries()) {
          // Remove the 'u' prefix from the user ID
          const cleanUserId = userId.replace(/^u/, "");
          // Fetch Roblox username using the Roblox API
          const robloxResponse = await axios.get(`${userApi}/${cleanUserId}`);
          const robloxUsername = robloxResponse.data.displayName;
          // Determine medal based on index
          let medal = "";
          if (index === 0) medal = "🥇";
          else if (index === 1) medal = "🥈";
          else if (index === 2) medal = "🥉";
          // Add username with points and medal
          goalValue += ` ${robloxUsername}: ${points} ${medal}\n`;
        }

        // Push a field object into the embedFields array for the goal
        embedFields.push({
          name: goalText,
          value: goalValue,
        });
      }

      // Create the base embed
      const Embed1 = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("OLDD Clan Battle Bot")
        .setDescription("Real time clan battle stats")
        .setThumbnail(olddLogo)
        .addFields(
          { name: "Current place", value: formattedPlace },
          { name: "\u200B", value: "\u200B" },
          // Spread the embedFields array into the addFields method
          ...embedFields
        )
        .setTimestamp()
        .setFooter({
          text: "Made by RobDaDev",
          iconURL:
            "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
        });

      // Respond with the base embed
      await interaction.reply({
        content: `Hello ${dcUsername}`,
        embeds: [Embed1],
      });
      console.log("hi");
    } catch (error) {
      console.error("Error fetching clan data:", error);
      await interaction.reply("An error occurred while fetching clan data.");
    }
  } else if (interaction.commandName === "top10") {
    try {
      const dcUsername = interaction.user.username;
      const robloxId = discordToRoblox[dcUsername];
      const response = await axios.get(baseApi);
      const robloxResponse = await axios.get(`${userApi}/${robloxId}`);
      const robloxUsername = robloxResponse.data.displayName;

      const pointContributions =
        response.data.data.Battles.GoalBattleTwo.PointContributions;
      pointContributions.sort((a, b) => b.Points - a.Points);

      // Define an array of usernames to filter out
      const filteredUsernames = ["savagexmummy", "iincx"];

      // Fetch usernames for the top ten players
      const topTenPlayers = [];
      let i = 0;
      while (topTenPlayers.length < 10 && i < pointContributions.length) {
        const userId = pointContributions[i].UserID;
        const points = pointContributions[i].Points;

        const userResponse = await axios.get(`${userApi}/${userId}`);
        const username = userResponse.data.displayName;

        // Skip users that are in the filtered list
        if (filteredUsernames.includes(username)) {
          i++;
          continue;
        }

        topTenPlayers.push({ username, points });
        i++;
      }

      // If we couldn't find 10 players, add placeholders
      while (topTenPlayers.length < 10) {
        topTenPlayers.push({ username: "Placeholder", points: 0 });
      }

      // Create a new MessageEmbed
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Top 10 Players")
        .setTimestamp()
        .setFooter({
          text: "Made by RobDaDev",
          iconURL:
            "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
        });

      // Add fields for the top ten players
      topTenPlayers.forEach((player, index) => {
        let medalEmoji = "";
        if (index === 0) {
          medalEmoji = "🥇"; // Gold medal for first place
        } else if (index === 1) {
          medalEmoji = "🥈"; // Silver medal for second place
        } else if (index === 2) {
          medalEmoji = "🥉"; // Bronze medal for third place
        }

        embed.addFields({
          name: `${medalEmoji} ${player.username}`,
          value: `Points: ${player.points}`,
        });
      });
      // Reply with the embed
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching top 10 players:", error);
      await interaction.reply(
        "An error occurred while fetching the top 10 players."
      );
    }
  } else if (interaction.commandName === "tasks") {
    try {
      const dcUsername = interaction.user.username;
      const response = await axios.get(baseApi);
      const goalsData = response.data.data.Battles.GoalBattleTwo.Goals;
      const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
      const formattedPlace = JSON.stringify(currentPlace, null, 2);

      // Initialize an array to hold the fields for the embed
      const embedFields = [];

      // Iterate through each goal data to create embed fields
      for (let i = 0; i < goalsData.length; i++) {
        const goalData = goalsData[i];
        const { Progress, Amount, Type } = goalData;
        const formattedProgress = JSON.stringify(Progress, null, 2);
        const formattedAmount = JSON.stringify(Amount, null, 2);

        // Determine the text for the field based on the goal type
        const goalText = goalTypeDescriptions[Type] || "Unknown Goal";

        // Push a field object into the embedFields array
        embedFields.push({
          name: goalText,
          value: `${formattedProgress} out of ${formattedAmount}`,
        });
      }

      // Create the base embed
      const Embed1 = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("OLDD Clan Battle Bot")
        .setDescription("Real time clan battle stats")
        .setThumbnail(olddLogo)
        .addFields(
          { name: "Current place", value: formattedPlace },
          { name: "\u200B", value: "\u200B" },
          // Spread the embedFields array into the addFields method
          ...embedFields
        )
        .setTimestamp()
        .setFooter({
          text: "Made by RobDaDev",
          iconURL:
            "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
        });

      // Initialize embedToSend variable
      let embedToSend;

      // Check the username to determine which embed to use
      if (interaction.user.username === "savagexmummy") {
        // Use Embed 3
        embedToSend = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Hi Sav")
          .setImage(
            "https://www.icegif.com/wp-content/uploads/2023/01/icegif-162.gif"
          );
      } else {
        // Use Embed 1
        embedToSend = Embed1;
      }

      // Respond with the appropriate embed
      await interaction.reply({
        content: `Hello ${dcUsername}`,
        embeds: [embedToSend],
      });
    } catch (error) {
      console.error("Error fetching goals:", error);
      await interaction.reply("An error occurred while fetching goals.");
    }
  } else if (interaction.commandName === "mine") {
    try {
      const dcUsername = interaction.user.username;
      // Find the Roblox ID corresponding to the Discord username
      const robloxId = discordToRoblox[dcUsername];
      const response = await axios.get(baseApi);
      const robloxResponse = await axios.get(`${userApi}/${robloxId}`);
      const robloxUsername = robloxResponse.data.displayName;
      const robloxProfileUrl = `https://www.roblox.com/users/${robloxId}/profile`;
      const avatarResponse = await axios.get(avatarAPI + robloxId);
      const avatarLink = avatarResponse.data.imageUrl;
      const avatarURL = avatarLink;
      const startIndex = avatarURL.indexOf("Avatar-") + "Avatar-".length;
      const endIndex = avatarURL.indexOf("-Obj");
      const uniqueIdOfAvatar = avatarURL.substring(startIndex, endIndex);
      const finalAvatarUrl = `https://tr.rbxcdn.com/30DAY-Avatar-${uniqueIdOfAvatar}-Png/352/352/Avatar/Webp/noFilter`;

      const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
      const formattedPlace = JSON.stringify(currentPlace, null, 2);

      const goalData1_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[0].Amount;
      const formattedAmount = JSON.stringify(goalData1_Amount, null, 2);

      const goalData2_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[1].Amount;
      const formattedAmount2 = JSON.stringify(goalData2_Amount, null, 2);

      const goalData3_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[2].Amount;
      const formattedAmount3 = JSON.stringify(goalData3_Amount, null, 2);

      const goalData4_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[3].Amount;
      const formattedAmount4 = JSON.stringify(goalData4_Amount, null, 2);

      if (robloxId) {
        // Function to fetch game stats from Pet Sim 99 API
        async function fetchGameStats(robloxId, goalNumber) {
          try {
            const response = await axios.get(baseApi);
            const goalData =
              response.data.data.Battles.GoalBattleTwo.Goals[goalNumber - 1];
            const goalData_contributions = goalData.Contributions;
            const goalType = goalData.Type;
            const goalName = goalTypeDescriptions[goalType];
            const userContribution = goalData_contributions[`u${robloxId}`];
            if (userContribution) {
              return { name: goalName, contribution: userContribution };
            } else {
              return { name: goalName, contribution: 0 };
            }
          } catch (error) {
            console.error("Error fetching game stats:", error);
            throw error;
          }
        }

        // Function to fetch total user contributions from Pet Sim 99 API
        async function fetchTotalUserContributions() {
          try {
            const response = await axios.get(baseApi);
            const totalUserContributions =
              response.data.data.Battles.GoalBattleTwo.PointContributions;
            const userTotalContribution = totalUserContributions.find(
              (contribution) => contribution.UserID === robloxId
            );
            return userTotalContribution ? userTotalContribution.Points : 0;
          } catch (error) {
            console.error("Error fetching total user contributions:", error);
            throw error;
          }
        }

        // Fetch game stats for each goal using the Roblox ID
        const gameStats1 = await fetchGameStats(robloxId, 1);
        const gameStats2 = await fetchGameStats(robloxId, 2);
        const gameStats3 = await fetchGameStats(robloxId, 3);
        const gameStats4 = await fetchGameStats(robloxId, 4);

        // Fetch total user contributions using the Roblox ID
        const totalUserContribution = await fetchTotalUserContributions();

        // Create the embed
        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          // .setAuthor({ name: "OLDD Clan", iconURL: olddLogo })
          .setTitle("OLDD Clan Battle Bot")
          .setImage(olddLogo)
          .setDescription(`Real time clan battle stats for ${dcUsername}`)
          .setThumbnail(finalAvatarUrl)
          .addFields(
            { name: "Current Clan Placement", value: formattedPlace },
            { name: "\u200B", value: "\u200B" },
            {
              name: "Roblox Profile Link",
              value: `[${robloxUsername}](${robloxProfileUrl})`,
            },
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
            },
            {
              name: "Total Points",
              value: `${totalUserContribution}`,
            }
          )
          // .setImage(finalAvatarUrl)
          .setTimestamp()
          .setFooter({
            text: "Made by RobDaDev",
            iconURL:
              "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
          });

        // Reply with the embed
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply("Your Roblox username is not found.");
      }
    } catch (error) {
      console.error("Error fetching game stats:", error);
      await interaction.reply(
        "An error occurred while fetching your game stats."
      );
    }

    //////////////////////////////end Goal 1/////////////////////////////////////////
  } else if (interaction.commandName === "addme") {
    // Your logic for the "addme" command goes here
    // For example, you can add the user to a list or perform any other action.
    const dcUsername = interaction.user.username;
    // Find the Roblox ID corresponding to the Discord username
    const robloxId = discordToRoblox[dcUsername];
    const response = await axios.get(baseApi);
    const robloxResponse = await axios.get(`${userApi}/${robloxId}`);
    const robloxUsername = robloxResponse.data.displayName;
    const robloxProfileUrl = `https://www.roblox.com/users/${robloxId}/profile`;
    const avatarResponse = await axios.get(avatarAPI + robloxId);
    const avatarLink = avatarResponse.data.imageUrl;
    const avatarURL = avatarLink;
    const startIndex = avatarURL.indexOf("Avatar-") + "Avatar-".length;
    const endIndex = avatarURL.indexOf("-Obj");
    const uniqueIdOfAvatar = avatarURL.substring(startIndex, endIndex);
    const finalAvatarUrl = `https://tr.rbxcdn.com/30DAY-Avatar-${uniqueIdOfAvatar}-Png/352/352/Avatar/Webp/noFilter`;

    const addmeEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Add ${robloxUsername} on Roblox!`)
      .setDescription(`Click [here](${robloxProfileUrl}) to add me on Roblox!`)
      .setImage(finalAvatarUrl) // Replace this with your profile photo URL
      .setTimestamp()
      .setFooter({
        text: "Made by RobDaDev",
        iconURL:
          "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
      });
    // Reply to the interaction with the embed
    await interaction.reply({ embeds: [addmeEmbed] });
  } else if (interaction.commandName === "test") {
    try {
      const response = await axios.get(baseApi);
      const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
      const formattedPlace = JSON.stringify(currentPlace, null, 2);
      const goalsData1 = response.data.data.Battles.GoalBattleTwo.Goals[0].Type;
      const goalsData2 = response.data.data.Battles.GoalBattleTwo.Goals[1].Type;
      const goalsData3 = response.data.data.Battles.GoalBattleTwo.Goals[2].Type;
      const goalsData4 = response.data.data.Battles.GoalBattleTwo.Goals[3].Type;
      const formattedData1 = JSON.stringify(goalsData1, null, 2);
      const formattedData2 = JSON.stringify(goalsData2, null, 2);
      const formattedData3 = JSON.stringify(goalsData3, null, 2);
      const formattedData4 = JSON.stringify(goalsData4, null, 2);

      const dcUsername = interaction.user.username;
      const testEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Testing API")
        .setDescription("Real time clan battle stats")
        .setThumbnail(olddLogo)
        .addFields(
          { name: "Current place", value: formattedPlace },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Goal 1",
            value: formattedData1,
            // inline: true,
          },
          {
            name: "Goal 2",
            value: formattedData2,
            // inline: true,
          },
          {
            name: "Goal 3",
            value: formattedData3,
            // inline: true,
          },
          {
            name: "Goal 4",
            value: formattedData4,
            // inline: true,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Made by RobDaDev",
          iconURL:
            "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
        });

      await interaction.reply({
        // content: `Hello ${dcUsername}`,
        embeds: [testEmbed],
      });
    } catch (error) {
      console.error("error getting data", error);
      await interaction.reply("An error occurred while fetching data.");
    }
  }
});
async function postClanStats() {
  try {
    const response = await axios.get(baseApi);
    const goalsData = response.data.data.Battles.GoalBattleTwo.Goals;
    const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
    const formattedPlace = JSON.stringify(currentPlace, null, 2);

    const embedFields = [];

    for (let i = 0; i < goalsData.length; i++) {
      const { Type, Progress, Amount, Contributions } = goalsData[i];
      const goalText = goalTypeDescriptions[Type] || "Unknown Goal";
      const formattedProgress = JSON.stringify(Progress, null, 2);
      const formattedAmount = JSON.stringify(Amount, null, 2);

      let goalValue = `**${formattedProgress} out of ${formattedAmount}\n**`;

      // Append user contributions to the value string with medals
      const sortedContributions = Object.entries(Contributions).sort(
        (a, b) => b[1] - a[1]
      );
      for (const [index, [userId, points]] of sortedContributions.entries()) {
        const cleanUserId = userId.replace(/^u/, "");
        const robloxResponse = await axios.get(`${userApi}/${cleanUserId}`);
        const robloxUsername = robloxResponse.data.displayName;
        let medal = "";
        if (index === 0) medal = "🥇";
        else if (index === 1) medal = "🥈";
        else if (index === 2) medal = "🥉";
        goalValue += ` ${robloxUsername}: ${points} ${medal}\n`;
      }

      embedFields.push({
        name: goalText,
        value: goalValue,
      });
    }

    const Embed1 = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("OLDD Clan Battle Bot")
      .setDescription("Real time clan battle stats")
      .setThumbnail(olddLogo)
      .addFields(
        { name: "Current place", value: formattedPlace },
        { name: "\u200B", value: "\u200B" },
        ...embedFields
      )
      .setTimestamp()
      .setFooter({
        text: "Made by RobDaDev",
        iconURL:
          "https://cdn.discordapp.com/attachments/1208099637404114954/1208102070364807258/favicon.jpeg?ex=6622a93b&is=6610343b&hm=dc2f5397addc70d953ca2704af9788339278957c206d401edb0bb2d3c44a1fde&",
      });

    const channel = await client.channels.fetch("1229240263617019954"); // Replace with your channel ID
    const messages = await channel.messages.fetch();
    const botMessages = messages.filter(
      (msg) => msg.author.id === client.user.id
    );

    await Promise.all(
      messages.map(async (msg) => {
        try {
          await msg.delete();
          console.log(`Deleted message with ID: ${msg.id}`);
        } catch (error) {
          console.error(`Error deleting message with ID ${msg.id}:`, error);
        }
      })
    );

    const newMessage = await channel.send({
      content: "Automatically posted update:",
      embeds: [Embed1],
    });

    console.log("Updated clan stats");
  } catch (error) {
    console.error("Error fetching and posting clan stats:", error);
  }
}

// Call the function initially
postClanStats();

// Set interval to call the function every 60 seconds
setInterval(postClanStats, 60000);
client.login(TOKEN);

// users
// let userID = "";

// Goals
// const allgoals = response.data.data.Battles.GoalBattleTwo.Goals;
// const goal1 = response.data.data.Battles.GoalBattleTwo.Goals[0];
// const goal2 = response.data.data.Battles.GoalBattleTwo.Goals[1];
// const goal3 = response.data.data.Battles.GoalBattleTwo.Goals[2];
// const goal4 = response.data.data.Battles.GoalBattleTwo.Goals[3];

// const userNames = await axios.get(userApi);
// const userData = userNames.displayName;
// const formattedUserData = JSON.stringify(userData, null, 2);

// const goalData1_contributions =
//   response.data.data.Battles.GoalBattleTwo.Goals[0].Contributions;
// const goalData2_contributions =
//   response.data.data.Battles.GoalBattleTwo.Goals[1].Contributions;
// const goalData3_contributions =
//   response.data.data.Battles.GoalBattleTwo.Goals[2].Contributions;
// const goalData4_contributions =
//   response.data.data.Battles.GoalBattleTwo.Goals[3].Contributions;
