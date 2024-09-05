
import items from "./shopItems.js";
import { config } from 'dotenv';
import { Client, IntentsBitField } from 'discord.js';
import fs from 'fs';
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

config(); // Load environment variables

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let f = 20; 
let messageCount = 15;
let isQuizActive = false;

// Define the specific channel ID for the quiz
const quizChannelId = process.env.TOKEN2;
const quizChannelId2 = process.env.TOKEN3;
// Load leaderboard from JSON file
let leaderboard = {};
const leaderboardFile = 'leaderboard.json';

if (fs.existsSync(leaderboardFile)) {
  leaderboard = JSON.parse(fs.readFileSync(leaderboardFile, 'utf-8'));
}

async function getRandomQuiz() {
  const prompt = ` Generate a random basic Python question aimed at testing fundamental knowledge of the language.
  {
    "question": "",
    "options": [
      "1. ",
      "2. ",
      "3. ",
      "4. "
    ],
    "answer": ""
  }`;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    // Extract the JSON part from the response
    const jsonStart = result.response.text().indexOf('{');
    const jsonEnd = result.response.text().lastIndexOf('}') + 1;
    const jsonResponse = result.response.text().slice(jsonStart, jsonEnd);

    const quiz = JSON.parse(jsonResponse);

    return {
      question: quiz.question,
      options: quiz.options,
      answer: parseInt(quiz.answer), // Ensure the answer is an integer
    };
  } catch (error) {
    console.error("Failed to generate quiz:", error);
    return null; // Handle the error appropriately in your bot
  }
}


function saveLeaderboard() {
  fs.writeFileSync(leaderboardFile, JSON.stringify(leaderboard, null, 2), 'utf-8');
}

client.on('ready', () => {
  console.log("Bot is Online Baby!");
});

client.on('messageCreate', async (message) => {
  if (message.channel.id !== quizChannelId) {
    return; // Ignore commands from other channels
  }
  if (message.author.bot) return;

  if (message.content === "!shop") {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('select-item')
      .setPlaceholder('Purchase an item')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(items.map((item) => 
        new StringSelectMenuOptionBuilder()
          .setLabel(`${item.label} - ${item.price} points`) 
          .setDescription(item.description)
          .setValue(item.value)
      ));
  
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);
  
    await message.reply({
      content: "Select an item from the shop:",
      components: [actionRow],
    });
  }

  if (message.content.startsWith("!gamble")) {
    const args = message.content.split(' ');
    const gamblePoints = parseInt(args[1]);

    if (isNaN(gamblePoints) || gamblePoints <= 0) {
      message.reply("Please enter a valid number of points to gamble.");
      return;
    }

    const username = message.author.username;
    const userPoints = leaderboard[username] || 0;

    if (userPoints < gamblePoints) {
      message.reply(`You don't have enough points to gamble. You currently have ${userPoints} points.`);
      return;
    }

    // Decide if the user wins or loses (10/90 chance)
    const isWin = Math.random() < 0.10;

    if (isWin) {
      leaderboard[username] += gamblePoints;
      message.reply(`🎉 You won! You now have ${leaderboard[username]} points.`);
    } else {
      leaderboard[username] -= gamblePoints;
      message.reply(`😢 You lost! You now have ${leaderboard[username]} points.`);
    }

    saveLeaderboard();
  }

  if (message.content === "!points") {
    const username = message.author.username;
    const points = leaderboard[username] || 0; // Default to 0 if undefined
    message.reply(`${username}, you have ${points} points.`);
  }
  

  if (message.content === "!leaderboard") {
    // Generate and display leaderboard
    const sortedLeaderboard = Object.entries(leaderboard)
      .sort(([, a], [, b]) => b - a)
      .map(([user, points], index) => `${index + 1}. ${user}: ${points} points`)
      .join("\n");

    if (sortedLeaderboard) {
      message.reply(`🏆 **Leaderboard** 🏆\n${sortedLeaderboard}`);
    } else {
      message.reply("The leaderboard is currently empty. Answer quiz questions to earn points!");
    }
    return;
  }

  // Only increment the message count if the message is sent in the quizChannelId
  if (message.channel.id === quizChannelId) {
    messageCount++;
    console.log(messageCount);

    if (messageCount % f === 0) {
      if (isQuizActive) {
        message.channel.send("A quiz is already active!");
        return;
      }

      isQuizActive = true;
      const quiz = await getRandomQuiz();
      message.channel.send(`Quiz Time! 🎉\n${quiz.question}\n${quiz.options.join("\n")}\nType the number of the correct answer.`);
    
      const filter = (response) => {
        return !response.author.bot && response.channel.id === quizChannelId;
      };

      const collector = message.channel.createMessageCollector({ filter, time: 30000 }); // 30 seconds to answer

      collector.on('collect', (response) => {
        if (response.content === quiz.answer.toString()) {
          // Update leaderboard with the correct answer
          const username = response.author.username;
          if (!leaderboard[username]) {
            leaderboard[username] = 0;
          }
          leaderboard[username] += 1; // Increment points
          saveLeaderboard(); // Save the updated leaderboard

          message.channel.send(`🎉 Correct! The answer is ${quiz.options[quiz.answer - 1]}. Congratulations ${username}!`);
          collector.stop();
        } else {
          message.channel.send("❌ Incorrect. Try again!");
        }
      });

      collector.on('end', (collected) => {
        if (!collected.size) {
          message.channel.send("⏰ Time's up! The correct answer was " + quiz.options[quiz.answer - 1] + ".");
        }
        isQuizActive = false;
      });
    }
  }
  
  if (message.content.includes("!question")){
    
    const prompt = message.content ;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    message.reply(result.response.text())
  }
  catch (error) {
    console.error("Failed to generate quiz:", error);
    return null; // Handle the error appropriately in your bot
  }}
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'select-item') {
    const selectedItemValue = interaction.values[0];
    const selectedItem = items.find(item => item.value === selectedItemValue);
    const username = interaction.user.username;

    console.log(`Selected item: ${selectedItem.label}`);
    console.log(`Item price: ${selectedItem.price}`);
    console.log(`User: ${username}`);
    console.log(`User points: ${leaderboard[username]}`);

    if (leaderboard[username] && leaderboard[username] >= selectedItem.price) {
      leaderboard[username] -= selectedItem.price; // Deduct the item price from user's points
      saveLeaderboard(); // Save the updated leaderboard

      // Assign the role if the item has an associated roleId
      if (selectedItem.roleId) {
        const guild = interaction.guild;
        const member = guild.members.cache.get(interaction.user.id);
        const role = guild.roles.cache.get(selectedItem.roleId);
        await interaction.reply(`✅ You have purchased **${selectedItem.label}** for ${selectedItem.price} points. You have been assigned the role **${role.name}**. Your new balance is ${leaderboard[username]} points.`);
        if (role && member) {
          await member.roles.add(role); // Assign the role to the user
         
        } else {
          await interaction.reply("❌ There was an error assigning the role. Please contact an administrator.");
        }
      } else {
        await interaction.reply(`✅ You have purchased **${selectedItem.label}** for ${selectedItem.price} points. Your new balance is ${leaderboard[username]} points.`);
      }
      
    } else {
      const userPoints = leaderboard[username] || 0;
      await interaction.reply(`❌ You don't have enough points to purchase **${selectedItem.label}**. You need ${selectedItem.price - userPoints} more points.`);
    }
  }
});

client.login(process.env.TOKEN);
