const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js')
const { REST, Routes } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const fs = require('fs')
const path = require('path')
const Table = require('cli-table');

const { SetColor } = require('./Module/Colors')
const Config = require('./Config.json');
const { log } = require('console');

// =============================================================

function Bot(ClientConfig) {

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions
        ]
    });

    client.Config = ClientConfig
    client.NormalCommands = new Collection();

    // =============              =============
    //              ==============
    //                  Test
    //              ==============
    // =============              =============

    client.on('interactionCreate', (interaction) => {

        const Guild = client.guilds.cache.get(interaction.guildId)
        const member = Guild.members.cache.get(interaction.member.user.id);
        const VoiceChannelId = member.voice.channelId;

        const VoiceChannel = client.channels.cache.get(VoiceChannelId)
        const connection = joinVoiceChannel({
            channelId: VoiceChannelId,
            guildId: VoiceChannel.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

    })

    // =============              =============
    //              ==============
    //               EventHandler
    //              ==============
    // =============              =============

    const EvnetFiles = fs.readdirSync(path.join('./Events')).filter(file => file.endsWith('.js'))
    const EventsStat = []

    for (const EventFile of EvnetFiles) {

        const Event = require(`./Events/${EventFile}`)

        if (!Event.name) return
        if (Event.Status === false || Event.Status !== true) return

        Event.Execute(client)

        EventsStat.push({
            Path: EventFile,
            Name: Event.name,
            Description: Event.description,
        })

    }

    console.log("");
    console.log(SetColor(`&(0)&(Be) Total : ${EvnetFiles.length} &(r)`));
    console.log(SetColor(`&(0)&(Be) Active Events &(r)`));
    console.table(EventsStat);

    // =============              =============
    //              ==============
    //              CommandHandler
    //              ==============
    // =============              =============

    const CommandsFiles = fs.readdirSync(path.join('./Commands')).filter(file => file.endsWith('.js'))
    const CommandsStat = []

    for (const CommandFile of CommandsFiles) {

        const Command = require(`./Commands/${CommandFile}`)

        if (!Command.name) return
        if (!Command.data) return
        if (!Command.data.name) return
        if (Command.Status === false || Command.Status !== true) return

        client.NormalCommands.set(Command.data.name, Command);

        CommandsStat.push({
            Path: CommandFile,
            Name: Command.name,
            Description: Command.description,
        })

    }

    console.log("");
    console.log(SetColor(`&(0)&(Bb) Total : ${CommandsFiles.length} &(r)`));
    console.log(SetColor(`&(0)&(Bb) Active (/) Commands &(r)`));
    console.table(CommandsStat);

    // =============              =============
    //              ==============
    //                  RunBot
    //              ==============
    // =============              =============

    const NormalCommands = client.NormalCommands.map(Command => Command.data)
    const Rest = new REST({ version: '10' }).setToken(ClientConfig.Token);

    (async () => {
        try {

            console.log("");
            console.log('============================================');
            // console.log('Started Refreshing application (/) commands.');

            await Rest.put(Routes.applicationCommands(ClientConfig.ClientID), { body: NormalCommands });
            client.login(ClientConfig.Token);

        } catch (error) {
            console.error(error);
        }
    })();

}

// =========================================

Bot(Config.PelatOff)