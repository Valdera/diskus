const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A discussion must have a title'],
      trim: true
    },
    text: {
      type: String,
      required: [true, 'A discussion must have a text'],
      trim: true
    },
    vote: {
      type: Number,
      default: 0
    },
    createdDate: {
      type: Date
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Discussion must belong to an user']
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    categories: {
      type: [String],
      default: ['Others']
    },
    image: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

discussionSchema.pre('save', function(next) {
  this.createdDate = Date.now();
  next();
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
