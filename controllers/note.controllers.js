const NoteModel = require('../models/note.models.js');
const HistoryNoteModel = require('../models/history.models.js');


// Returns all Notes
exports.getAllNotes = (req, res) => {
    NoteModel.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Returns Note with specific id
exports.getNote = (req, res) => {
    NoteModel.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
};

// Creates new Note and saves to 'psrest' database
exports.createNote = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: "Note requires a title"
        });
    } else if (!req.body.content) {
        return res.status(400).send({
            message: "Note requires a content"
        });
    }
    // Create note
    const note = new NoteModel({
        title: req.body.title,
        content: req.body.content
    });
    // Save Note in db: psrest -> collection: 'notes'
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
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    NoteModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            // create HistoryNoteModel object in HistoryNote collection
            const historyNote = new HistoryNoteModel({
                status: "updated",
                noteContent: {
                    id: req.params.id,
                    title: req.body.title,
                    content: req.body.content,
                    v: note.__v,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                },
                
            });
            // saves historyNote object as 'historyNotes' document
            historyNote.save()
            .then(data => {
                console.log('historyNote oj after save?' + data);
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Udefined error - cannot create HistoryNote 'updated' document"
                });
            });
            // saves note object as 'notes' document
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.id
            });
        });
};

// Deletes Note with specific Id
exports.deleteNote = (req, res) => {
    NoteModel.findById(req.params.id).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        // create HistoryNoteModel object in HistoryNote collection
        const historyNote = new HistoryNoteModel({
            status: "deleted",
            noteContent: {
                id: req.params.id,
                title: note.title,
                content: note.content,
                v: note.__v,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });
        // saves historyNote object as 'historyNotes' documents
        historyNote.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Udefined error - cannot create HistoryNote 'deleted' document"
            });
        });
    });

    NoteModel.findByIdAndRemove(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            // send return message
            res.send({ message: "Note deleted successfully!"});
        }).catch(err => {params
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        });
};
