const validationMw = iocContainer => (validators) => (req, res, next) => {
  const errors = [];
  validators.forEach(validator => {
    const result = validator(req.body);
    if (!!result.error) {
      errors.push(result.error);
    }
  });

  if (errors.length > 0) {
    next(new iocContainer.errors.ValidationError(errors));
  } else {
    next();
  }
};

module.exports = validationMw;
