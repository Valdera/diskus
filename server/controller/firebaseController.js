const catchAsync = require('../utils/catchAsync');
const firebase = require('../utils/firebase');
const AppError = require('../utils/appError');

exports.uploadStorageFirebase = Model =>
  catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    try {
      const newFileName = `${Model.modelName}_${
        req.file.originalname.split('.')[0]
      }_${Date.now()}`;

      const token = 'fc4f4ab3-50c0-450a-880e-8b888616346c';

      const blob = firebase.bucket.file(newFileName);

      const blobWriter = blob.createWriteStream({
        // resumable: false,

        metadata: {
          contentType: req.file.mimetype,
          metadata: { firebaseStorageDownloadTokens: token }
        }
      });

      blobWriter.on('error', err => {
        console.log(err);
      });

      await blobWriter.on('finish', () => {
        const url = `https://firebasestorage.googleapis.com/v0/b/diskus-app.appspot.com/o/${newFileName}?alt=media&token=${token}`;
        req.body.image = url;
        next();
      });

      blobWriter.end(req.file.buffer);
    } catch (error) {
      return next(new AppError(error, 404));
    }
  });
