const mongoose = require('mongoose');

const enrolledSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  enrollmentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrolled', enrolledSchema);
