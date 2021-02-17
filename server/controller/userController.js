const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');
const { upload } = require('../utils/imageUpload');
const firebaseController = require('./firebaseController');
const Discussion = require('../models/discussionModel');
const APIFeatures = require('../utils/apiFeatures');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.uploadUserImage = upload.single('file');
exports.uploadStorageUser = firebaseController.uploadStorageFirebase(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user post password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // 2) Update user document
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'description',
    'image'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: null
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = factory.getOne(User, 'discussions');
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);

exports.follow = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new AppError("You can't follow yourself", 404));
  }

  if (req.user.following.includes(mongoose.Types.ObjectId(req.params.id))) {
    return next(new AppError('You already follow this user', 409));
  }

  const user = await User.findByIdAndUpdate(req.user.id, {
    $push: { following: mongoose.Types.ObjectId(req.params.id) }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $push: { follower: mongoose.Types.ObjectId(req.user.id) }
  });

  user.following.push(mongoose.Types.ObjectId(req.user.id));

  res.status(200).json({
    status: 'succsess',
    data: {
      user
    }
  });
});

exports.unfollow = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new AppError("You can't unfollow yourself", 404));
  }

  if (!req.user.following.includes(mongoose.Types.ObjectId(req.params.id))) {
    return next(new AppError("You didn't follow this user", 404));
  }

  const user = await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: mongoose.Types.ObjectId(req.params.id) }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { follower: mongoose.Types.ObjectId(req.user.id) }
  });

  user.following.pop(mongoose.Types.ObjectId(req.user.id));

  res.status(200).json({
    status: 'succsess',
    data: {
      user
    }
  });
});

exports.getFollowing = catchAsync(async (req, res, next) => {
  const result = await User.find({ _id: req.user.following });

  res.status(200).json({
    status: 'succsess',
    result: result.length,
    data: {
      result
    }
  });
});

exports.getMyDiscussion = catchAsync(async (req, res, next) => {
  const discussions = await Discussion.find({ user: req.user.id });

  res.status(200).json({
    status: 'succsess',
    result: discussions.length,
    data: {
      discussions
    }
  });
});

exports.getLeaderboard = catchAsync(async (req, res, next) => {
  const filter = {};
  req.query.sort = '-point';

  req.query.limit = '5';

  const features = new APIFeatures(User.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      results: doc
    }
  });
});
