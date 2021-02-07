const catchAsync = require('../utils/catchAsync');
const Discussion = require('../models/discussionModel');
const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');
const MiniSearch = require('minisearch');
const APIFeatures = require('../utils/apiFeatures');

exports.getDiscussion = factory.getOne(Discussion);
exports.createDiscussion = factory.createOne(Discussion);
exports.updateDiscussion = factory.updateOne(Discussion);
exports.deleteDiscussion = factory.deleteOne(Discussion);
exports.getAllDiscussions = factory.getAll(Discussion);

exports.searchDiscussion = catchAsync(async (req,res, next) => {
    let filter = {};
    
    const features = new APIFeatures(Discussion.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    const miniSearch = new MiniSearch({
        fields: ['text'],
        storeFields: ['text', 'categories']
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