const { time, log } = require("console");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
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
      type: "STRING",
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
      type: "STRING",
      required: false,
    },
  ],
  runInteraction: async (client, interaction) => {
    const args = interaction.options.getString("action");
    const code = interaction.options.getString("code");

    gameParsed = JSON.parse(fs.readFileSync("./game.json"));

    const buttonJoin = new MessageButton()
      .setCustomId("Join")
      .setLabel("Join")
      .setStyle("PRIMARY")
      .setDisabled(false);

    const buttonLeave = new MessageButton()
      .setCustomId("Leave")
      .setLabel("Leave")
      .setStyle("PRIMARY")
      .setDisabled(false);

    if (args == "create") {
      objectGame = { code: code, id: gameParsed.id, player: 1};
      gameParsed.id += 1;

      data = JSON.stringify(gameParsed);
      fs.writeFileSync("./game.json", data);

      const embed = new MessageEmbed()
        .setTitle(`Game Phasmo ${objectGame.id}`)
        .addField(
          "Info de la game \n" + separator,
          `Le nombre actuel de joueur : ${objectGame.player} \n Code de la Game --> ${objectGame.code}`
        );

      const collector = interaction.channel.createMessageComponentCollector({
        time: 15000,
      });

      g = 1;

      collector.on("collect", async (i) => {
        if (i.customId === "Join") {
          const embedUpdateJ = new MessageEmbed()
            .setTitle(`Game Phasmo ${objectGame.id}`)
            .addField(
              "Info de la game \n" + separator,
              `Le nombre actuel de joueur : ${(objectGame.player += 1)} \n Code de la Game --> ${
                objectGame.code
              }`
            );

          await i.update({ embeds: [embedUpdateJ], components: [row] });
        }
      });

      collector.on("collect", async (i) => {
        if (i.customId === "Leave") {
          if (objectGame.player - 1 == 0) {
            const embed = new MessageEmbed()
              .addField("Game Closed", "Cette partie est terminée");
            

            return i.update({ embeds: [embed] });
          }

          const embedUpdateL = new MessageEmbed()
            .setTitle(`Game Phasmo ${objectGame.id}`)
            .addField(
              "Info de la game \n" + separator,
              `Le nombre actuel de joueur : ${(objectGame.player -= 1)} \n Code de la Game --> ${
                objectGame.code
              }`
            );

          await i.update({ embeds: [embedUpdateL], components: [row]});
        }
      });

      const row = new MessageActionRow().addComponents(buttonJoin, buttonLeave);

      interaction.reply({ embeds: [embed], components: [row] });
    } else if (args == "remove") {
    } else {
      interaction.reply(`Commande Invalide --> ${args}`);
    }
  },
};
