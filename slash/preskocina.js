const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("preskocina")
        .setDescription("Prebacuje na zadanu pjesmu na popisu.")
        .addNumberOption((option) =>
            option.setName("broj").setDescription("Pjesma na koju želiš prebaciti.").setMinValue(1).setRequired(true)),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")

        const trackNum = interaction.options.getNumber("broj")
        if(trackNum > queue.tracks.length) return await interaction.editReply(`Fulao/la si broj, pjesma pod brojem ${trackNum} ne postoji.`)
        
        queue.skipTo(trackNum -  1)
        await interaction.editReply(`Prebačeno na pjesmu pod brojem ${trackNum}.`)
    }

}