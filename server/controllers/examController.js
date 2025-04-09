const Exam = require('../models/Exam');
const Score = require('../models/Score');
const User = require('../models/User');

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new exam
// @route   POST /api/exams
// @access  Private (Admin only)
exports.createExam = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create exams'
      });
    }
    
    const exam = await Exam.create(req.body);
    
    res.status(201).json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add student exam score
// @route   POST /api/exams/scores
// @access  Private (Admin only)
exports.addScore = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add scores'
      });
    }
    
    const { studentId, examId, score, outOf } = req.body;
    
    // Find student by studentId
    const student = await User.findOne({ studentId });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if exam exists
    const exam = await Exam.findById(examId);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    // Calculate percentile (simplified for this example)
    const percentile = (score / outOf) * 100;
    
    // Create score record
    const scoreRecord = await Score.create({
      student: student._id,
      exam: exam._id,
      score,
      outOf,
      percentile
    });
    
    res.status(201).json({
      success: true,
      data: scoreRecord
    });
  } catch (error) {
    console.error('Add score error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get student scores
// @route   GET /api/exams/scores
// @access  Private
exports.getStudentScores = async (req, res) => {
  try {
    const scores = await Score.find({ student: req.user.id })
      .populate('exam')
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: scores.length,
      data: scores
    });
  } catch (error) {
    console.error('Get student scores error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};