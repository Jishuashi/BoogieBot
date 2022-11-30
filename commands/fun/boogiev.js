const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const fs = require("fs");

module.exports = {
    name: 'boogiev',
    permissions: ['Viewchannel'],
    category: 'fun',
    description: 'Je suis Boogie!',
    usage: "!boogiev",
    once: true,
    runInteraction: (client, interaction) => {
        const voiceChannel = interaction.options.getChannel('🤬 Le Coin 🤬');

        const voiceActual = interaction.member.voice.channel
        
        if(voiceActual == null){
            interaction.reply("Vous n'êtes pas dans un channel vocal");
        }

        const connection = joinVoiceChannel({
	        channelId: voiceActual.id,
	        guildId: interaction.guildId,
	        adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        
        connection;

        testParsed = JSON.parse(fs.readFileSync("/home/hchartier/BoogieBot/test.json"));

        const player = createAudioPlayer();

        const resource = createAudioResource('/home/hchartier/BoogieBot/audio/boogie.mp3');
        player.play(resource);   


        const subscription = connection.subscribe(player);

        testParsed = voiceActual
    
        // subscription could be undefined if the connection is destroyed!
        if (subscription) {
	        // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
	        setTimeout(() => subscription.unsubscribe(), 5_000);
        }
        
        setTimeout(() => connection.destroy(), 1_550);

        data = JSON.stringify(testParsed);
        fs.writeFileSync("/home/hchartier/BoogieBot/test.json", data);

        interaction.reply("Succes");
    },

}
