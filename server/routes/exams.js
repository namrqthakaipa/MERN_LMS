const express = require('express');
const { 
  getExams, 
  createExam, 
  addScore, 
  getStudentScores 
} = require('../controllers/examController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getExams)
  .post(protect, createExam);

router.route('/scores')
  .get(protect, getStudentScores)
  .post(protect, addScore);

module.exports = router;