const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mesaj")
        .setDescription("Mijenja redoslijed popisa."),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")

        queue.shuffle()
        await interaction.editReply(`Popis je promiješan.`)
    }

}