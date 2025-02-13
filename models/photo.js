const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference the Category model
    required: true,
  },
  description: {
    type: String, required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Photos = mongoose.model('Photo', PhotoSchema);

module.exports = Photos;
