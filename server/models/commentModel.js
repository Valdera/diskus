const mongoose = require('mongoose');
const { sentimentAnalysis } = require('../utils/sentiment');

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
    upvote: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      ]
    },
    downvote: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      ]
    },
    createdDate: {
      type: Date
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
    },
    sentiment: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

commentSchema.pre('save', async function(next) {
  this.createdDate = Date.now();
  this.sentiment = await sentimentAnalysis(this.text);
  next();
});

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name image'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
