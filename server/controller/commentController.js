const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/commentModel');
// const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');
const mongoose = require('mongoose');

exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.getAllComments = factory.getAll(Comment);

exports.upvoteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndUpdate(req.params.id, {
    $addToSet: { upvote: mongoose.Types.ObjectId(req.user.id) }
  });
  const comment = await Comment.findByIdAndUpdate(req.params.id, {
    $pull: { downvote: mongoose.Types.ObjectId(req.user.id) }
  });
  comment.downvote.pop(mongoose.Types.ObjectId(req.user.id));
  res.status(200).json({
    status: 'succsess',
    data: {
      comment
    }
  });
});

exports.downvoteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndUpdate(req.params.id, {
    $addToSet: { downvote: mongoose.Types.ObjectId(req.user.id) }
  });
  const comment = await Comment.findByIdAndUpdate(req.params.id, {
    $pull: { upvote: mongoose.Types.ObjectId(req.user.id) }
  });
  comment.upvote.pop(mongoose.Types.ObjectId(req.user.id));
  res.status(200).json({
    status: 'succsess',
    data: {
      comment
    }
  });
});
