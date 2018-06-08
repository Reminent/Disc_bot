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
        return;
    }

    if (message === "!loot") {
        var members = bot.servers[channelID].members;
        var members_filtered = [];
        var members_in_same_channel = [];
        var voice_channel = members[userID].voice_channel_id;

        //get all users in server
        for( var mem in members) {
            members_filtered.push(members[mem]);
        };

        //filter to only keep users in the same voice channel as the
        //sender of "random"
        for (var i = 0; i < members_filtered.length; i++ ) {
            if(members_filtered[i].voice_channel_id === voice_channel) {
                members_in_same_channel.push(members_filtered[i]);
            };
        };

        //get a random number for how many users there are in the channel and
        //send it to the channel
        var rand = Math.floor((Math.random() * members_in_same_channel.length));
        var rand_user = members_in_same_channel[rand].id;
        var result = "Winner is: " + bot.users[rand_user].username;
        bot.sendMessage({
            to: channelID,
            message: result
        });
    }

    if (message === "!trash") {
        var members = bot.servers[channelID].members;
        var members_arr = [];
        var roles = bot.servers[channelID].roles;
        var roles_arr = [];
        var access_role_nr = "";
        var admin_role_nr = "";
        var kicked_members = [];
        var callback = (err)=>{
            bot.sendMessage({
                to: channelID,
                message: err.
            });
        };

        //Find ID for role Lord of Ashes, only those with this role may kick members
        for(var role in roles) {
            if (bot.servers[channelID].roles[role].name === 'Lord of Ashes') {
                admin_role_nr = bot.servers[channelID].roles[role].id;
            }
        }
        console.log(bot.servers[channelID].members[userID].roles);
        console.log(admin_role_nr);
        //Check if user sending command has Lord of Ashes role
        if (!bot.servers[channelID].members[userID].roles.includes(admin_role_nr)) {
            bot.sendMessage({
                to: channelID,
                message: "You dont have permission to kick the trash out... you trash"
            });
            return;
        }

        //Find ID for role Access, everyone without this roll gets kicked
        for(var role in roles) {
            if (bot.servers[channelID].roles[role].name === 'Access') {
                access_role_nr = bot.servers[channelID].roles[role].id;
            }
        }

        //Go through all members and check if they have the Access role, save those without to list
        for(var member in members) {
            if (!bot.servers[channelID].members[member].roles.includes(access_role_nr)) {
                kicked_members.push(member);
            }
        }

        //Go through list of members without Access and kick them, send names of kicked members to channel
        for(var i = 0; i < kicked_members.length; i++) {
            var kick_id = kicked_members[i];
            //bot.kick( { serverID: channelID, userID: kick_id }, callback);
            bot.sendMessage({
                to: channelID,
                message: "kicked user: " + bot.users[kicked_members[i]].username
            });
        }
    }

    if (message === "!djkrimson") {
        var twitch = "https://www.twitch.tv/djkrimson";
        var youtube = "https://www.youtube.com/user/estlandftw";

        bot.sendMessage({
            to: channelID,
            message: twitch
        });

        bot.sendMessage({
            to: channelID,
            message: youtube
        });
    }

    if (message === "!reminent") {
        var twitch = "https://www.twitch.tv/reminent";
        var youtube = "https://www.youtube.com/channel/UC0iywxaNljO_nP3YZOUDCcw/featured";

        bot.sendMessage({
            to: channelID,
            message: twitch
        });

        bot.sendMessage({
            to: channelID,
            message: youtube
        });
    }

    if (message === "!kungjohn") {
        var twitch = "https://www.twitch.tv/mardena";
        var youtube = "";

        bot.sendMessage({
            to: channelID,
            message: twitch
        });

        bot.sendMessage({
            to: channelID,
            message: youtube
        });
    }

    if (message === "!henkolicious") {
        var twitch = "https://www.twitch.tv/henkolicious";
        var youtube = "https://www.youtube.com/user/henkolicious";

        bot.sendMessage({
            to: channelID,
            message: twitch
        });

        bot.sendMessage({
            to: channelID,
            message: youtube
        });
    }

    if (message === "!commands") {
        var commands = "To get user twitch/youtube: \n !reminent \n !djkrimson \n !kungjohn \n !henkolicious \n \n To remove unwanted people: \n !trash \n \n To randomize loot: \n !loot"

        bot.sendMessage({
            to: channelID,
            message: commands
        });
    }
});

bot.on('presence', function(user, userID, status, game, event) {
    console.log("presence");
    // Skickar event när en användare ändrar status (typ AFK, online osv) men inte
    // när dom går in/ut i kanaler
    // console.log(user);
    // console.log(userID);
    // console.log(status);
    // console.log(game);
    // console.log(event);
});
