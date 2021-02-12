const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);
router.patch(
  '/updateMe',
  userController.uploadUserImage,
  userController.uploadStorageUser,
  userController.updateMe
);
router.get('/discussion', userController.getMyDiscussion);

router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);
router.get('/follow', userController.getFollowing);

// router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(userController.getUser)
  .patch(authController.restrictTo('admin'), userController.updateUser)
  .delete(authController.restrictTo('admin'), userController.deleteUser);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers);

module.exports = router;
