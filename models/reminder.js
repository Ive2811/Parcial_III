module.exports =(sequelize, Sequelize) => {
    const Reminder = sequelize.define("reminder", {
        titulo: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        fecha: {
            type: Sequelize.STRING
        },
        hora: {
            type: Sequelize.STRING
        }
    });
    return Reminder;
};