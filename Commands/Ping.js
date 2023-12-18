const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    name: "Ping",
    description: "",
    Status: true,

    // ========================================

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("get Ping")
        .toJSON()
    ,

    // ========================================

    async Execute(client, interaction) {

        interaction.reply({
            content: `🏓Ping: ${Math.round(interaction.client.ws.ping)} ₘₛ`,
            ephemeral: true
        })

    }

};