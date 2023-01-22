const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("igraj")
        .setDescription("Pušta pjesmu.")
        .addStringOption((option) => option.setName("url").setDescription("link pjesme").setRequired(true))
        /*.addSubcommand((subcommand) =>
            subcommand.setName("pjesma")
            .setDescription("Pušta pjesmu s linka")
            .addStringOption((option) => option.setName("url").setDescription("link pjesme").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("playlista")
                .setDescription("Pušta playlistu")
                .addStringOption((option) => option.setName("url").setDescription("link playliste").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("pretraživanje"). setDescription("Pretražuje pjesme prema unosu.")
                .addStringOption((option) => option.setName("riječi").setDescription("riječi iz unosa").setRequired(true))
        )*/,
        run: async ({client, interaction}) => {
            let url = interaction.options.getString("url")
            if (!interaction.member.voice.channel) return interaction.editReply(`Netko je htio pustiti - ** ${url}**\nNe zajebavaj neg uđi u chat.`)
            
            const queue = await client.player.createQueue(interaction.guild)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
            
            let embed = new EmbedBuilder() //MessageEmbed,vx < v14, EmbedBuilder, vx >= v14

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEmfine: QueryType.AUTO //YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Niš od tvoje pjesme, nema je.")
            const pjesma = result.tracks[0]
            await queue.addTrack(pjesma)
            //console.log(queue)
            //console.log(`Pjesma broj 1 je ${queue.tracks[0]}`)
            embed
                .setDescription(`**[${pjesma.title}](${pjesma.url})** je dodana u red`)
                .setThumbnail(pjesma.thumbnail)
                .setFooter({ text: `Trajanje: ${pjesma.duration}`})
            /*if (interaction.options.getSubcommand() === "pjesma"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEmfine: QueryType.AUTO //YOUTUBE_VIDEO
                })
                if (result.tracks.length === 0)
                    return interaction.editReply("Ništa od pjesme")
                const pjesma = result.tracks[0]
                await queue.addTrack(pjesma)
                embed
                    .setDescription(`**[${pjesma.title}](${pjesma.url})** je dodana u red`)
                    .setThumbnail(pjesma.thumbnail)
                    .setFooter({ text: `Trajanje: ${pjesma.duration}`})
            } 
            else if (interaction.options.getSubcommand() === "playlista"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEmfine: QueryType.AUTO //YOUTUBE_PLAYLIST
                })
                if (result.tracks.length === 0)
                    return interaction.editReply("Ništa od playliste")
                const playlista = result.playlista
                await queue.addTracks(result.tracks)
                embed
                    .setDescription(`**${result.tracks.length} pjesama s playliste [${playlista.title}](${playlista.url})** je dodano u red`)
                    .setThumbnail(playlista.thumbnail)
            }
            else if (interaction.options.getSubcommand() === "pretraživanje"){
                let url = interaction.options.getString("pretraživanje")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEmfine: QueryType.AUTO
                })
                if (result.tracks.length === 0)
                    return interaction.editReply("Ništa od playliste")
                const pjesma = result.tracks[0]
                await queue.addTrack(pjesma)
                embed
                    .setDescription(`**[${pjesma.title}](${pjesma.url})** je dodana u red`)
                    .setThumbnail(pjesma.thumbnail)
                    .setFooter({ text: `Trajanje: ${pjesma.duration}`})
            }*/
            if (!queue.playing) await queue.play() //mozda nije unutar prave zagrade
            await interaction.editReply({
                embeds: [embed]
            })
            }
}