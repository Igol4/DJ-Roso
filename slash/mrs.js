const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { DisTube } = require('distube');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mrs")
        .setDescription("Miče neželjenu pjesmu s popisa.")
        .addNumberOption((option) =>
            option.setName("broj").setDescription("Redni broj neželjene pjesme.").setMinValue(1).setRequired(true)),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Nema pjesama na popisu.")

        const trackNum = interaction.options.getNumber("broj")
        //const num = parseInt(trackNum)
        if(trackNum > queue.tracks.length) return await interaction.editReply(`Fulao/la si broj, pjesma pod brojem ${trackNum} ne postoji.`)
        
        const izbrisana_pjesma = queue.tracks[trackNum - 1].title;
        queue.tracks.pop(trackNum-1);
        await interaction.editReply(`Maknuta je ${izbrisana_pjesma}.`)
    }

}