const crypto = require("crypto");

const validateChecksum = iocContainer => async (req, _res, next) => {
  const {
    models,
    db
  } = iocContainer;

  if (!req.body.clientId) return next();

  const client = await models.client.getClientById(db)(req.body);
  if (!client) return next(new iocContainer.errors.ValidationError('INVALID_CLIENT_ID'));
  const { secret } = client;
  let data = '';

  Object.keys(req.body).forEach(field => {
    if (field === "hash") return ;

    let value = req.body[field];
    data = `${data}${field}${value}`;
  });

  data = `${data}${secret}`;

  const result = crypto.createHash('md5')
    .update(data)
    .digest('hex') === req.body.hash;

  console.log({
    hashBody: req.body.hash,
    hashCalc: crypto.createHash('md5')
    .update(data)
    .digest('hex'),
    match: req.body.Hash === crypto.createHash('md5')
    .update(data)
    .digest('hex')
  })

  if (!result) {
    return next(new iocContainer.errors.ValidationError('INVALID_HASH'));
  }

  next();
}

module.exports = validateChecksum;
