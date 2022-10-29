const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("preskoci")
        .setDescription("Prebacuje na sljedeću pjesmu na popisu."),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")

        const currentSong = queue.current

        queue.skip(true)
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`${currentSong.title} je preskočena.`)
                .setThumbnail(currentSong.thumbnail)
            ]
        })
    }

}