const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("igraj")
        .setDescription("Pušta pjesmu.")
        .addStringOption((option) => option.setName("url").setDescription("link pjesme").setRequired(true)),
        run: async ({client, interaction}) => {
            let url = interaction.options.getString("url")
            if (!interaction.member.voice.channel) return interaction.editReply(`Netko je htio pustiti - ** ${url}**\nNe zajebavaj neg uđi u chat.`)
            
            const queue = await client.player.createQueue(interaction.guild)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
            
            let embed = new EmbedBuilder() //MessageEmbed,vx < v14, EmbedBuilder, vx >= v14

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEmfine: QueryType.AUTO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Niš od tvoje pjesme, nema je.")
            const pjesma = result.tracks[0]
            await queue.addTrack(pjesma)
            embed
                .setDescription(`**[${pjesma.title}](${pjesma.url})** je dodana u red`)
                .setThumbnail(pjesma.thumbnail)
                .setFooter({ text: `Trajanje: ${pjesma.duration}`})
            if (!queue.playing) await queue.play()
            await interaction.editReply({
                embeds: [embed]
            })
            }
}
