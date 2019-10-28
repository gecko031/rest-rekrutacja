const noteModel = require('../models/note.models.js');

// Returns all Notes
exports.findAllNotes = (req, res) => {
  noteModel.find()
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
};

// Returns Note with specific id
exports.findNote = (req, res) => {
    noteModel.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Creates new Note and saves to 'psrest' database
exports.createNote = (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      message: "Note requires a title"
    });
  } else if (!req.body.content) {
    return res.status(400).send({
      message: "Note requires a content"
    });
  }
  // Create note
  const note = new Note({
    title: req.body.title || "Untitled Note", 
    content: req.body.content,
    created: new Date(),
    modified: null
  });

  // Save Note in db psrest
  note.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Udefined error - cannot create Note"
    });
  });
}

exports.updateNote = (req, res) => {
  // Validate Request
  if(!req.body.content) {
      return res.status(400).send({
          message: "Note content can not be empty"
      });
  }

  // Find note and update it with the request body
  noteModel.updateNote(req.params.noteId, {
      title: req.body.title || "Untitled Note",
      content: req.body.content
  }, {new: true})
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });
      }
      res.send(note);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });                
      }
      return res.status(500).send({
          message: "Error updating note with id " + req.params.noteId
      });
  });
};

// Deletes Note with specific Id
exports.deleteNote = (req, res) => {
  noteModel.findByIdAndRemove(req.params.noteId)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });
      }
      res.send({message: "Note deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });                
      }
      return res.status(500).send({
          message: "Could not delete note with id " + req.params.noteId
      });
  });
};
