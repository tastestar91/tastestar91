const TelegramBot = require("node-telegram-bot-api");

const botToken = "5884819065:AAG7rl6TVlFX9J3ZCbEiEuzcKJBxpvK1vhY";
const bot = new TelegramBot(botToken);

const chatId = 5257584599; // Replace with the chat ID of the recipient

function send_bot(message) {
  bot
    .sendMessage(chatId, message)
    .then(() => {
      console.log("Message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

module.exports = {
  send_bot: send_bot,
};
