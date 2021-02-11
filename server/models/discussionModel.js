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
    categories: {
      type: [String],
      default: ['Others']
    },
    image: String,
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

discussionSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'discussion',
  localField: '_id'
});

discussionSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name image'
  });
  next();
});

discussionSchema.pre('save', function(next) {
  this.createdDate = Date.now();
  next();
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
