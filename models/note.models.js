let mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('NoteModel', noteSchema)