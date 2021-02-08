const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Discussion = require('../models/discussionModel');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const docFind = await Model.findById(req.params.id);

    if (!docFind) {
      return next(new AppError('No document found with that ID', 400));
    }

    if (['Comment', 'Discussion'].includes(Model.modelName)) {
      if (String(docFind.user) !== req.user.id) {
        return next(
          new AppError(`You don't have permission to edit this document`, 404)
        );
      }
    }

    await Model.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const docFind = await Model.findById(req.params.id);

    if (!docFind) {
      return next(new AppError('No document found with that ID', 400));
    }

    if (['Comment', 'Discussion'].includes(Model.modelName)) {
      if (String(docFind.user) !== req.user.id) {
        return next(
          new AppError(`You don't have permission to edit this document`, 404)
        );
      }
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename;

    if (req.user) req.body.user = req.user.id;

    if (req.params.discussionId) req.body.discussion = req.params.discussionId;

    if (['Comment'].includes(Model.modelName)) {
      const discussion = await Discussion.findById(req.body.discussion);

      if (!discussion) {
        return next(new AppError(`There are no discussion with this ID`, 400));
      }
    }

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, populateOpt) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOpt) query = query.populate(populateOpt);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No Document find with that ID', 400));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

//GET localhost/user?sort=''

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    // if (req.params.examId) filter = { exam: req.params.examId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
