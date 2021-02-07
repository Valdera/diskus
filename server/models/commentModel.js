const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'A comment must have a text'],
      trim: true
    },
    vote: {
      type: Number,
      default: 0
    },
    createdDate: {
      type: String
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Discussion must belong to an user']
    },
    discussion: {
      type: mongoose.Schema.ObjectId,
      ref: 'Discussion',
      required: [true, 'Discussion must belong to a discussion']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
