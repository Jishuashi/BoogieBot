const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "random-map",
  permissions: ["MENTION_EVERYONE"],
  category: "game",
  description: "renvoie une map aléatoire",
  usage: "!random-map",
  once: true,
  run: (client, message, args) => {
    mapParsed = JSON.parse(fs.readFileSync("./map.json"));

    const embed = new MessageEmbed().setTitle("Random Map");

    random = Math.random();
    randomM = Math.floor(random * mapParsed.map.length);
    randomD = Math.floor(random * mapParsed.dif.length);

    embed.addField(
      "-----------------\n",
      `La map -->   ${mapParsed.map[randomM]}`
    );
    embed.addField(
      "-----------------\n",
      `La Difficulté  -->   ${mapParsed.dif[randomD]}`
    );

    message.channel.send({ embeds: [embed] });
  },
  runInteraction: (client, interaction) => {
    mapParsed = JSON.parse(fs.readFileSync("./map.json"));

    const embed = new MessageEmbed().setTitle("Random Map");

    random = Math.random();
    randomM = Math.floor(random * mapParsed.map.length);
    randomD = Math.floor(random * mapParsed.dif.length);

    embed.addField(
      "-----------------\n",
      `La map -->   ${mapParsed.map[randomM]}`
    );
    embed.addField(
      "-----------------\n",
      `La Difficulté  -->   ${mapParsed.dif[randomD]}`
    );

    interaction.reply({ embeds: [embed] });
  },
};
