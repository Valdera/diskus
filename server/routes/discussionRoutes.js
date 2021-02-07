const express = require('express');
const discussionController = require('../controller/discussionController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .get('/search', discussionController.searchDiscussion);


router
  .route('/:id')
  .get(discussionController.getDiscussion)
  .patch(authController.protect, discussionController.updateDiscussion)
  .delete(authController.protect, discussionController.deleteDiscussion);

router
  .route('/')
  .get(discussionController.getAllDiscussions)
  .post(authController.protect, discussionController.createDiscussion);

module.exports = router;
