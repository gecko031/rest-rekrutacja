module.exports = (app) => {
    const NoteModel = require('../controllers/note.controllers.js');
    
    app.get('/ps/notes', NoteModel.getAllNotes);
    app.get('/ps/notes/:id', NoteModel.getNote);
    app.post('/ps/notes', NoteModel.createNote);
    app.put('/ps/notes/:id', NoteModel.updateNote);
    app.delete('/ps/notes/:id', NoteModel.deleteNote);

}