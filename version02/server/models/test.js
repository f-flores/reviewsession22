const mongoose = require('mongoose');

// reference to Schema constructor
const { Schema } = mongoose;

// create a new NoteSchema object using the Schema constructor
const TestSchema = new Schema({
  foo: String,
  bar: String,
  baz: String,
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
