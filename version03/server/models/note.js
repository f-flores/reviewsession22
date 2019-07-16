const mongoose = require('mongoose');

// reference to Schema constructor
const { Schema } = mongoose;

// create a new NoteSchema object using the Schema constructor
const NoteSchema = new Schema({
  body: String,
});

// creates model from NoteSchema using mongoose's model method
const Note = mongoose.model('Note', NoteSchema);

// Export the Note model
module.exports = Note;
