const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const studentSchema = ({
    name: String,
    lastname: String,
    birthday: String,
    height: Number,
    location: String,
    last_update: String,
    active: String
});

const Student= mongoose.model('Student', studentSchema);

module.exports = Student;