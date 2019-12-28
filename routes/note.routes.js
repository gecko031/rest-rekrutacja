module.exports = (app) => {
    const NoteModel = require('../controllers/note.controllers.js');
    const HistoryNoteModel = require('../controllers/history.controllers.js')
    
    // Current collection
    app.get('/ps/notes', NoteModel.getAllNotes);
    app.get('/ps/notes/:id', NoteModel.getNote);
    app.post('/ps/notes', NoteModel.createNote);
    app.put('/ps/notes/:id', NoteModel.updateNote);
    app.delete('/ps/notes/:id', NoteModel.deleteNote);

    // History collection
    app.get('/ps/history', HistoryNoteModel.getAllNotes);
    app.get('/ps/history/:id', HistoryNoteModel.getNote);

}