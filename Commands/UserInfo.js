const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { inlineCode, codeBlock } = require('discord.js');

module.exports = {

    name: "User Info",
    description: "",
    Status: true,

    // ========================================

    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Get user Information.")

        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The Member to get Information from.")
                .setRequired(false)
        )

        .toJSON()
    ,

    // ========================================

    async Execute(clientt, interaction) {

        let target = ""
        let member = ""
        try {
            target = interaction.options.get("user").user
            member = interaction.options.get("user").member
        } catch {
            target = interaction.user
            member = interaction.member
        }

        const cl = {
            name: interaction.client.user.username,
            avatar: interaction.client.user.avatarURL(),
        }
        const user = {

            id: target.id,
            Avatar: target.avatarURL(),
            username: target.username,
            tag: target.tag,
            Creation: Math.round(target.createdTimestamp / 1000)

        }

        // ===========

        let member_jtm = 'null'
        let gm = {
            jointime: 'null',
            nickname: 'null',
        }

        if (!member) {
            member_jtm = `Can't find User in guild.`
        } else {
            gm.jointime = Math.round(member.joinedTimestamp / 1000)
            member_jtm = `<t:${gm.jointime}:d><t:${gm.jointime}:t> **|** <t:${gm.jointime}:R>`

            if (!member.nickname) {
                gm.nickname = "Null"
            } else {
                gm.nickname = member.nickname || ""
            }

        }


        // ======================

        const userinfo_embed = new EmbedBuilder()
            .setAuthor({
                name: user.tag,
                url: user.Avatar
            })
            .setTitle("👤 | User information")
            .setDescription(`<@${user.id}>`)
            .setThumbnail(user.Avatar)
            .addFields(
                { name: `🆔 :`, value: codeBlock('js', user.id), inline: true },
                { name: `📌Nickname :`, value: codeBlock("js", gm.nickname), inline: true },
                { name: `📅 | Creation Time :`, value: `<t:${user.Creation}:d><t:${user.Creation}:t> **|** <t:${user.Creation}:R>` },
                { name: `📅 | Join Server :`, value: member_jtm },
            )
            .setTimestamp(Date.now())
            .setFooter({
                text: user.tag,
                iconURL: user.Avatar
            });

        // ======================

        interaction.reply({
            embeds: [userinfo_embed],
            ephemeral: false
        })

    }

};