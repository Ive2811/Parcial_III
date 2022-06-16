const db = require('../models');
const Reminder = db.reminders;
const Op = db.Sequelize.Op

// nuevo recordatorio
exports.create = (req, res) => {
    if(!req.body.titulo) {
        res.status(400).send({
            message: "El titulo no puede estar vacío."
        });
    }

    const reminder = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        hora: req.body.hora,
        clientId: req.body.clientId
    }
    Reminder.create(reminder)
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message  || "Ocurrió un error al crear un nuevo recordatorio."
        })
    })
}
// Recordatorio mediante ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Reminder.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else {
                res.status(400).send({
                    message: "No se encontró el recordatorio" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrió un error al encontrar el recordatorio" + id
            })
        })
}
// filtrar todos los recordatorios por titulo
exports.findAll = (req, res) => {
    const titulo = req.query.titulo
    var condition = titulo ? {titulo: {[Op.like]: `%${titulo}%`}} : null;
    Reminder.findAll({where: condition})
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrió un error al encontrar el recordatorio" 
            })
        })
}
// actualizar datos erroneos del recordatorio agendado
exports.update = (req, res) => {
    const id = req.params.id;
    Reminder.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Se actualizó el registro"
                });
            } else {
                res.send ({
                    message: "No se pudo actualizar el registro con éxito"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrió un error al actualizar el recordatorio" 
            })
        })

}
// eliminar recordatorio 
exports.delete = (req, res) => {
    const id = req.params.id;
    Reminder.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Se eliminó el recordatorio."
                });
            } else {
                res.send ({
                    message: "No se pudo eliminar el recordatorio con éxito."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrió un error al eliminar el recordatorio." 
            })
        })

}