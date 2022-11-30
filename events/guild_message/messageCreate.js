const prefix = '&';
const fs = require("fs");

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(client, message) {

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();

        if (cmdName.length == 0) return;

        let cmd = client.commands.get(cmdName);

        console.log(cmd);

        if (!message.member.permissions.has([cmd.permissions])) return message.reply("Vous n'avez pas les permissions requise");

        if (cmd) cmd.run(client, message, args);


        if(cmd.name == "code"){
            codeJSON = fs.readFileSync("./code.json")
            codeParsed = JSON.parse(codeJSON);
        }
    },
}