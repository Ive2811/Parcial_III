const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const classSchema = ({
    name: String
});

const Brand = mongoose.model('Class', classSchema);

module.exports = Brand;