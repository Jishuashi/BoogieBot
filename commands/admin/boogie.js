module.exports = {
    name: 'booseul',
    permissions: ['ViewChannel'],
    category: 'fun',
    description: 'D',
    usage: "!booseul",
    once: true,
    run: (client, message, args) => {
        message.channel.send("Je suis booseul!");
    },
    runInteraction: (client, interaction) => {
        interaction.reply('Je suis booseul!');
    },

}