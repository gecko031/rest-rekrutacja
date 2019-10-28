let mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  note: {
      title: String,
      content: String,
      created: Date,
      modified: Date,
      __v: Number
  }
});

module.exports = mongoose.model('Note', noteSchema)