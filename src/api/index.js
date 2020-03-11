const createRequest = require("./createRequest");
const getTournamentsApi = require("./getTournamentsApi");
const getJobsApi = require("./getJobsApi");

const createApi = ({
  baseURL,
  jobsBaseURL
}) => {
  const request = createRequest({ baseURL });
  const jobsRequest = createRequest({ baseURL: jobsBaseURL });

  return {
    tournaments: getTournamentsApi(request),
    jobs: getJobsApi(jobsRequest),
  }
};

module.exports = createApi;
