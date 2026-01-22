exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

exports.committeeOrAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "committee") {
    return res.status(403).json({ message: "Committee access only" });
  }
  next();
};
