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
};

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  const mine = new SlashCommandBuilder()
    .setName("mine")
    .setDescription("Shows your stats");

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("testing user data");

  const clan = new SlashCommandBuilder()
    .setName("clan")
    .setDescription("shows clan stats");

  const tasks = new SlashCommandBuilder()
    .setName("tasks")
    .setDescription("Shows clan tasks");

  const test = new SlashCommandBuilder()
    .setName("test")
    .setDescription("For testing");
  const mineCommand = mine.toJSON();
  const pingCommand = ping.toJSON();
  const clanCommand = clan.toJSON();
  const tasksCommand = tasks.toJSON();
  const testCommand = test.toJSON();

  client.application.commands.set([
    mineCommand,
    clanCommand,
    tasksCommand,
    pingCommand,
    testCommand,
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    const dcUsername = interaction.user.username;
    await interaction.reply(`Hello ${dcUsername}`);
  } else if (interaction.commandName === "tasks") {
    try {
      const dcUsername = interaction.user.username;
      const response = await axios.get(baseApi);
      const goalsData = response.data.data.Battles.GoalBattleTwo.Goals;
      const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
      const formattedPlace = JSON.stringify(currentPlace, null, 2);

      ///////////////////////  GOAL 1  ////////////////////////////
      const goalsData1 = response.data.data.Battles.GoalBattleTwo.Goals[0];
      const goalData1_Progress =
        response.data.data.Battles.GoalBattleTwo.Goals[0].Progress;
      const goalData1_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[0].Amount;
      let goalsData1_task =
        response.data.data.Battles.GoalBattleTwo.Goals[0].Type;
      // data to json
      const formatteProgress = JSON.stringify(goalData1_Progress, null, 2);
      const formattedAmount = JSON.stringify(goalData1_Amount, null, 2);
      let goalText1;
      for (const key in goalTypeDescriptions) {
        if (parseInt(key) === goalsData1_task) {
          goalText1 = goalTypeDescriptions[key];
          console.log(`${goalsData1_task} is: ${goalText1}`);
          break;
        }
      }
      ///////////////////////  END GOAL 1  ////////////////////////
      ///////////////////////  GOAL 2  ////////////////////////////
      const goalsData2 = response.data.data.Battles.GoalBattleTwo.Goals[1];
      const goalData2_Progress =
        response.data.data.Battles.GoalBattleTwo.Goals[1].Progress;
      const goalData2_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[1].Amount;
      let goalsData2_task =
        response.data.data.Battles.GoalBattleTwo.Goals[1].Type;
      // data to json
      const formatteProgress2 = JSON.stringify(goalData2_Progress, null, 2);
      const formattedAmount2 = JSON.stringify(goalData2_Amount, null, 2);
      let goalText2;
      for (const key in goalTypeDescriptions) {
        if (parseInt(key) === goalsData2_task) {
          goalText2 = goalTypeDescriptions[key];
          console.log(`${goalsData2_task} is: ${goalText2}`);
          break;
        }
      }
      ///////////////////////  END GOAL 2  ////////////////////////

      ///////////////////////  GOAL 3  ////////////////////////////
      const goalsData3 = response.data.data.Battles.GoalBattleTwo.Goals[2];
      const goalData3_Progress =
        response.data.data.Battles.GoalBattleTwo.Goals[2].Progress;
      const goalData3_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[2].Amount;
      let goalsData3_task =
        response.data.data.Battles.GoalBattleTwo.Goals[2].Type;
      // data to json
      const formatteProgress3 = JSON.stringify(goalData3_Progress, null, 2);
      const formattedAmount3 = JSON.stringify(goalData3_Amount, null, 2);
      let goalText3;
      for (const key in goalTypeDescriptions) {
        if (parseInt(key) === goalsData3_task) {
          goalText3 = goalTypeDescriptions[key];
          console.log(`${goalsData3_task} is: ${goalText3}`);
          break;
        }
      }
      ///////////////////////  END GOAL 3  ////////////////////////
      ///////////////////////  GOAL 4  ////////////////////////////
      const goalsData4 = response.data.data.Battles.GoalBattleTwo.Goals[3];
      const goalData4_Progress =
        response.data.data.Battles.GoalBattleTwo.Goals[3].Progress;
      const goalData4_Amount =
        response.data.data.Battles.GoalBattleTwo.Goals[3].Amount;
      let goalsData4_task =
        response.data.data.Battles.GoalBattleTwo.Goals[3].Type;
      // data to json
      const formatteProgress4 = JSON.stringify(goalData4_Progress, null, 2);
      const formattedAmount4 = JSON.stringify(goalData4_Amount, null, 2);
      let goalText4;
      for (const key in goalTypeDescriptions) {
        if (parseInt(key) === goalsData4_task) {
          goalText4 = goalTypeDescriptions[key];
          console.log(`${goalsData4_task} is: ${goalText4}`);
          break;
        }
      }
      ///////////////////////  END GOAL 4  ////////////////////////

      // Format goalsData into a printable format
      // const formattedData = JSON.stringify(goalsData, null, 2);
      // const formattedData1 = JSON.stringify(goalsData1, null, 2);
      // const formattedData2 = JSON.stringify(goalsData2, null, 2);
      // const formattedData3 = JSON.stringify(goalsData3, null, 2);
      // const formattedData4 = JSON.stringify(goalsData4, null, 2);

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
      // Respond with the formatted data
      let embedToSend;

      // Check if the username is robdadev
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

      if (robloxId) {
        // Get the Roblox username using the Roblox ID
        const robloxResponse = await axios.get(`${userApi}/${robloxId}`);
        const robloxUsername = robloxResponse.data.displayName;
        const robloxProfileUrl = `https://www.roblox.com/users/${robloxId}/profile`;

        await interaction.reply({
          content: `Hello ${dcUsername}, your Roblox username is: [${robloxUsername}](${robloxProfileUrl})`,
        });
      } else {
        await interaction.reply("Your Roblox username is not found.");
      }
    } catch (error) {
      console.error("Error fetching Roblox username:", error);
      await interaction.reply(
        "An error occurred while fetching your Roblox username."
      );
    }
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
async function fetchDataAndPost() {
  try {
    const response = await axios.get(baseApi);
    const goalsData1 = response.data.data.Battles.GoalBattleTwo.Goals[0].Type;
    const goalsData2 = response.data.data.Battles.GoalBattleTwo.Goals[1].Type;
    const goalsData3 = response.data.data.Battles.GoalBattleTwo.Goals[2].Type;
    const goalsData4 = response.data.data.Battles.GoalBattleTwo.Goals[3].Type;
    const currentPlace = response.data.data.Battles.GoalBattleTwo.Place;
    const formattedPlace = JSON.stringify(currentPlace, null, 2);

    const goalData1_Progress =
      response.data.data.Battles.GoalBattleTwo.Goals[0].Progress;
    const goalData1_Amount =
      response.data.data.Battles.GoalBattleTwo.Goals[0].Amount;
    const formatteProgress1 = JSON.stringify(goalData1_Progress, null, 2);
    const formattedAmount1 = JSON.stringify(goalData1_Amount, null, 2);

    const goalData2_Progress =
      response.data.data.Battles.GoalBattleTwo.Goals[1].Progress;
    const goalData2_Amount =
      response.data.data.Battles.GoalBattleTwo.Goals[1].Amount;
    const formatteProgress2 = JSON.stringify(goalData2_Progress, null, 2);
    const formattedAmount2 = JSON.stringify(goalData2_Amount, null, 2);

    const goalData3_Progress =
      response.data.data.Battles.GoalBattleTwo.Goals[2].Progress;
    const goalData3_Amount =
      response.data.data.Battles.GoalBattleTwo.Goals[2].Amount;
    const formatteProgress3 = JSON.stringify(goalData3_Progress, null, 2);
    const formattedAmount3 = JSON.stringify(goalData3_Amount, null, 2);

    const goalData4_Progress =
      response.data.data.Battles.GoalBattleTwo.Goals[3].Progress;
    const goalData4_Amount =
      response.data.data.Battles.GoalBattleTwo.Goals[3].Amount;
    const formatteProgress4 = JSON.stringify(goalData4_Progress, null, 2);
    const formattedAmount4 = JSON.stringify(goalData4_Amount, null, 2);

    let goalText1, goalText2, goalText3, goalText4;

    for (const key in goalTypeDescriptions) {
      if (parseInt(key) === goalsData1) {
        goalText1 = goalTypeDescriptions[key];
        break;
      }
    }

    for (const key in goalTypeDescriptions) {
      if (parseInt(key) === goalsData2) {
        goalText2 = goalTypeDescriptions[key];
        break;
      }
    }

    for (const key in goalTypeDescriptions) {
      if (parseInt(key) === goalsData3) {
        goalText3 = goalTypeDescriptions[key];
        break;
      }
    }

    for (const key in goalTypeDescriptions) {
      if (parseInt(key) === goalsData4) {
        goalText4 = goalTypeDescriptions[key];
        break;
      }
    }

    if (
      prevGoalText1 !== goalText1 ||
      prevGoalText2 !== goalText2 ||
      prevGoalText3 !== goalText3 ||
      prevGoalText4 !== goalText4
    ) {
      // Update previous values
      prevGoalText1 = goalText1;
      prevGoalText2 = goalText2;
      prevGoalText3 = goalText3;
      prevGoalText4 = goalText4;

      const Embed1 = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("OLDD Clan Battle Bot")
        .setDescription("Real time clan battle stats")
        .setThumbnail(olddLogo)
        .addFields(
          { name: "Current place", value: formattedPlace },
          { name: "\u200B", value: "\u200B" },
          {
            name: goalText1,
            value: `${formatteProgress1} out of ${formattedAmount1}`,
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

      // Post the data to a specific channel or wherever you want
      const channel = await client.channels.fetch("1229240263617019954");

      // If there is a previous message, delete it
      if (previousMessageId) {
        const previousMessage = await channel.messages.fetch(previousMessageId);
        await previousMessage.delete();
        console.log("updated");
      }

      // Send the new message and store its ID
      const newMessage = await channel.send({
        content: "Automatically posted update:",
        embeds: [Embed1],
      });
      previousMessageId = newMessage.id;
    }
    console.log("checked");
  } catch (error) {
    console.error("Error fetching and posting data:", error);
  }
}

// Run the function every 60 seconds
setInterval(fetchDataAndPost, 60000);

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
