const express = require('express');
const discussionController = require('../controller/discussionController');

const router = express.Router();

router
  .route('/:id')
  .get(discussionController.getDiscussion)
  .patch(discussionController.updateDiscussion)
  .delete(discussionController.deleteDiscussion);

router
  .route('/')
  .get(discussionController.getAllDiscussions)
  .post(discussionController.createDiscussion);

module.exports = router;