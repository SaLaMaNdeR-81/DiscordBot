const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const cl = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

// ======================

// const Config = require('../Config.json');

// ==================================================

module.exports = {

    name: "Activity",
    description: "Set Bot Activity",
    Status: true,

    async Execute(client) {

        client.on("ready", () => {

            const ActivityList = client.Config.Activitys
            let Counter = 0

            function SetActivity() {

                client.user.setActivity({ name: ActivityList[Counter], type: ActivityType.Watching })

                Counter++;
                if (Counter == ActivityList.length) Counter = 0

                setTimeout(SetActivity, 5000);


            }

            SetActivity()

        });

    }

}