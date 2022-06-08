const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const asigSchema = ({
    grade: String,
    name: String,
    e_id: Number,
    c_id: Number
});

const Asig = mongoose.model('Asignanmet', asigSchema);

module.exports = Asig;