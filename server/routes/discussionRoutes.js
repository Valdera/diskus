const express = require('express');
const discussionController = require('../controller/discussionController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/:id')
  .get(discussionController.getDiscussion)
  .patch(discussionController.updateDiscussion)
  .delete(discussionController.deleteDiscussion);

router
  .route('/')
  .get(discussionController.getAllDiscussions)
  .post(authController.protect, discussionController.createDiscussion);

module.exports = router;
