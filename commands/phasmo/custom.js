module.exports = {
    name: 'custom',
    permissions: ['ViewChannel'],
    category: 'phasmo',
    description: 'Défini les paramètre custom de phasmo',
    usage: "/custom",
    once: true,
    options:[{
        name: "add",
        description: "Ajoute une custom difficulty",
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
    },],
    runInteraction: (client, interaction) => {
        
    },
}