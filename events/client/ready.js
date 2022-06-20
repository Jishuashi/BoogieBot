const fs = require("fs");


module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("Je suis ready");

    const devGuild = await client.guilds.cache.get("952691106712260708");

    devGuild.commands.set(client.commands.map((cmd) => cmd));


    setTimeout(() => {
      permParsed =  JSON.parse(fs.readFileSync("./perm.json"));

      lListMember = permParsed["member"];

      hours = new Date().getHours();
      minute =  new Date().getMinutes();

      for (let i = 0; i < lListMember.length ; i++) {
        if((hours, minute) == (lListMember[i]["time"][0] , lListMember[i]["time"][1])){
          lListMember.splice(i);

          console.log("Removed");

          permParsed["member"] = lListMember;
          fs.writeFileSync("./perm.json", JSON.stringify(permParsed))
        }
      }

    }, 10000)
  },
};
