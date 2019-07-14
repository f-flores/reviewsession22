const mongooseUrlType = require('mongoose-type-url');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { SchemaTypes: { Url } } = mongooseUrlType;

const PictureSchema = new Schema({
  picUrl: {
    type: Url,
    default: 'https://via.placeholder.com/200x200',
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
