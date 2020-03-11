module.exports = ({
  db,
  models
}) => async (req, res, next) => {  
  const sessionId = req.cookies.esports__sess;
  if (!sessionId) return next();

  const user = await models.player.getPlayerBySessionToken(db)({ token: sessionId });
  req.user = user;
  next();
};
