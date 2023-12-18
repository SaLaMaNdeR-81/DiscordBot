const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {

    name: "Server",
    description: "",
    Status: true,

    // ========================================

    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Show Server information.")
        .toJSON()
    ,

    // ========================================

    async Execute(client, interaction) {

        const guild_id = interaction.guild.id;
        const get_guild = client.guilds.cache.get(guild_id);

        const cl = {
            name: interaction.client.user.username,
            avatar: interaction.client.user.avatarURL(),
        }

        const guild = {
            id: guild_id,
            name: get_guild.name,
            owner: get_guild.ownerId,
            Icon: get_guild.iconURL(),

            Roles: get_guild.roles.cache.size,
            Boosts: 0,

            Created: {
                date: get_guild.createdAt,
                timestamp: Math.round(get_guild.createdTimestamp / 1000)
            },

            Members: {
                all: get_guild.memberCount,
                Member: null,
                Bot: null,
            },

            Channels: {
                Category: get_guild.channels.cache.filter(chx => chx.type === 4).size,
                text: get_guild.channels.cache.filter(chx => chx.type === 0).size,
                voice: get_guild.channels.cache.filter(chx => chx.type === 2).size,
            }

        }

        // ========================

        const embed = new EmbedBuilder()
            // .setColor(0xe22065)
            .setAuthor({
                name: `${guild.name}`,
                iconURL: guild.Icon
            })
            .setTitle("**<:RainbowCup:1046262797727707156>| Server Stat**")
            .setThumbnail(guild.Icon)
            .addFields(
                { name: `🆔 :`, value: `**${guild.id}**`, inline: true },
                { name: `**🔰Owner :**`, value: `<@${guild.owner}>`, inline: true },
                { name: `\u200B `, value: `\u200B ` },
                { name: `**📅Created On **:`, value: `<t:${guild.Created.timestamp}:d><t:${guild.Created.timestamp}:t> **|** <t:${guild.Created.timestamp}:R>` },
                { name: `**🎴Members : ( ${guild.Members.all} **)`, value: `\u200B`, inline: true },
                { name: `**📜Roles : ( ${guild.Roles} )**`, value: `\u200B`, inline: true },
                { name: `**💬Channels :**`, value: `<:White_arrow:1046262527987830785> **Category : ${guild.Channels.Category} \n<:White_arrow:1046262527987830785> Text : ${guild.Channels.text} \n<:White_arrow:1046262527987830785> Voice : ${guild.Channels.voice} **` },
            )
            .setTimestamp(Date.now())
            .setFooter({
                text: cl.name,
                iconURL: cl.avatar,
            });


        // ========================

        interaction.reply({
            embeds: [embed],
            ephemeral: false
        })

    }

};