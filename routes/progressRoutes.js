const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  updateProgress,
  getStudentProgress,
  getCourseProgress
} = require('../controllers/progressController');

router.post('/', protect, updateProgress);
router.get('/student/:studentId', protect, getStudentProgress);
router.get('/course/:courseId', protect, getCourseProgress);

module.exports = router;
