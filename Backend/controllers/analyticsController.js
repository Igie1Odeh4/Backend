const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

const getAnalytics = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalLessons, totalProgressRecords] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Lesson.countDocuments(),
      Progress.countDocuments()
    ]);

    res.status(200).json({
      totalUsers,
      totalCourses,
      totalLessons,
      totalProgressRecords
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
};

module.exports = {
  getAnalytics
};
