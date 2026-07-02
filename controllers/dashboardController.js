const Student = require('../models/Student');

const getDashboardSummary = async (req, res, next) => {
  try {
    const students = await Student.find({});

    const totalStudents = students.length;
    const activeStudents = students.filter((student) => student.status === 'active').length;
    const atRiskStudents = students.filter((student) => student.status === 'at-risk').length;
    const droppedStudents = students.filter((student) => student.status === 'dropped').length;

    const totalCourses = students.reduce((sum, student) => sum + (student.completedCourses || 0), 0);
    const completedLessons = students.reduce((sum, student) => sum + (student.completedLessons || 0), 0);

    const averageEngagement = totalStudents
      ? students.reduce((sum, student) => sum + (student.engagement || 0), 0) / totalStudents
      : 0;

    const averageRiskScore = totalStudents
      ? students.reduce((sum, student) => sum + (student.riskScore || 0), 0) / totalStudents
      : 0;

    res.status(200).json({
      totalStudents,
      activeStudents,
      atRiskStudents,
      droppedStudents,
      totalCourses,
      completedLessons,
      averageEngagement: Number(averageEngagement.toFixed(2)),
      averageRiskScore: Number(averageRiskScore.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardSummary
};
