module.exports = {
    name: 'boogie',
    permissions: ['ViewChannel'],
    category: 'fun',
    description: 'D',
    usage: "!boogie",
    once: true,
    run: (client, message, args) => {
        message.channel.send("Je suis boogie!");
    },
    runInteraction: (client, interaction) => {
        interaction.reply('Je suis boogie!');
    },

}