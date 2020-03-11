const createJob = ({
  jobModel,
  db,
  eventEmitter,
  eventTypes,
  utils
}) =>
  async ({
    type,
    startDate,
    endDate,
    schedule,
    details,
    date
  }) => {
    const job = await jobModel.createJob({db, utils})({
      type,
      startDate,
      endDate,
      schedule,
      details,
      date
    });

    eventEmitter.emit(eventTypes.SCHEDULE_JOB, job);
  };

const getJobs = ({
  jobModel,
  db
}) =>
  async ({
    limit,
    skip
  }) => {
    const result = await jobModel.getJobs({
      db
    })({
      limit,
      skip
    });

    return result;
  };

const createLog = ({
  jobModel,
  db
}) => ({
  type,
  details
}) => jobModel.createLog({ db })({
  type,
  details
});

module.exports = {
  createLog,
  createJob,
  getJobs
};