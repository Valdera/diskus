const express = require('express');
const commentController = require('../controller/commentController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

module.exports = router;
