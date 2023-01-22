const { Client, GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9")
const fs = require("fs");
const { Player } = require("discord-player");
const { endianness } = require("os");
const { ClientRequest } = require("http");


dotenv.config();
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load";

const CLIENT_ID = "1021783712691671142"
const GUILD_ID = "899754771773268011" //899754771773268011 - glv   878012943034380299-gaming arena

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashfiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashfiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH){
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Success")
        process.exit(0)
    .catch((err) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
    })
    })
}

else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return
            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Fulao si zivot")

            await interaction.deferReply()
            await slashcmd.run({client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}

//https://youtu.be/fN29HIaoHLU?t=2464
//41:04