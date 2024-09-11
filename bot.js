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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

let f = 30; 
let messageCount = 10;
let isQuizActive = false;

// Define the specific channel ID for the quiz
const quizChannelId = process.env.TOKEN2;

// Load leaderboard from JSON file
let leaderboard = {};
const leaderboardFile = 'leaderboard.json';

if (fs.existsSync(leaderboardFile)) {
  leaderboard = JSON.parse(fs.readFileSync(leaderboardFile, 'utf-8'));
}

async function getRandomQuiz() {
  let questions = [
   "What is the difference between a list and a tuple in Python?",
    "How do you create a virtual environment in Python?",
    "What does the 'pass' statement do in Python?",
    "What is the difference between 'is' and '==' in Python?",
    "How do you define a function in Python?",
    "What is a lambda function in Python?",
    "Explain how the Python 'with' statement works.",
    "What are Python decorators?",
    "How do you handle exceptions in Python?",
    "What is the purpose of 'self' in a Python class?",
    "What is list comprehension in Python?",
    "What is the purpose of the 'global' keyword in Python?",
    "How do you convert a string to a number in Python?",
    "What are Python generators?",
    "How do you install an external package in Python?",
    "What is the purpose of the 'break' statement in loops?",
    "What does the 'continue' statement do in Python?",
    "What are Python modules and how do you import them?",
    "Explain the difference between shallow copy and deep copy in Python.",
    "How can you iterate over a dictionary in Python?",
    "What is the difference between 'append()' and 'extend()' in a list?",
    "What are the key differences between Python 2 and Python 3?",
    "How do you reverse a list in Python?",
    "What is a dictionary in Python and how do you create one?",
    "How do you remove a key-value pair from a dictionary?",
    "What is the purpose of the 'len()' function in Python?",
    "What is slicing in Python, and how does it work?",
    "How do you check the type of a variable in Python?",
    "What is the difference between a 'set' and a 'frozenset' in Python?",
    "How do you create a class in Python?",
    "What are class methods and static methods in Python?",
    "How do you concatenate two strings in Python?",
    "What is the use of the 'dir()' function?",
    "Explain how to sort a list in Python.",
    "What does the 'zip()' function do in Python?",
    "What are the differences between 'remove()', 'pop()', and 'del' for lists?",
    "How do you open and read a file in Python?",
    "How do you write data to a file in Python?",
    "What is the difference between 'read()' and 'readlines()' in file handling?",
    "How do you merge two dictionaries in Python?",
    "What is the purpose of 'None' in Python?",
    "What is the difference between 'return' and 'print' in Python?",
    "How do you implement inheritance in Python?",
    "What is a Python 'set' and how is it different from a list?",
    "How do you check if a key exists in a dictionary?",
    "What is the purpose of the '__init__' method in Python classes?",
    "How do you create and use a package in Python?",
    "What is the purpose of the 'enumerate()' function?",
    "How do you implement a while loop in Python?",
    "What is a Python docstring and how do you use it?",
    "What is a pointer in C, and how do you declare one?",
    "How do you dynamically allocate memory in C?",
    "What is the difference between 'malloc' and 'calloc'?",
    "What does the 'sizeof' operator do in C?",
    "How do you create and use a structure in C?",
    "What is a union in C, and how does it differ from a structure?",
    "What is a function pointer in C?",
    "What is the purpose of the 'return' statement in a function?",
    "Explain how a 'for' loop works in C.",
    "What is the difference between 'break' and 'continue' in C?",
    "What is the purpose of the 'typedef' keyword?",
    "How do you declare a constant in C?",
    "What are the differences between '==', '=', and '===' in C?",
    "What is the use of the 'static' keyword in C?",
    "How do you handle file operations in C?",
    "What is a preprocessor directive in C?",
    "What are header files, and how do you include them in C?",
    "How do you pass an array to a function in C?",
    "What is the purpose of the 'main' function in C?",
    "What is the difference between '++i' and 'i++' in C?",
    "How do you define a function in C?",
    "What are the differences between 'call by value' and 'call by reference' in C?",
    "What is an infinite loop in C, and how can you create one?",
    "What are the differences between a stack and a heap?",
    "How do you swap two variables using pointers in C?",
    "What is the 'void' keyword in C?",
    "Explain the concept of 'recursion' in C.",
    "What is the purpose of 'if', 'else if', and 'else' statements in C?",
    "How do you declare a 2D array in C?",
    "What is a null pointer in C, and how is it used?",
    "What is the purpose of the 'extern' keyword in C?",
    "What is the difference between 'struct' and 'typedef struct' in C?",
    "How do you compare two strings in C?",
    "What does the 'volatile' keyword mean in C?",
    "What is the difference between 'printf' and 'scanf'?",
    "How do you free dynamically allocated memory in C?",
    "What is the purpose of 'fopen' and 'fclose' in C?",
    "What is the purpose of the 'do-while' loop in C?",
    "What is the scope of a variable in C?",
    "How do you declare and initialize a pointer to an array in C?",
    "What is the difference between 'int' and 'unsigned int' in C?",
    "What are bitwise operators, and how are they used in C?",
    "How do you declare and use an enum in C?",
    "What is pointer arithmetic, and how does it work?",
    "How do you pass a pointer to a function in C?",
    "What is the purpose of the 'goto' statement, and why should it be avoided?",
    "What is a segmentation fault, and how can you avoid it?",
    "How do you define a macro in C?",
    "What are storage classes in C, and what are the different types?",
    "How do you implement conditional compilation in C?"
  ];

  // Get a random index for the question
  let randomIndex = Math.floor(Math.random() * questions.length);

  // Construct the question prompt
  const prompt = `Question: ${questions[randomIndex]} \nGenerate 4 possible answers with one correct answer, and return in the following JSON format:
  {
    "question": "${questions[randomIndex]}",
    "options": [
      "1. ",
      "2. ",
      "3. ",
      "4. "
    ],
    "answer": ""
  }`;

  try {
    // Assuming model.generateContent is an AI API interaction
    const result = await model.generateContent(prompt);

    // Handle the response text (once)
    const responseText = await result.response.text();

    // Extract the JSON part from the response (assuming the response follows the format)
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    const jsonResponse = responseText.slice(jsonStart, jsonEnd);

    // Parse the extracted JSON
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
      message.channel.send(`Quiz Time! 🎉\n\n${quiz.question}\n\n${quiz.options.join("\n\n")}\n\nType the number of the correct answer.`);
    
      const filter = (response) => {
        return !response.author.bot && response.channel.id === quizChannelId;
      };

      const collector = message.channel.createMessageCollector({ filter, time: 30000 }); // 30 seconds to answer

      collector.on('collect', (response) => {
        const validResponses = ['1', '2', '3', '4'];
      
        // Only proceed if the response is 1, 2, 3, or 4
        if (validResponses.includes(response.content)) {
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
            const username = response.author.username;
            leaderboard[username] -= 1; // Decrement points
            saveLeaderboard(); // Save the updated leaderboard
      
            message.channel.send("❌ Incorrect. Try again!");
          }
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
    
    const prompt = "If the query is related to programming or anything related to it, answer it comprehensively. Otherwise, respond with a polite and informative message that keeps the conversation focused on discord server topics.\n\n**Prompt:** " + message.content + "in 700 Characters";

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
    const userPoints = leaderboard[username] || 0; // Handle cases where the user isn't in the leaderboard

    if (userPoints >= selectedItem.price) {
      leaderboard[username] -= selectedItem.price; // Deduct the item price from user's points
      saveLeaderboard(); // Save the updated leaderboard

      if (selectedItem.roleId) {
        const guild = interaction.guild;
        const member = guild.members.cache.get(interaction.user.id);
        const role = guild.roles.cache.get(selectedItem.roleId);
       interaction.reply(`✅ You have purchased **${selectedItem.label}** for ${selectedItem.price} points. You have been assigned the role **${role.name}**. Your new balance is ${leaderboard[username]} points.`);
        if (role && member) {
          try {
            await member.roles.add(role); // Assign the role to the user
           
          } catch (error) {
            console.error(`Error assigning role: ${error}`);
            await interaction.reply("❌ There was an error assigning the role. Please contact an administrator.");
          }
        } else {
          await interaction.reply("❌ There was an error finding the member or role. Please contact an administrator.");
        }
      } else {
        await interaction.reply(`✅ You have purchased **${selectedItem.label}** for ${selectedItem.price} points. Your new balance is ${leaderboard[username]} points. Contact @Geoguyz for redumption`);
      }
    } else {
      const pointsNeeded = selectedItem.price - userPoints;
      await interaction.reply(`❌ You don't have enough points to purchase **${selectedItem.label}**. You need ${pointsNeeded} more points.`);
    }
  }
});




client.login(process.env.TOKEN);
