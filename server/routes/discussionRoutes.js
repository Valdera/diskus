const express = require('express');
const discussionController = require('../controller/discussionController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/search', discussionController.searchDiscussion);
router.get('/popular', discussionController.getPopular);

router
  .route('/')
  .get(discussionController.getAllDiscussions)
  .post(authController.protect, discussionController.createDiscussion);

router
  .route('/:id')
  .get(discussionController.getDiscussion)
  .patch(
    authController.protect,
    discussionController.uploadDiscussionImage,
    discussionController.uploadStorageDiscussion,
    discussionController.updateDiscussion
  )
  .delete(authController.protect, discussionController.deleteDiscussion);

router.patch(
  '/upvote/:id',
  authController.protect,
  discussionController.upvoteDiscussion
);
router.patch(
  '/downvote/:id',
  authController.protect,
  discussionController.downvoteDiscussion
);

module.exports = router;
