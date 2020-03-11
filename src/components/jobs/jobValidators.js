const Joi = require('@hapi/joi');

const createJobSchema = Joi.object().keys({
  type: Joi.string().required(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  schedule: Joi.string(),
  details: Joi.object(),
  date: Joi.string()
}).xor('schedule', 'date');

const createJob = data => Joi.validate(data, createJobSchema);

const createLogSchema = Joi.object().keys({
  type: Joi.string().required(),
  details: Joi.object()
});
const createLog = data => Joi.validate(data, createLogSchema);

module.exports = {
  createJob,
  createLog
};
