const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  thumbnail: {
    type: String,
    default: 'no-photo.jpg'
  },
  duration: {
    type: String,
    required: [true, 'Please add course duration']
  },
  level: {
    type: String,
    required: [true, 'Please add course level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);