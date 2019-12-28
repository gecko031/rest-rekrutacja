const HistoryNoteModel = require('../models/history.models.js');

exports.getAllNotes = (req, res) => {
    HistoryNoteModel.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.getNoteHistory = (req, res) => {
    HistoryNoteModel.find({
        'noteContent.id': { $in: req.params.id}
    }, function(err, docs) {
        if (!docs) {
            return res.status(404).send({
                message: "historyNote not found with id " + req.params.id
            });
        }
        res.send(docs);
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note history not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note history with id " + req.params.id
        });
    });
};