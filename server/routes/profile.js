const express = require('express');
const { 
  updateProfile, 
  uploadPhoto, 
  uploadCertificate, 
  getProfile 
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.route('/photo')
  .put(protect, uploadPhoto.single('photo'), uploadPhoto);

router.route('/certificate')
  .post(protect, uploadPhoto.single('certificate'), uploadCertificate);

module.exports = router;