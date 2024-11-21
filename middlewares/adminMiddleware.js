
  exports.authAdmin = (req, res, next) => {
     // Check if the user has admin role
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
  