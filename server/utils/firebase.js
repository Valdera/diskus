const admin = require('firebase-admin');

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    'diskus-app-firebase-adminsdk-vyecs-9c84fe019e.json'
  ),
  storageBucket: 'gs://diskus-app.appspot.com/'
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket
};
