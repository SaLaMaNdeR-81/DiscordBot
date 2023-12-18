const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {

    name: "Avatar",
    description: "",
    Status: true,

    // ========================================

    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Display Your Avatar Or Someone else Avatar.")

        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The User to get Avatar for.")
                .setRequired(false)
        )

        .toJSON()
    ,

    // ========================================

    async Execute(client, interaction) {

        let User_target = "";

        try {
            User_target = interaction.options.get("user").user
        } catch {
            User_target = interaction.user
        }

        const user_avatar = User_target.displayAvatarURL({ size: 1024, dynamic: true });
        const user_tag = User_target.tag;
        const Embed = new EmbedBuilder()
            .setDescription(`[**Avatar Link.**](${user_avatar})`)
            .setAuthor({ name: user_tag, iconURL: user_avatar })
            .setImage(user_avatar)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setTimestamp(Date.now());

        interaction.reply({
            embeds: [Embed],
            ephemeral: false
        })


    }

};