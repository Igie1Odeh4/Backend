const Progress = require('../models/Progress');

const updateProgress = async (req, res, next) => {
  try {
    const { student, course, completedLessons, percentageCompleted, lastAccessedLesson } = req.body;

    let progress = await Progress.findOne({ student, course });

    if (!progress) {
      progress = await Progress.create({
        student,
        course,
        completedLessons: completedLessons || [],
        percentageCompleted: percentageCompleted || 0,
        lastAccessedLesson
      });
    } else {
      progress.completedLessons = completedLessons || progress.completedLessons;
      progress.percentageCompleted = percentageCompleted ?? progress.percentageCompleted;
      progress.lastAccessedLesson = lastAccessedLesson || progress.lastAccessedLesson;
      await progress.save();
    }

    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

const getStudentProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({ student: req.params.studentId })
      .populate('course', 'title category')
      .populate('completedLessons', 'title');

    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

const getCourseProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({ course: req.params.courseId })
      .populate('student', 'name email')
      .populate('completedLessons', 'title');

    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProgress,
  getStudentProgress,
  getCourseProgress
};
