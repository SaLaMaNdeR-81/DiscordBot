const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { REST, Routes } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    name: "Test",
    description: "",
    Status: true,

    // ========================================

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Music Player.")

        .toJSON()
    ,

    // ========================================

    async Execute(client, interaction) {

        const Guild = client.guilds.cache.get(interaction.guildId)
        const member = Guild.members.cache.get(interaction.member.user.id);
        const VoiceChannelId = member.voice.channelId;

        const VoiceChannel = client.channels.cache.get(VoiceChannelId)
        const connection = joinVoiceChannel({
            channelId: VoiceChannelId,
            guildId: VoiceChannel.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        await interaction.deferReply();
        await wait(2000);
        await interaction.editReply({
            content: `<#${VoiceChannel}>`,
            ephemeral: true
        })

    }

};