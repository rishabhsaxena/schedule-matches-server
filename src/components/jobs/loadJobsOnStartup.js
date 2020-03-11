module.exports = async ({
  eventEmitter,
  eventTypes,
  api,
  utils,
  moment
}) => {
  let shouldFetchMore = true;
  let skip = 0;
  while (shouldFetchMore) {
    const { data: results } = await api.jobs.getJobs({ params: { limit: 10000, skip } });

    if (results.length < 10000) shouldFetchMore = false;
    for (result of results) {
      let job = utils.toCamelCase(result, "camel-case")

      if (!job.endDate || moment(job.endDate).isAfter(moment())) {
        eventEmitter.emit(eventTypes.SCHEDULE_JOB, job);
      }
    }
  }
};