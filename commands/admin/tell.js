module.exports = {
    name: 'tell',
    permissions: ['Ban_members'],
    category: 'admin',
    description: 'Tell',
    usage: "!tell",
    once: true,
    options: [{
        name: "message",
        type: 3,
        description: "le message à délivrer"
        },
        {
            name: "id",
            type: 3,
            description: "ID du channel"
        }
    ],
    runInteraction: (client, interaction) => {
        const message = interaction.options.getString("message");
        const id = interaction.options.getString("id");

        console.log(message);

        client.channels.cache.get(id).send(message);
        interaction.reply('Sucess');
    },

}