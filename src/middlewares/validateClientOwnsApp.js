const validateClientOwnsApp = ({ models, db, errors }) => async (req, _res, next) => {
  if (!req.body.appId) return next();

  const clientId = req.body.clientId;
  if (!clientId) return next(new errors.ValidationError("INVALID_CLIENT_ID"));

  const hasAccess = await models.client.checkIfAppExistsForClient(db)({ 
    clientId,
    appId: req.body.appId
  });

  if (!hasAccess) {
    next(new errors.ValidationError("APP_DOESNT_EXIST_FOR_CLIENT"));
  } else {
    next();
  }
};

module.exports = validateClientOwnsApp;
