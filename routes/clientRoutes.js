module.exports = app => {
    const clients = require('../controllers/clientController');
    var router = require('express').Router();

    //definir rutas para mostrar 
    router.post('/', clients.create);
    router.get('/', clients.findAll);
    router.get('/:id', clients.findOne);
    router.put('/:id', clients.update);
    router.delete('/:id', clients.delete);
    router.get("clientReminders/:id", clients.clientReminders);

    app.use('/api/client', router);
};