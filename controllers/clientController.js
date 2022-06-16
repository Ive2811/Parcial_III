const db = require('../models');
const Client = db.clients;
const Op = db.Sequelize.Op

// nuevo cliente
exports.create = (req, res) => {
    if(!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacio"
        });
    }

    const client = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
        
    }
    Client.create(client)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrio un error al crear un nuevo cliente"
            })
        })

}

// Cliente mediante ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Client.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else {
                res.status(400).send({
                    message: "No se encontro el cliente" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrio un error al encontrar el cliente" + id
            })
        })
}
// filtrar todos los clientes por nombre
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {nombre: {[Op.like]: `%${nombre}%`}} : null;
    Client.findAll({where: condition})
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrio un error al encontrar el cliente" 
            })
        })
}
// actualizar datos erroneos del cliente
exports.update = (req, res) => {
    const id = req.params.id;
    Client.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Se actualizo el nombre"
                });
            } else {
                res.send ({
                    message: "No se pudo actualizar el registro con exito"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrio un error al actualizar el cliente" 
            })
        })

}
// eliminar cliente
exports.delete = (req, res) => {
    const id = req.params.id;
    Client.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Se elimino el cliente"
                });
            } else {
                res.send ({
                    message: "No se pudo eliminar el registro con exito"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrio un error al eliminar el cliente" 
            })
        })

}
// recordatorios por cliente
exports.clientReminders = (req, res) => {
    const id = req.params.id;
    Client.findByPk(id, { include: ["reminders"]})
        .then(data => {
            if(data){
                res.send(data);
            } else {
                res.status(400).send({
                    message: "No se encontro el cliente" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message  || "Ocurrio un error al encontrar el cliente" + id
            })
        })
}