// const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
// const AppError = require('../utils/appError');
const factory = require('../controller/handlerFactory');

exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);
