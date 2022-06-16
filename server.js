const express = require('express');
const cors = require('cors'); //permitir las conexiones de diferentes origenes son permisos para trabajar con api
const app = express();
const db = require('./models');

// ejecutar modelos en la base de datos
db.sequelize.sync({ force: false }).then(() => { //no se borraran las tablas por eso se deja en false
    console.log('Sincronizando nuestra base de datos');
});

// opciones cors
var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json()); // parsear la solicitud (tipo de contenido json)
app.use(express.urlencoded({ extended: true})); //Solo una vez va crear y no borar cada vez que se ejecuta la app

// ruta simple para ver que si esta corriendo 
app.get('/', (req, res) => {
    res.json({ message: "Bienvenidos puerto 8081" });
});

//rutas 
require('./routes/clientRoutes')(app);
require('./routes/reminderRoutes')(app);

// definir puerto 
app.listen(8081, () => {
    console.log("El servidor esta corriendo en el puerto 3000");
});