const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');

exports.upvote = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        upvote: mongoose.Types.ObjectId(req.user.id)
      },
      $pull: { downvote: mongoose.Types.ObjectId(req.user.id) }
    });

    if (!doc.upvote.includes(mongoose.Types.ObjectId(req.user.id))) {
      doc.upvote.push(mongoose.Types.ObjectId(req.user.id));
    }
    doc.downvote.pop(mongoose.Types.ObjectId(req.user.id));

    console.log(doc.upvote.length - doc.downvote.length);

    const result = await Model.findByIdAndUpdate(req.params.id, {
      vote: doc.upvote.length - doc.downvote.length
    });

    result.vote = doc.upvote.length - doc.downvote.length;

    res.status(200).json({
      status: 'success',
      data: {
        doc: result
      }
    });
  });

exports.downvote = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        downvote: mongoose.Types.ObjectId(req.user.id)
      },
      $pull: { upvote: mongoose.Types.ObjectId(req.user.id) }
    });

    if (!doc.downvote.includes(mongoose.Types.ObjectId(req.user.id))) {
      doc.downvote.push(mongoose.Types.ObjectId(req.user.id));
    }
    doc.upvote.pop(mongoose.Types.ObjectId(req.user.id));

    console.log(doc.upvote.length - doc.downvote.length);

    const result = await Model.findByIdAndUpdate(req.params.id, {
      vote: doc.upvote.length - doc.downvote.length
    });

    result.vote = doc.upvote.length - doc.downvote.length;

    res.status(200).json({
      status: 'success',
      data: {
        doc: result
      }
    });
  });
