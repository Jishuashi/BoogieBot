const { time, log } = require("console");
const { EmbedBuilder, MessageButton, MessageActionRow } = require("discord.js");
const fs = require("fs");
const separator = "------------------------------\n";

module.exports = {
  name: "game",
  permissions: ["MENTION_EVERYONE"],
  category: "game",
  description: "Crée un game phasmo",
  usage: "/game",
  once: true,
  run: (client, message, args) => {},
  options: [
    {
      name: "action",
      description: "Tapez l'index du journal que vous voulez consulter",
      type: 3,
      required: true,
      choices: [
        {
          name: "create",
          value: "create",
        },
        {
          name: "remove",
          value: "remove",
        },
      ],
    },
    {
      name: "code",
      description: "Tapez le code de la game",
      type: 3,
      required: false,
    },
  ],
  runInteraction: async (client, interaction) => {
    const args = interaction.options.getString("action");
    const code = interaction.options.getString("code");

    gameParsed = JSON.parse(fs.readFileSync("./game.json"));


    if (args == "create") {
      objectGame = {code: code, id: gameParsed.id, player: 1};
      gameParsed.id += 1;

      data = JSON.stringify(gameParsed);
      fs.writeFileSync("./game.json", data);

      const embed = new EmbedBuilder()
          .setTitle(`Game Phasmo ${objectGame.id}`)
          .addFields (
              { name: "Info de la game \n" + separator, value :  `Code de la Game --> ${objectGame.code}`}
          );
    }
  }
};
