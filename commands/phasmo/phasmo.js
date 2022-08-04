const { time, log } = require("console");
const { EmbedBuilder, MessageButton, MessageActionRow, AttachmentBuilder } = require("discord.js");
const fs = require("fs");
const separator = "------------------------------\n";

module.exports = {
    name: 'phasmo',
    permissions: ['ViewChannel'],
    category: 'phasmo',
    description: 'Prefix des commande phamo',
    usage: "!phasmo <commande>",
    once: true,
    options: [{
        name: "game",
        description: "Crée une game phasmo",
        type: "1",
        options: [{
            name: "action",
            description: "Tapez l'index du journal que vous voulez consulter",
            type: 3,
            required: true,
            choices: [{ name: "create", value: "create", }, { name: "remove", value: "remove" }]
        },
        {
            name: "code",
            description: "Tapez le code de la game",
            type: 3,
            required: false,
        }]
    },
    {
        name: "journal",
        description: "Donne la documentation du journal phasmo",
        type: "1",
        options:
            [{
                name: "fantome",
                description: 'Tapez le nom du fantome que vous voulez consulter',
                type: 3,
                required: true,
                choices: [{ name: "Myling", value: "myling" }, { name: "Esprit", value: "esprit" }, { name: "Onryo", value: "onryo" }, { name: "Yurei", value: "yurei" }, { name: "Cauchemar", value: "cauchemar" }, { name: "Yokai", value: "yokai" }, { name: "Djinn", value: "djinn" }, { name: "Revenant", value: "revenant" }, { name: "Les Jumeaux", value: "les_jumeaux" }, { name: "Démon", value: "démon" }, { name: "Le Mimic", value: "mimic" }, { name: "Obake", value: "obake" }, { name: "Raiju", value: "raiju" }, { name: "Goryo", value: "goryo" }, { name: "Hantu", value: "hantu" }, { name: "Banshee", value: "banshee" }, { name: "Oni", value: "oni" }, { name: "Poltergeist", value: "poltergeist" }, { name: "Fantôme", value: "fantom" }, { name: "Ombre", value: "ombre" }, { name: "Deogen", value: "deogen" }, { name: "Moroï", value: "moroï" }, { name: "Spectre", value: "spectre" }, { name: "Thayé", value: "thayé" },
                ]
            }
            ],
    },
    {
        name: "map",
        description: "Donne la map selectionner",
        type: "1",
        options: [{
            name: "map",
            description: 'Tapez le nom de la map que vous voulez consulter',
            required: true,
            type: 3,
            choices: [{ name: "Edgefield", value: "edgefield" }, { name: "Willow", value: "willow" }, { name: "Prison", value: "prison" }, { name: "Asile", value: "asile" }, { name: "Camping", value: "Camping" }, { name: "Grafton", value: "grafton" }, { name: "Bleasdale", value: "bleasdale" }, { name: "Ecole", value: "ecole" }, { name: "Tanglewood", value: "tanglewood" }
            ]
        }],
    },
    {
        name: "random-map",
        description: "Donne une map et une difficulté aléatoire",
        type: "1",
    }


    ],
    runInteraction: (client, interaction) => {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand == "game") {
            const args = interaction.options.getString("action");
            const code = interaction.options.getString("code");

            gameParsed = JSON.parse(fs.readFileSync("./game.json"));


            if (args == "create") {
                objectGame = { code: code, id: gameParsed.id, player: 1 };
                gameParsed.id += 1;

                data = JSON.stringify(gameParsed);
                fs.writeFileSync("./game.json", data);

                const embed = new EmbedBuilder()
                    .setTitle(`Game Phasmo ${objectGame.id}`)
                    .addFields({ name: "Info de la game \n" + separator, value: `Code de la Game --> ${objectGame.code}` }
                    );

                interaction.reply({ embeds: [embed] });
            }
        }
        else if (subCommand == "journal") {
            const fantome = interaction.options.getString("fantome");

            let journalJSON = fs.readFileSync("./journal.json");
            let journalParsed = JSON.parse(journalJSON);

            let strPreuves = "";
            let strTips = "";


            const embed = new EmbedBuilder()
                .setTitle(`${fantome.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())} :`);

            let fantomPage = journalParsed[`fantome`][`${fantome}`];

            embed.addFields({ name: `Description :${separator} `, value: fantomPage["description"] });
            embed.addFields({ name: `Force :${separator} : `, value: fantomPage["force"] });
            embed.addFields({ name: `Faiblesse :${separator}  `, value: fantomPage["faiblesse"] });

            for (let i = 0; i < fantomPage["preuves"].length; i++) {
                strPreuves += "- " + fantomPage["preuves"][i] + "\n";
            }

            embed.addFields({ name: `Preuves :${separator}`, value: strPreuves });

            if (fantomPage["tips"].length != 0) {
                strTips = "- " + fantomPage["tips"][0] + "\n";

                embed.addFields({ name: `Tips : ${separator}`, value: strTips })

                for (let j = 1; j < fantomPage["tips"].length; j++) {
                    strTips = "- " + fantomPage["tips"][j] + "\n";

                    embed.addFields({ name: `‎`, value: strTips })
                }
            }


            if (fantomPage["file"]) {
                const fileAudio = new AttachmentBuilder(`./audio/${fantome}.mp3`)

                embed.addFields({ name: `Audio ${separator}`, value: `Au dessus du Message` });
                interaction.reply({ files: [fileAudio], embeds: [embed] });

            }
            else {
                interaction.reply({ embeds: [embed] })
            }
        }
        else if (subCommand == "map") {
            const embed = new EmbedBuilder();

            const map = interaction.options.getString("map");


            switch (map.toLowerCase()) {

                case "asile":
                    const fileAsile = new AttachmentBuilder('./images/asile.png')

                    embed.setTitle("Asile");
                    embed.setImage("attachment://asile.png");

                    interaction.reply({ embeds: [embed], files: [fileAsile] });
                    break;
                case "bleasdale":
                    const fileBleas = new AttachmentBuilder('./images/bleasdale.png')

                    embed.setTitle("Bleasdale");
                    embed.setImage("attachment://bleasdale.png");

                    interaction.reply({ embeds: [embed], files: [fileBleas] });
                    break;
                case "grafton":
                    const fileGraft = new AttachmentBuilder('./images/grafton.png')

                    embed.setTitle("Grafton");
                    embed.setImage("attachment://grafton.png");

                    interaction.reply({ embeds: [embed], files: [fileGraft] });
                    break;
                case "prison":
                    const filePrison = new AttachmentBuilder('./images/prison.png')

                    embed.setTitle("Prison");
                    embed.setImage("attachment://prison.png");


                    interaction.reply({ embeds: [embed], files: [filePrison] });
                    break;
                case "ridgeview":
                    const fileRidge = new AttachmentBuilder('./images/ridgeview.png')

                    embed.setTitle("Ridgeview");
                    embed.setImage("attachment://ridgeview.png");

                    interaction.reply({ embeds: [embed], files: [fileRidge] });
                    break;
                case "edgefield":
                    const fileEdge = new AttachmentBuilder('./images/edgefield.png')

                    embed.setTitle("Edgefield");
                    embed.setImage("attachment://edgefield.png");

                    interaction.reply({ embeds: [embed], files: [fileEdge] });
                    break;
                case "tanglewood":
                    const fileTangle = new AttachmentBuilder('./images/tanglewood.png')

                    embed.setTitle("Tanglewood");
                    embed.setImage("attachment://tanglewood.png");

                    interaction.reply({ embeds: [embed], files: [fileTangle] });
                    break;
                case "camping":
                    const fileCamp = new AttachmentBuilder('./images/camping.png')

                    embed.setTitle("Camping");
                    embed.setImage("attachment://camping.png");

                    interaction.reply({ embeds: [embed], files: [fileCamp] });
                    break;

                case "ecole":
                    const fileEcole = new AttachmentBuilder('./images/ecole.png');

                    embed.setTitle("École");
                    embed.setImage("attachment://ecole.png");

                    interaction.reply({ embeds: [embed], files: [fileEcole] });

                    break;
                case "willow":
                    const fileWill = new AttachmentBuilder('./images/willow.png')

                    embed.setTitle("Willow");
                    embed.setImage("attachment://willow.png");

                    interaction.reply({ embeds: [embed], files: [fileWill] });
                    break;
                default:
                    embed.setTitle("ERROR");
                    embed.setImage("https://image.shutterstock.com/image-vector/eror-404-sign-cloud-computing-260nw-2109211787.jpg");

                    interaction.reply({ embeds: [embed] });
                    break;
            }
        }
        else if (subCommand == "random-map") {
            mapParsed = JSON.parse(fs.readFileSync("./map.json"));

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

    },
}