const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const commandFolder = readdirSync('./commands');
const prefix = '!';

module.exports = {
    name: 'help',
    permissions: ['ViewChannel'],
    description: 'renvoie l\'aide ',
    category: 'admin',
    usage: "/help <command>",
    once: true,
    options: [{
        name: "command",
        description: 'Tapez le nom de votre commande',
        type: 3,
        required: false
    }],
    runInteraction: (client, interaction) => {
        const cmdName = interaction.options.getString('command');

        if (!cmdName) {
            const noArgsEmbed = new EmbedBuilder()
                .setColor("#230DA9")
                .addFields({ name: 'Listes des commandes', value: `Une liste de toute les catégorie disponnible et leurs commande.\npour plus d'information tapez \n \`${prefix}help <command>\`` })


            for (const category of commandFolder) {
                noArgsEmbed.addFields({ name: `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`, value: `\`${client.commands.filter(cmd => cmd.category.toLowerCase() == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\`` })
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
        }

        cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({ content: "Cette commande n'existe pas", ephemeral: true });

        const argsEmbed = new EmbedBuilder()
            .setColor("#230DA9")
            .setTitle(`\`${cmd.name}\``)
            .setDescription(`${cmd.description}`)
            .setFooter(`Usage --> ${cmd.usage}`);



        return interaction.reply({ embeds: [argsEmbed], ephemeral: true });

    }
}