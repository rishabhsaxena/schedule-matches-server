const createJob = ({
  db,
  utils
}) => async ({
  type,
  startDate,
  endDate,
  schedule,
  date,
  details
}) => {
  const job = await db.oneOrNone(`
    INSERT INTO jobs (
      type,
      start_date,
      end_date,
      schedule,
      date,
      details
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    RETURNING *
  `, [
    type,
    startDate,
    endDate,
    schedule,
    date,
    details
  ]);

  return utils.toCamelCase(job);
};

const getJobs = ({ db }) => async ({
  limit = 10000,
  skip = 0
}) => {
  const result = await db.any(`
    SELECT * FROM jobs ORDER BY id LIMIT $1 OFFSET $2
  `, [limit, skip]);

  return result;
}

const createLog = ({ db }) => ({
  type,
  details
}) => db.none(`
  INSERT INTO job_logs (type, details)
  VALUES ($1, $2)
`, [type, details]);

module.exports = {
  createJob,
  getJobs,
  createLog
};
