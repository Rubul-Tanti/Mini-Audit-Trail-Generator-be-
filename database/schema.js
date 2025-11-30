const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },

  addedWords: {
    type: [String],
    default: []
  },

  removedWords: {
    type: [String],
    default: []
  },

  oldLength: {
    type: Number,
    required: true,
    min: [0, 'cannot be less than zero']
  },

  newLength: {
    type: Number,
    required: true,
    min: [0, 'cannot be less than zero']
  },
  text:{type:String,required:true}
});

module.exports = mongoose.model('TextLog', TextSchema);
