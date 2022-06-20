const fs = require("fs");

module.exports = {
    name: 'permission',
    permissions: ['BAN_MEMBERS'],
    category: 'admin',
    description: 'gère les permission des commands!',
    usage: "!permission",
    once: true,
    options: [
        {
            name: "id",
            description: 'ID du membre a TO',
            type: "STRING",
            required: true
        },
        {
            name: "time",
            description: 'En minute',
            type: "STRING",
            required: true
        }
    ],
    runInteraction: (client, interaction) => {
        permJSON =  fs.readFileSync('./perm.json');
        permParsed =  JSON.parse(permJSON);

        id = interaction.options.getString("id");
        time = interaction.options.getString("time");


        date = new Date();
        date.getTime();

        time = parseInt(time);

        minute = Math.floor(time/60);
        hours = time%60;

        minuteS = Math.floor(time/60);
        hoursS = time%60

        hours += date.getHours();
        minute += date.getMinutes();

        permParsed["member"].push({"id": id, "time": [hours, minute], "timeString": hoursS + "h" + minuteS + "min"});

        saveBDD(permParsed);


        interaction.reply("Succes");
    },
}

const saveBDD = (pData) => {
    fs.writeFileSync("./perm.JSON" , JSON.stringify(pData));
}