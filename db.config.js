module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "usbw",
    DB: "apirest",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

//archivo de cofiguracion para la conexion con la BD...loading