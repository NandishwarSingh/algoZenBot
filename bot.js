import quizQuestions from "./questions.js";
import { config } from 'dotenv';
import { Client, IntentsBitField } from 'discord.js';
import fs from 'fs';

config(); // Load environment variables

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let messageCount = 0;
let isQuizActive = false;

// Define the specific channel ID for the quiz
const quizChannelId = process.env.TOKEN2;

// Load leaderboard from JSON file
let leaderboard = {};
const leaderboardFile = 'leaderboard.json';

if (fs.existsSync(leaderboardFile)) {
  leaderboard = JSON.parse(fs.readFileSync(leaderboardFile, 'utf-8'));
}

function getRandomQuiz() {
  const randomIndex = Math.floor(Math.random() * quizQuestions.length);
  return quizQuestions[randomIndex];
}

function saveLeaderboard() {
  fs.writeFileSync(leaderboardFile, JSON.stringify(leaderboard, null, 2), 'utf-8');
}

client.on('ready', () => {
  console.log("Bot is Online Baby!");
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // Check if the message is in the desired channel
  if (message.channel.id !== quizChannelId) return;

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

  messageCount++;
  console.log(messageCount);

  if (messageCount % 10 === 0) {
    if (isQuizActive) {
      message.channel.send("A quiz is already active!");
      return;
    }

    isQuizActive = true;
    const quiz = getRandomQuiz();
    message.channel.send("Quiz Time! 🎉");
    message.channel.send(`${quiz.question}\n${quiz.options.join("\n")}`);
    message.channel.send("Type the number of the correct answer.");

    const filter = (response) => {
      return !response.author.bot && response.channel.id === quizChannelId;
    };

    const collector = message.channel.createMessageCollector({ filter, time: 15000 }); // 15 seconds to answer

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
});

client.login(process.env.TOKEN);
