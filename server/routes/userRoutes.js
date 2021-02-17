const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.protect);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserImage,
  userController.uploadStorageUser,
  userController.updateMe
);
router.get(
  '/discussion',
  authController.protect,
  userController.getMyDiscussion
);

router.patch('/follow/:id', authController.protect, userController.follow);
router.patch('/unfollow/:id', authController.protect, userController.unfollow);
router.get('/follow', authController.protect, userController.getFollowing);
router.get('/leaderboard', userController.getLeaderboard);
// router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

module.exports = router;
