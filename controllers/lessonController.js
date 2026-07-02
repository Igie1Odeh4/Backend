const Lesson = require('../models/Lesson');

const createLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

const getLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find().sort({ order: 1 });
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};

const getLessonById = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      const error = new Error('Lesson not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(lesson);
  } catch (error) {
    next(error);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!lesson) {
      const error = new Error('Lesson not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(lesson);
  } catch (error) {
    next(error);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      const error = new Error('Lesson not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson
};
