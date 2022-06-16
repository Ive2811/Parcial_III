module.exports= (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        }
    })
    return Client;
};