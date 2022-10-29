const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Zaustavlja muziku i briše popis."),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        const currentSong = queue.current

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")
        
        queue.destroy()
        await interaction.editReply(`Zika je zgasena.`)
    }

}