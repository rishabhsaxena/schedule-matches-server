const expressErrorHandler = (prefix) => function (error, req, res, next) {
  console.log(error);

  if (error.message === 'INVALID_JSON_BODY_PARSER') {
    return res.status(400).send('bad json');
  }

  if (error.code === 'EBADCSRFTOKEN' && !res.headersSent) {
    return res.status(403).send('INVALID_REQUEST_TOKEN');
  }

  if (error.name === 'VALIDATION_ERROR' && !res.headersSent) {
    return res.status(error.code).json(error.response);
  }

  // const query = error.query ? error.query.toString() : null;
  // const code = error.code || null;
  const source = error.DB_ERROR ? `${prefix}_DB_ERROR` : `${prefix}_API_ERROR`;

  // const message = JSON.stringify({
  //   message: error.message,
  //   url: req.url,
  //   method: req.method
  // });

  // db.logs.logError(message, error.stack, req.id, req.currentUser && req.currentUser.id, source, query, code);

  console.log(source, error);

  if (!res.headersSent) {
    res.status(500).send('An error occured');
  }
};

module.exports = expressErrorHandler;
