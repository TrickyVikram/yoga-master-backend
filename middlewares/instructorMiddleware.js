exports.isInstructor = (req, res, next) => {
    // Check if the user has instructor role
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  };
  