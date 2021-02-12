const Comment = require('../models/commentModel');
// const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');
const vote = require('../utils/vote');

exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.getAllComments = factory.getAll(Comment);

exports.upvoteComment = vote.upvote(Comment);
exports.downvoteComment = vote.downvote(Comment);
