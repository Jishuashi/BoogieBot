module.exports = {
    name: 'sot',
    permissions: ['ViewChannel'],
    category: 'seaofthieves',
    description: 'Commande  lier à sea of thieves !',
    usage: "/sot",
    once: true,
    options:[],
    runInteraction: (client, interaction) => {
        interaction.reply('pong!');
    },

}