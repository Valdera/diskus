// const catchAsync = require('../utils/catchAsync');
const Discussion = require('../models/discussionModel');
// const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');

exports.getDiscussion = factory.getOne(Discussion);
exports.createDiscussion = factory.createOne(Discussion);
exports.updateDiscussion = factory.updateOne(Discussion);
exports.deleteDiscussion = factory.deleteOne(Discussion);
exports.getAllDiscussions = factory.getAll(Discussion);