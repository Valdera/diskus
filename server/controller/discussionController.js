const MiniSearch = require('minisearch');
const { upload } = require('../utils/imageUpload');
const catchAsync = require('../utils/catchAsync');
const Discussion = require('../models/discussionModel');
const factory = require('../controller/handlerFactory');
const APIFeatures = require('../utils/apiFeatures');
const firebaseController = require('./firebaseController');
const vote = require('../utils/vote');

exports.uploadDiscussionImage = upload.single('file');
exports.uploadStorageDiscussion = firebaseController.uploadStorageFirebase(
  Discussion
);

exports.getDiscussion = factory.getOne(Discussion, 'comments');
exports.createDiscussion = factory.createOne(Discussion);
exports.updateDiscussion = factory.updateOne(Discussion);
exports.deleteDiscussion = factory.deleteOne(Discussion);
exports.getAllDiscussions = factory.getAll(Discussion, 'comments');

exports.searchDiscussion = catchAsync(async (req, res, next) => {
  const filter = {};

  const features = new APIFeatures(Discussion.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  const miniSearch = new MiniSearch({
    fields: ['text', 'title'],

    storeFields: ['title', 'text', 'categories', 'user', 'id', 'vote']
  });

  miniSearch.addAll(doc);

  const results = miniSearch.search(req.body.text, {
    prefix: true,
    fuzzy: 0.2,
    boost: { title: 2 }
  });

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.upvoteDiscussion = vote.upvote(Discussion);
exports.downvoteDiscussion = vote.downvote(Discussion);

exports.getPopular = catchAsync(async (req, res, next) => {
  const filter = {};
  req.query.sort = '-vote';

  req.query.limit = '3';

  const features = new APIFeatures(Discussion.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query.populate('comments');

  res.status(200).json({
    status: 'success',
    data: {
      results: doc
    }
  });
});
