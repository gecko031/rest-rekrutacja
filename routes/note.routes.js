module.exports = (app) => {
    const notes = require('../controllers/note.controllers.js');
    
    app.get('/ps/notes', notes.getAllNotes);
    app.get('/ps/notes/:id', notes.getNote);
    app.post('/ps/notes', notes.createNote);
    app.put('/ps/notes/:id', notes.updateNote);
    app.delete('/ps/notes/:id', notes.deleteNote);
}