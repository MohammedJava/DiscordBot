const Discord = require("discord.js");
const client = new Discord.Client();
//const inactiveThreshold = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
const inactiveThreshold = 1 * 60 * 1000; // 1 minutes in milliseconds

// Object to track last message timestamp for each user
let lastMessageTimestamps = new Map();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(checkInactivity, 12 * 60 * 60 * 1000); // Check every 12 hours
});

client.on("message", (message) => {
  if (!message.author.bot) {
    lastMessageTimestamps.set(message.author.id, Date.now());
  }
});

function checkInactivity() {
  const currentTime = Date.now();
  lastMessageTimestamps.forEach((timestamp, userId) => {
    if (currentTime - timestamp > inactiveThreshold) {
      const user = client.users.cache.get(userId);
      const message = `Hey ${user}, you've been inactive for more than 3 days!`;
      // Send message to user or a channel
      // For example: user.send(message).catch(console.error);
    }
  });
}

client.login(token);
