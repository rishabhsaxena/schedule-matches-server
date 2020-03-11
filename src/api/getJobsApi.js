const getJobsApi = ({ get, post }) => {
  const getUrl = url => `/${url}`;

  const getJobs = ({ params }) => get({ url: getUrl(''), params });
  const createLog = ({ data }) => post({ url: getUrl('logs'), data }); 

  return {
    getJobs,
    createLog
  };
};

module.exports = getJobsApi;