const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');

router.post('/', protect, authorize('admin', 'instructor'), createLesson);
router.get('/', protect, getLessons);
router.get('/:id', protect, getLessonById);
router.put('/:id', protect, authorize('admin', 'instructor'), updateLesson);
router.delete('/:id', protect, authorize('admin'), deleteLesson);

module.exports = router;
