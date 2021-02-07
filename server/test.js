const firebaseConfig = {
  apiKey: 'AIzaSyADtA8EznNpI-GLQOdMkFeMMQ9J2S3Gf0s',
  authDomain: 'diskus-app.firebaseapp.com',
  projectId: 'diskus-app',
  storageBucket: 'diskus-app.appspot.com',
  messagingSenderId: '1011498715905',
  appId: '1:1011498715905:web:3eea6c700bdb139942a900',
  measurementId: 'G-E3N9290NP9'
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.app().storage('gs://diskus-app.appspot.com/');
const express = require('express');
const app = express();
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');

const storage = googleStorage({
  projectId: '<Firebase Project ID',
  keyFilename: '<path to service accounts prviate key JSON>'
});

const bucket = storage.bucket('<Firebase Storage Bucket URL');
