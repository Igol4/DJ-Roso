const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("red")
        .setDescription("Prikazuje redoslijed puštanja pjesama.")
        .addNumberOption((option) => option.setName("page").setDescription("Stranica popisa").setMinValue(1)),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interaction.editReply("Nema pjesama na popisu.")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.options.getNumber("page") || 1) - 1

        if (page+1 > totalPages) return await interaction.editReply(`Kriva stranica, postoji samo ${totalPages} stranica.`)

        const queueString = queue.tracks.slice(page*10, page*10+10).map((pjesma, i) => {
            return `**${page*10 + i + 1}.** \`[${pjesma.duration}]\` ${pjesma.title} -- <@${pjesma.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`**Trenutno igra**\n` +
                (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "Ništa") +
                `\n\n**Popis**\n${queueString}`
                )
                .setFooter({
                    text: `Stranica ${page+1} od ${totalPages}`
                })
                .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}