module.exports = app => {
    const reminders = require('../controllers/reminderController');
    var router = require('express').Router();

    //definir rutas para mostrar 
    router.post('/', reminders.create);
    router.get('/', reminders.findAll);
    router.get('/:id', reminders.findOne);
    router.put('/:id', reminders.update);
    router.delete('/:id', reminders.delete);

    app.use('/api/reminder', router);
};