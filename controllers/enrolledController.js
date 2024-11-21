const Enrolled = require('../models/enrolledModel');

// Get enrolled classes for a user
exports.getEnrolledClasses = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const enrolledClasses = await Enrolled.find({ userId });
    res.status(200).json(enrolledClasses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrolled classes' });
  }
};
