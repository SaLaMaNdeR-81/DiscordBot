
const { SetColor } = require('../Module/Colors')

module.exports = {

    name: "Ready",
    description: "",
    Status: true,

    async Execute(client) {

        client.on('ready', () => {

            console.log(SetColor(`&(Bc)&(0)Logged In Discord As &(1)${client.user.tag} &(r)`));

            client.user.setStatus(client.Config.Status)

        });

    }

}