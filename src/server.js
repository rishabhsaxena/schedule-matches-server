process.env.NODE_CONFIG_DIR = `${__dirname}/../../config`;
const {createHttpServer, debug, mw: commonMw} = require('node-commons');
const router = require('./router');
const createApi = require('./api');
const express = require('express');
const config = require('config');
const db =  require('./db');
const middlewares =  require('./middlewares');
const utils = require('../common/src/utils');
const constants = require('./constants');
const errors = require('./errors');
const cors = require('cors');
const jobTypes = require('../common/src/jobTypes');
const { types, eventEmitter } = require('./events/eventEmitter');
const EventHandler = require('./events/EventHandler');
const JobScheduler = require('./components/jobs/JobScheduler');
const loadJobsOnStartup = require('./components/jobs/loadJobsOnStartup');
const moment = require('moment');

const wrapExpressMiddleware = require('wrap-express-middleware');
wrapExpressMiddleware();

const port = config.get('JOBS_SCHEDULER_SERVER_PORT');

const mw = {
  ...commonMw,
  ...middlewares
};

const api = createApi({
  baseURL: config.get("PLATFORM_SERVER_HOST"),
  jobsBaseURL: config.get("JOBS_SERVER_HOST")
});

let jobsScheduler;
const iocContainer = {
  db,
  config,
  express,
  mw,
  errors,
  utils,
  constants,
  api,
  eventTypes: types,
  eventEmitter,
  jobTypes,
  JobScheduler,
  moment
};

jobScheduler = new JobScheduler(iocContainer);
const eventHandler = new EventHandler({
  ...iocContainer,
  jobScheduler
});
eventEmitter.addListener(eventHandler.handle);

const server = createHttpServer(
    'server',
    [
      cors(),
      mw.attachUserToRequest(iocContainer),
      router(iocContainer),
      mw.errorHandler('API_SERVER')
    ]);

server.listen(port, () => {
  loadJobsOnStartup(iocContainer);
  debug.info(`Server started on port = ${port}`);
});