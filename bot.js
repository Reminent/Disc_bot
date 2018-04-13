var Discord = require('discord.io');
var auth = require('./auth.json');

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (user === bot.username) {
        console.log("returns");
        return;
    }
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "ping"
        });
    }
});
