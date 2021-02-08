const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');
const { upload } = require('../utils/imageUpload');
const firebaseController = require('./firebaseController');

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
  const filteredBody = filterObj(req.body, 'name', 'email', 'description');

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
  const user = await User.findByIdAndUpdate(req.user.id, {
    following: req.user.following.push(req.params.id)
  });
  await User.findByIdAndUpdate(req.params.id, {
    $push: { follower: req.user.id }
  });
  res.status(200).json({
    status: 'succsess',
    data: {
      user
    }
  });
});

exports.unfollow = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id }
  });
  await User.findByIdAndUpdate(req.params.id, {
    $pull: { follower: req.user.id }
  });
  res.status(200).json({
    status: 'succsess',
    data: {
      user
    }
  });
});
