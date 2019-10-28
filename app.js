const express = require('express');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Database configuration
const configDb = require('./database/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Database connect
mongoose.connect(configDb.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connection to database established');
}).catch(err => {
  console.log('Not able to connect. Reason: ', err);
  process.exit();
});

// Simple route definition
app.get('/', (req, res) => {
  res.json({
    "message": "Hello! Welcome to my note management app"
  });
});

require('./routes/note.routes.js')(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});