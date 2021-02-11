const MiniSearch = require('minisearch');
const { upload } = require('../utils/imageUpload');
const catchAsync = require('../utils/catchAsync');
const Discussion = require('../models/discussionModel');
const factory = require('../controller/handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const firebaseController = require('./firebaseController');
const mongoose = require('mongoose');

exports.uploadDiscussionImage = upload.single('file');
exports.uploadStorageDiscussion = firebaseController.uploadStorageFirebase(
  Discussion
);

exports.getDiscussion = factory.getOne(Discussion, 'comments');
exports.createDiscussion = factory.createOne(Discussion);
exports.updateDiscussion = factory.updateOne(Discussion);
exports.deleteDiscussion = factory.deleteOne(Discussion);
exports.getAllDiscussions = factory.getAll(Discussion);

exports.searchDiscussion = catchAsync(async (req, res, next) => {
  const filter = {};

  const features = new APIFeatures(Discussion.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;
  // console.log(doc);

  const miniSearch = new MiniSearch({
    fields: ['text'],
    storeFields: ['title', 'text', 'categories', 'user', 'id', 'vote']
  });

  miniSearch.addAll(doc);

  const results = miniSearch.search(req.body.text, { prefix: true });

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.upvote = catchAsync(async (req, res, next) => {
  await Discussion.findByIdAndUpdate(req.params.id, {
    $addToSet: { upvote: mongoose.Types.ObjectId(req.user.id) }
  });
  const discussion = await Discussion.findByIdAndUpdate(req.params.id, {
    $pull: { downvote: mongoose.Types.ObjectId(req.user.id) }
  });
  discussion.downvote.pop(mongoose.Types.ObjectId(req.user.id));
  res.status(200).json({
    status: 'succsess',
    data: {
      discussion
    }
  });
});

exports.downvote = catchAsync(async (req, res, next) => {
  await Discussion.findByIdAndUpdate(req.params.id, {
    $addToSet: { downvote: mongoose.Types.ObjectId(req.user.id) }
  });
  const discussion = await Discussion.findByIdAndUpdate(req.params.id, {
    $pull: { upvote: mongoose.Types.ObjectId(req.user.id) }
  });
  discussion.upvote.pop(mongoose.Types.ObjectId(req.user.id));
  res.status(200).json({
    status: 'succsess',
    data: {
      discussion
    }
  });
});
