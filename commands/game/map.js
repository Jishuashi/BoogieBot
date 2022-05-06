const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'map',
    permissions: ['MENTION_EVERYONE'],
    category: 'game',
    description: 'renvoie les carte de la map!',
    usage: "!map",
    once: true,
    run: (client, message, args) => {
        const embed = new MessageEmbed();

        switch(args[0].toLowerCase()){

            case "asile":
                embed.setTitle("Asile");
                embed.setImage("https://steamlists.com/wp-content/uploads/2021/04/Phasmophobia-Guide-to-asylum-steamlists-com.png");
                break;
            case "bleasdale":
                embed.setTitle("Bleasdale");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Bleasdale-Farmhouse-Cursed-Possessions-Items-Locations-oPJn83-3-1200x900.jpg");
                break;
            case "grafton":
                embed.setTitle("Grafton");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Grafton-Farmhouse-Phasmophobia-Cursed-Possessions-Items-Locations-ZVr7GXB-6.jpg");
                break;
            case "prison":
                embed.setTitle("Prison");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Prison-Cursed-Items-Location-wi8LWXS3-8.jpg");
                break;        
            case "ridgeview":
                embed.setTitle("Ridgeview");
                embed.setImage("https://sirjimmothy.github.io/phasmo/img/map_ridgeview.png");
                break;
            case "edgeflied":
                embed.setTitle("Edgeflied");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Edgefield-Street-House-Cursed-items-location-zWCzq262-5.jpg");
                break;
            case "tanglewood":
                embed.setTitle("Tanglewood");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Tanglewood-Street-House-CBc4mpUYH-10.jpg");
                break;  
            case "camping":
                embed.setTitle("Camping");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Maple-Lodge-Campsite-qnvKzj-7.jpg");
                break;  
            case "ecole":
                embed.setTitle("École");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Brownstone-High-School-Locations-Cursed-n82hS103-4.jpg");
                break;
            case "willow":
                embed.setTitle("Willow");
                embed.setImage("https://media.sirusgaming.com/wp-content/uploads/2022/01/Willow-Street-House-Phasmophobia-Cursed-Possessions-Spawn-Locations.png");
                break;  
            default:
                embed.setTitle("ERROR");
                embed.setImage("https://image.shutterstock.com/image-vector/eror-404-sign-cloud-computing-260nw-2109211787.jpg");
                break;   
        }

        message.channel.send({ embeds: [embed] });
    },
    options : [{
        name: "map",
        description: 'Tapez le nom de la map que vous voulez consulter',
        type: "STRING",
        required: true,
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
            name: "Ecole",
            value: "ecole",
        },
        {
            name: "Tanglewood",
            value: "t#anglewood",
        }
    ]
    }],
    runInteraction: (client, interaction) => {
        const embed = new MessageEmbed();

        const map = interaction.options.getString("map");

        switch(map.toLowerCase()){

            case "asile":
                embed.setTitle("Asile");
                embed.setImage("https://steamlists.com/wp-content/uploads/2021/04/Phasmophobia-Guide-to-asylum-steamlists-com.png");
                break;
            case "bleasdale":
                embed.setTitle("Bleasdale");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Bleasdale-Farmhouse-Cursed-Possessions-Items-Locations-oPJn83-3-1200x900.jpg");
                break;
            case "grafton":
                embed.setTitle("Grafton");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Grafton-Farmhouse-Phasmophobia-Cursed-Possessions-Items-Locations-ZVr7GXB-6.jpg");
                break;
            case "prison":
                embed.setTitle("Prison");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Prison-Cursed-Items-Location-wi8LWXS3-8.jpg");
                break;        
            case "ridgeview":
                embed.setTitle("Ridgeview");
                embed.setImage("https://sirjimmothy.github.io/phasmo/img/map_ridgeview.png");
                break;
            case "edgefield":
                embed.setTitle("Edgeflied");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Edgefield-Street-House-Cursed-items-location-zWCzq262-5.jpg");
                break;
            case "tanglewood":
                embed.setTitle("Tanglewood");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Tanglewood-Street-House-CBc4mpUYH-10.jpg");
                break;  
            case "camping":
                embed.setTitle("Camping");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Maple-Lodge-Campsite-qnvKzj-7.jpg");
                break;  
            case "ecole":
                embed.setTitle("École");
                embed.setImage("https://blocs.news/wp-content/uploads/2021/12/Brownstone-High-School-Locations-Cursed-n82hS103-4.jpg");
                break;
            case "willow":
                embed.setTitle("Willow");
                embed.setImage("https://media.sirusgaming.com/wp-content/uploads/2022/01/Willow-Street-House-Phasmophobia-Cursed-Possessions-Spawn-Locations.png");
                break;  
            default:
                embed.setTitle("ERROR");
                embed.setImage("https://image.shutterstock.com/image-vector/eror-404-sign-cloud-computing-260nw-2109211787.jpg");
                break;  
        }

        interaction.reply({ embeds: [embed] });
    },

}