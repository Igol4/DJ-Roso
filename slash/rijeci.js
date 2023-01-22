const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")
const Genius = require("genius-lyrics")
const Client = new Genius.Client("JIGGxhCfMPEptFeRYYmsumjhoAQkdbmZLgz0J1iZHazIRQIJrYVO1uqnO3Dhat__");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rijeci")
        .setDescription("Ispisuje riječi pjesme.")
        .addStringOption((option) => option.setName("song_name").setDescription("Ime pjesme ili broj na popisu.")),


    run: async ({client, interaction}) => {

        const queue = client.player.getQueue(interaction.guildId)
        song_name = interaction.options.getString("song_name")


        if (typeof(song_name) !== "object" && Number.isInteger(Number(song_name))){
            try{
                queue_song = queue.tracks[song_name-1]
                title = queue_song.title
                results = await Client.songs.search(title)
                song = results[0]
                lyrics = await song.lyrics()

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription(`Tekst pjesme ${song.featuredTitle} - ${song.artist.name}: \n${lyrics}`
                        )
                        .setThumbnail(song.thumbnail)
                    ]
                })
        } catch{
            await interaction.editReply(`Ne postoji pjesma na popisu pod brojem ${song_name}.`)
        }     
        }
        else if (!Number.isInteger(Number(song_name))){ //string input
            try{
                results = await Client.songs.search(song_name)
                song = results[0]
                lyrics = await song.lyrics()

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription(`Tekst pjesme ${song.featuredTitle} - ${song.artist.name}: \n${lyrics}`
                        )
                        .setThumbnail(song.thumbnail)
                    ]
                })
            } catch{
                await interaction.editReply(`Ne mogu pronaći pjesmu pod nazivom ${song_name}.`)
            }
        }
        else if (typeof(song_name) === "object"){ //empty input
            if (queue){
                currentSong = queue.current
                title = currentSong.title
                results = await Client.songs.search(title)
                song = results[0]
                lyrics = await song.lyrics()

                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription(`Tekst pjesme ${song.featuredTitle} - ${song.artist.name}: \n${lyrics}`
                        )
                        .setThumbnail(song.thumbnail)
                    ]
                })
        } else{ await interaction.editReply("Nema pjesama na popisu.")  }
        }
    }
}