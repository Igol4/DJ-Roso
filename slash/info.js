const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Prikazuje informacije o pjesmi koja trenutno igra."),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current

        await interaction.editReply({
            embeds: [new EmbedBuilder()
            .setThumbnail(song.thumbnail)
            .setDescription(`Trenutno igra [${song.title}](${song.url})\n\n` + bar)
        ],
        })
    }

}