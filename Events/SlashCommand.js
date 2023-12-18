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

// ==================================================

module.exports = {

  name: "Slash Commands",
  description: "",
  Status: true,

  Execute(client) {

    client.on('interactionCreate', (interaction) => {

      if (!interaction.isChatInputCommand()) return;

      let command = ""

      if (client.NormalCommands.get(interaction.commandName)) {
        command = client.NormalCommands.get(interaction.commandName)
      }

      if (!command) {

        return interaction.reply({
          content: "This Command is Outdated.",
          ephemeral: true
        })

      }

      try {
        command.Execute(client, interaction)
      } catch (error) {
        console.log(command.data.name);
        console.log(error);
      }

    })

  }

}