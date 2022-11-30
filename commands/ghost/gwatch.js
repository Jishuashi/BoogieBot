const { time, log } = require("console");
const { EmbedBuilder, MessageButton, MessageActionRow, AttachmentBuilder } = require("discord.js");
const fs = require("fs");
const separator = "------------------------------\n";

module.exports = {
    name: 'gwatch',
    permissions: ['ViewChannel'],
    category: 'ghost',
    description: 'Commande lier à Ghost Watcher',
    usage: "/gwatch",
    once: true,
    options : [{
        name: "game",
        description: "Crée une game Ghost Watcher",
        type: 1,
        options: [{
            name: "action",
            description: "Tapez l'index du journal que vous voulez consulter",
            type: 3,
            required: true,
            choices: [{ name: "create", value: "create" }, { name: "remove", value: "remove" }]
        },
        {
            name: "code",
            description: "Tapez le code de la game",
            type: 3,
            required: false,
        }]
    },
    {
        name: "random-map",
        description: "Donne une map et une difficulté aléatoire",
        type: 1,
    }],
    runInteraction: (client, interaction) => {
        const subCommand = interaction.options.getSubcommand();
        
        if (subCommand == "game") {
            const args = interaction.options.getString("action");
            const code = interaction.options.getString("code");

            gameParsed = JSON.parse(fs.readFileSync("./gameW.json"));


            if (args == "create") {
                objectGame = { code: code, id: gameParsed.id, player: 1 };
                gameParsed.id += 1;

                data = JSON.stringify(gameParsed);
                fs.writeFileSync("./game.json", data);

                const embed = new EmbedBuilder()
                    .setTitle(`Game Ghost Watcher ${objectGame.id}`)
                    .addFields({ name: "Info de la game \n" + separator, value: `Code de la Game --> ${objectGame.code}` }
                    );

                interaction.reply({ embeds: [embed] });
            }
        }
        else if (subCommand == "random-map") {
            mapParsed = JSON.parse(fs.readFileSync("./mapG.json"));

            randomM = Math.random();
            randomD = Math.random();
            randomM = Math.floor(randomM * mapParsed.map.length);
            randomD = Math.floor(randomD * mapParsed.dif.length);

            const embed = new EmbedBuilder().setTitle("Random Map")
                .addFields(
                    { name: "-----------------\n", value: `La map -->   ${mapParsed.map[randomM]}` },
                    { name: "-----------------\n", value: `La Difficulté  -->   ${mapParsed.dif[randomD]}` }
                );

            interaction.reply({ embeds: [embed] });
        }
        else{
            interaction.reply("Ceci n'est pas une Subcommand")
        }
    },

}