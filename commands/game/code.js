const fs = require("fs");

module.exports = {
    name: 'code',
    permissions: ['MENTION_EVERYONE'],
    category: 'game',
    description: 'renvoie code de la game!',
    usage: "!code",
    once: true,
    run: (client, message, args) => {
        codeJSON = fs.readFileSync('./code.json');
        codeParsed = JSON.parse(codeJSON);


        if(args[0] == "add"){
            codeParsed.code = args[1];
            fs.writeFileSync("./code.json", JSON.stringify(codeParsed));
        }
        else if(args[0] == "see"){

            if (codeParsed.code == ""){
                message.reply("Aucun code");
            }
            else {
                message.reply(codeParsed.code);
            }
        }
        else if(args[0] == "remove"){
            codeParsed.code = "";
            fs.writeFileSync("./code.json", JSON.stringify(codeParsed));
        }
        else {
            message.reply(`Commande Invalide --> ${args[0]}`)
        }
    },
    runInteraction: (client, interaction) => {
        interaction.reply('pong!');
    },
}