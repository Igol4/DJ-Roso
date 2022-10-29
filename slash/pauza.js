const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pauza")
        .setDescription("Pauzira muziku."),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")

        queue.setPaused(true)
        await interaction.editReply("Muzika je pauzirana!")
    }

}