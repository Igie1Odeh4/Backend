const Notification = require('../models/Notification');
const Student = require('../models/Student');

const createNotification = async (req, res, next) => {
  try {
    const { student, title, message, type, read = false } = req.body;

    const notification = await Notification.create({
      student,
      title,
      message,
      type,
      read
    });

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const { student, read } = req.query;
    const filter = {};

    if (student) {
      filter.student = student;
    }

    if (read !== undefined) {
      filter.read = read === 'true';
    }

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      const error = new Error('Notification not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

const bulkNudge = async (req, res, next) => {
  try {
    const {
      studentIds,
      title = 'Reminder',
      message = 'Please continue your learning journey.',
      type = 'nudge'
    } = req.body;

    let targetStudentIds = studentIds;

    if (!targetStudentIds || targetStudentIds.length === 0) {
      const students = await Student.find({}, '_id');
      targetStudentIds = students.map((student) => student._id);
    }

    if (!targetStudentIds || targetStudentIds.length === 0) {
      return res.status(200).json([]);
    }

    const notifications = await Promise.all(
      targetStudentIds.map((studentId) =>
        Notification.create({
          student: studentId,
          title,
          message,
          type
        })
      )
    );

    res.status(201).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  bulkNudge
};
