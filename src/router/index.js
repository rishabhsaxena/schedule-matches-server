const getJobsRouter = require("../components/jobs");

module.exports= function (iocContainer) {
  const {
    express,
    // mw
  } = iocContainer;

  const router = express.Router();

  // router.use(mw.validateChecksum(iocContainer));
  // router.use(mw.validateClientOwnsApp(iocContainer));

  router.use(getJobsRouter(iocContainer));

  return router;
};
