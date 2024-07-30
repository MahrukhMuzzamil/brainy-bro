// NotesTaking.js

const mongoose = require('mongoose');

// Define the schema for notes
const noteSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Create a model for the note schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
