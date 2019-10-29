let mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  note: {
      title: String,
      content: String,
  }
});

module.exports = mongoose.model('Note', noteSchema)