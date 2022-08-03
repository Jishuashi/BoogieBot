const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const fs = require("fs");
const separator = "\n-----------------------------------------"


module.exports = {
    name: 'journal',
    permissions: ['MENTION_EVERYONE'],
    category: 'game',
    description: 'Donne la documentation du journal phasmo',
    usage: "!journal",
    once: true,
    run: (client, message, args) => {
        let journalJSON = fs.readFileSync("./journal.json");
        let journalParsed = JSON.parse(journalJSON);


        if (args[0] == "fantome") {

            let strPreuves = "";
            let strTips = "";

            const embed = new MessageEmbed()
                .setTitle(`${args[1].replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`);

            let fantomPage = journalParsed[`${args[0]}`][`${args[1]}`];

            embed.addField(`Description ${separator}`, fantomPage["description"]);
            embed.addField(`Force ${separator}`, fantomPage["force"]);
            embed.addField(`Faiblesse ${separator}`, fantomPage["faiblesse"]);

            for (let i = 0; i < fantomPage["preuves"].length; i++) {
                strPreuves += "- " + fantomPage["preuves"][i] + "\n";
            }

            embed.addField(`Preuves ${separator}`, strPreuves);

            if (fantomPage["tips"].length != 0) {
                for (let j = 0; j < fantomPage["tips"].length; j++) {
                    strTips += "- " + fantomPage["tips"][j] + "\n";
                }
            }

            embed.addField(`Tips ${separator}`, strTips)

            message.channel.send({ embeds: [embed] })
        }
    },
    options:
        [{
            name: "fantome",
            description: 'Tapez le nom du fantome que vous voulez consulter',
            type: 3,
            required: true,
            choices: [
                { name: "Myling", value: "myling" },
                { name: "Spectre", value: "spectre" },
                { name: "Esprit", value: "esprit" },
                { name: "Onryo", value: "onryo" },
                { name: "Yurei", value: "yurei" },
                { name: "Cauchemar", value: "cauchemar" },
                { name: "Yokai", value: "yokai" },
                { name: "Djinn", value: "djinn" },
                { name: "Revenant", value: "revenant" },
                { name: "Les Jumeaux", value: "les_jumeaux" },
                { name: "Démon", value: "démon" },
                { name: "Le Mimic", value: "mimic" },
                { name: "Obake", value: "obake" },
                { name: "Raiju", value: "raiju" },
                { name: "Goryo", value: "goryo" },
                { name: "Hantu", value: "hantu" },
                { name: "Banshee", value: "banshee" },
                { name: "Oni", value: "oni" },
                { name: "Poltergeist", value: "poltergeist" },
                { name: "Fantôme", value: "fantom" },
                { name: "Ombre", value: "ombre" },
                { name: "Deogen", value: "deogen" },
                { name: "Moroï", value: "moroï" },
                { name: "Thayé", value: "thayé" },
            ]
        }
        ],
    runInteraction: (client, interaction) => {
        const fantome = interaction.options.getString("fantome");

        let journalJSON = fs.readFileSync("./journal.json");
        let journalParsed = JSON.parse(journalJSON);

        let strPreuves = "";
        let strTips = "";


        const embed = new EmbedBuilder()
            .setTitle(`${fantome.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())} :`);

        let fantomPage = journalParsed[`fantome`][`${fantome}`];

        embed.addFields({ name: `Description :${separator} `, value: fantomPage["description"] } );
        embed.addFields({ name: `Force :${separator} : `, value: fantomPage["force"] });
        embed.addFields({ name: `Faiblesse :${separator}  `, value: fantomPage["faiblesse"] });

        for (let i = 0; i < fantomPage["preuves"].length; i++) {
            strPreuves += "- " + fantomPage["preuves"][i] + "\n";
        }

        embed.addFields({ name: `Preuves :${separator}`, value: strPreuves });

       if (fantomPage["tips"].length != 0) {
            strTips = "- " + fantomPage["tips"][0] + "\n";

                embed.addFields({ name: `Tips : ${separator}`, value: strTips})

            for (let j = 1; j < fantomPage["tips"].length; j++) {
                strTips = "- " + fantomPage["tips"][j] + "\n";

                embed.addFields({ name: `‎`, value: strTips })
            }
        }


        if(fantomPage["file"]){
            const fileAudio = new AttachmentBuilder(`./audio/${fantome}.mp3`)

                embed.addFields({name : `Audio ${separator}`, value:`Au dessus du Message`});
                interaction.reply({files: [fileAudio], embeds: [embed]});
        
            }
        else{
            interaction.reply({ embeds: [embed] })
        }
    },

}