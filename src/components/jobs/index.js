const jobController = require("./jobController");
const jobModel = require("./jobModel");
const jobRouter = require("./jobRouter");
const jobValidators = require("./jobValidators");

const getClientRouter = (iocContainer) => {
  return jobRouter({
    ...iocContainer,
    jobController,
    jobModel,
    jobValidators
  });
};

module.exports = getClientRouter;
