class EventHandler {
  constructor ({
    jobScheduler
  }) {
    this.jobScheduler = jobScheduler;
  }

  handle = (notification) => {
    if (this[notification.type]) {
      this[notification.type](notification.type, notification.payload);
    }
  }

  scheduleJob = (type, payload) => {
    this.jobScheduler.scheduleJob(payload);
  }
}

module.exports = EventHandler;
