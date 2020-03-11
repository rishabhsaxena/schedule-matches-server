module.exports = iocContainer => (req, res, next) => {
  if (!req.user) return next(new iocContainer.errors.Unauthorised("UNAUTHORISED"));
  next();
};