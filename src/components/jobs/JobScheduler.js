const schedule = require('node-schedule');
const moment = require('moment');

class JobsScheduler {
  constructor({
    api,
    db
  }) {
    this.db = db;
    this.api = api;
    this.handlerByTypes = {
      // CREATE_MATCH: this.handleCreateMatch,
      PAYOUT: this.handlePayout
    };
  }

  scheduleJob = (job) => {
    let options = {}

    if (job.startDate) {
      options = {
        start: job.startDate,
        rule: job.schedule
      }
      if (job.endDate) {
        options.end = job.endDate;
      }

    } else {
      options = new Date(job.date);
    }

    schedule.scheduleJob(options, () => this.handleJob(job));
  }

  handleJob = (job) => {
    this.handlerByTypes[job.type](job);
  }

  handlePayout = async (job) => {
    try {
      await this.api.tournaments.payout({ data: job.details });
      await this.api.jobs.createLog({
        data: {
          type: 'PAYOUT',
          details: job.details
        }
      });
    } catch (e) {
      const { error = "" } = e.response && e.response.data;
      if (error === "AWAITING_RESULT_FOR_PLAYERS") {
        this.scheduleJob({
          ...job,
          date: moment().add(30, 'minutes')
        });
      }
    }
  }

  // handleCreateMatch = async (job) => {
  //   const { data: createdMatch } = await this.api.tournaments.createScheduledMatch({ data: job });
  //   await api.jobs.createLog({
  //     data: {
  //       type: 'CREATE_MATCH',
  //       details: { matchId: createdMatch.id }
  //     }
  //   });
  //   if (createdMatch.endTime) {
  //     this.scheduleJob({
  //       type: 'PAYOUT',
  //       date: createdMatch.endTime,
  //       details: { matchId: createdMatch.id }
  //     });
  //   }
  // }
}

module.exports = JobsScheduler;