module.exports = (iocContainer) => {
  const {
    express,
    jobValidators,
    jobController,
    mw
  } = iocContainer;
  const router = express.Router();

  router.post(
    '',
    mw.validationMw(iocContainer)([jobValidators.createJob]),
    async (req, res) => {    
      const result = await jobController.createJob(iocContainer)(req.body);
      res.json(result);
  });

  router.get(
    '',
    async (req, res) => {
      const result = await jobController.getJobs(iocContainer)(req.query);
      res.json(result);
    }
  );

  router.post(
    '/logs',
    mw.validationMw(iocContainer)([jobValidators.createLog]),
    async (req, res) => {
      const result = await jobController.createLog(iocContainer)(req.body);
      res.json(result);
  });

  return router;
};