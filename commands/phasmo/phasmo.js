const { time, log } = require("console");
const { EmbedBuilder, MessageButton, MessageActionRow, AttachmentBuilder, flatten } = require("discord.js");
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
    },
    {
        name: "random-map-custom",
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

            let map = interaction.options.getString("map");
            let exist = false;


            mapParsed = JSON.parse(fs.readFileSync("./map.json"));
            map = map.toLowerCase();

            const fileMap = new AttachmentBuilder(`./images/${map}.png`)

            embed.setTitle(`${map.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`);
            embed.setImage(`attachment://${map}.png`);

            interaction.reply({ embeds: [embed], files: [fileMap] });
        }
        else if (subCommand == "random-map") {
            mapParsed = JSON.parse(fs.readFileSync("./map.json"));

            randomM = Math.random();
            randomD = Math.random();
            randomM = Math.floor(randomM * mapParsed.maps.length);
            randomD = Math.floor(randomD * mapParsed.dif.length);

            const embed = new EmbedBuilder().setTitle("Random Map")
                .addFields(
                    { name: "-----------------\n", value: `La map -->   ${mapParsed.maps[randomM]}` },
                    { name: "-----------------\n", value: `La Difficulté  -->   ${mapParsed.dif[randomD]}` }
                );

            interaction.reply({ embeds: [embed] });
        }
        else if (subCommand == "random-map-custom") {
            mapParsed = JSON.parse(fs.readFileSync("./mapCustom.json"));
            str = "",
            strG = "",
            strC = "",

            randomM = Math.random();
            randomM = Math.floor(randomM * mapParsed.maps.length);
            
            const embed = new EmbedBuilder().setTitle("Random Map")
                .addFields(
                    { name: "-----------------\n", value: `La map -->   ${mapParsed.maps[randomM]}` },
                    { name: "-----------------\n", value: `La Difficulté  -->   Custom` },
                );

                for(let i = 0; i < mapParsed["customP"].length; i++){
                    random = 0

                    if(mapParsed["customP"][i]["value"] == "num"){
                        maxVal = mapParsed["customP"][i]["max_val"],
                        random = Math.floor(Math.random() * maxVal)
                    }else if(mapParsed["customP"][i]["value"] == "float"){
                        listFloat = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0]

                        maxVal = mapParsed["customP"][i]["max_val"];
                        random = listFloat[Math.floor(Math.random() * maxVal)];
                    }else{
                        random = Math.floor(Math.random() * 3)
                        boolTest = true

                        if(random >= 2){
                            boolTest = false
                        }

                        random = boolTest
                    }
                    
                    str += `${mapParsed["customP"][i]["name"]} : ${random}\n`;

                }
                if(mapParsed["customP"].length != 0){
                    embed.addFields({name:`Custom Player Settings \n${separator}`, value: str})
                }


                for(let j = 0; j < mapParsed["customGhost"].length; j++){
                    random = 0

                    if(mapParsed["customGhost"][j]["value"] == "num"){
                        maxVal = mapParsed["customP"][j]["max_val"],
                        random = Math.floor(Math.random() * maxVal)
                    }else if(mapParsed["customGhost"][j]["value"] == "float"){
                        listFloat = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0]

                        maxVal = mapParsed["customGhost"][j]["max_val"];
                        random = listFloat[Math.floor(Math.random() * maxVal)];
                    }else{
                        random = Math.floor(Math.random() * 3)
                        boolTest = true

                        if(random >= 2){
                            boolTest = false
                        }

                        random = boolTest
                    }
                    
                    strG += `${mapParsed["customGhost"][j]["name"]} : ${random}\n`;

                }
                if(mapParsed["customGhost"].length != 0){
                    embed.addFields({name:`Custom Ghost Settings \n${separator}`, value: strG})
                }

                

                for(let m = 0; m < mapParsed["customContract"].length; m++){
                    random = 0

                    if(mapParsed["customContract"][m]["value"] == "num"){
                        maxVal = mapParsed["customContract"][m]["max_val"],
                        random = Math.floor(Math.random() * maxVal)
                    }else if(mapParsed["customContract"][m]["value"] == "float"){
                        listFloat = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0]

                        maxVal = mapParsed["customContract"][m]["max_val"];
                        random = listFloat[Math.floor(Math.random() * maxVal)];
                    }else{
                        random = Math.floor(Math.random() * 3)
                        boolTest = true

                        if(random >= 2){
                            boolTest = false
                        }

                        random = boolTest
                    }
                    
                    strC += `${mapParsed["customContract"][m]["name"]} : ${random}\n`;

                }
                if(mapParsed["customContract"].length != 0){
                    embed.addFields({name:`Custom Contract Settings \n${separator}`, value: strC})
                }


            interaction.reply({ embeds: [embed] });
        }
        else {
            interaction.reply("Ceci n'est pas une Subcommand")
        }

    },
}