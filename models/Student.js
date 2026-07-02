const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  riskScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'at-risk', 'dropped'],
    default: 'active'
  },
  engagement: {
    type: Number,
    default: 100
  },
  inactiveDays: {
    type: Number,
    default: 0
  },
  completedCourses: {
    type: Number,
    default: 0
  },
  completedLessons: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
