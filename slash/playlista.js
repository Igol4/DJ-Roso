const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlista")
        .setDescription("Dodaje playlistu.")
        .addStringOption((option) => option.setName("url").setDescription("link playliste").setRequired(true)),

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
                return interaction.editReply("Ništa od playliste")
            const playlista = result.playlist
            const prva_pjesma = result.tracks[0]
            await queue.addTracks(result.tracks)
            
            embed
                .setDescription(`**${result.tracks.length} pjesama s playliste [${playlista.title}](${playlista.url})** je dodano u red`)
                .setThumbnail(prva_pjesma.thumbnail)

            if (!queue.playing) await queue.play()
            await interaction.editReply({
                embeds: [embed]
            })
    }
}