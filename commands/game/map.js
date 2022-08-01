const { EmbedBuilder, AttachmentBuilder} = require("discord.js")

module.exports = {
    name: 'map',
    permissions: ['MENTION_EVERYONE'],
    category: 'game',
    description: 'renvoie les carte de la map!',
    usage: "/map",
    once: true,
    options : [{
        name: "map",
        description: 'Tapez le nom de la map que vous voulez consulter',
        required: true,
        type:3,
        choices: [{
            name: "Edgefield",
            value: "edgefield",
        },
        {
            name: "Willow",
            value: "willow",
        },
        {
            name: "Prison",
            value: "prison",
        },
        {
            name: "Asile",
            value: "asile",
        },
        {
            name: "Camping",
            value: "Camping",
        },
        {
            name: "Grafton",
            value: "grafton",
        }
        ,{
            name: "Bleasdale",
            value: "bleasdale",
        }
        ,{
            name: "Ecole",
            value: "ecole",
        },
        {
            name: "Tanglewood",
            value: "tanglewood",
        }
    ]
    }],
    runInteraction: (client, interaction) => {
        const embed = new EmbedBuilder();

        const map = interaction.options.getString("map");


        switch(map.toLowerCase()){

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

                interaction.reply({ embeds: [embed], files: [fileRidge]});
                break;
            case "edgefield":
                const fileEdge = new AttachmentBuilder('./images/edgefield.png')

                embed.setTitle("Edgefield");
                embed.setImage("attachment://edgefield.png");

                interaction.reply({ embeds: [embed], files: [fileEdge]});
                break;
            case "tanglewood":
                const fileTangle= new AttachmentBuilder('./images/tanglewood.png')

                embed.setTitle("Tanglewood");
                embed.setImage("attachment://tanglewood.png");

                interaction.reply({ embeds: [embed], files: [fileTangle]});
                break;
            case "camping":
                const fileCamp = new AttachmentBuilder('./images/camping.png')

                embed.setTitle("Camping");
                embed.setImage("attachment://camping.png");

                interaction.reply({ embeds: [embed], files: [fileCamp]});
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

                interaction.reply({ embeds: [embed], files: [fileWill]});
                break;
            default:
                embed.setTitle("ERROR");
                embed.setImage("https://image.shutterstock.com/image-vector/eror-404-sign-cloud-computing-260nw-2109211787.jpg");

                interaction.reply({ embeds: [embed] });
                break;  
        }
    },

}