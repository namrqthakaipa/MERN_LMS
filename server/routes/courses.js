const express = require('express');
const { 
  getCourses, 
  getCourse, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  enrollCourse,
  getEnrolledCourses
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getCourses)
  .post(protect, createCourse);

router.route('/enrolled')
  .get(protect, getEnrolledCourses);

router.route('/:id')
  .get(protect, getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

router.route('/:id/enroll')
  .post(protect, enrollCourse);

module.exports = router;