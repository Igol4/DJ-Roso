const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, RESTJSONErrorCodes } = require("discord.js")
const {promises: fsPromises} = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pomoc")
        .setDescription("Prikazuje redoslijed puštanja pjesama."),
      
    run: async ({client, interaction}) => {

       await interaction.editReply(`print `)
    }
}