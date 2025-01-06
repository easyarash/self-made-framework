const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

class CronJobHandler {
  constructor() {
    this.jobs = new Map(); // Store active jobs
    this.loadJobs();
  }

  loadJobs() {
    const jobFiles = fs
      .readdirSync(`${__dirname}/../crons`)
      .filter((file) => file.endsWith(".js") && file !== "index.js");

    jobFiles.forEach((file) => {
      const jobPath = path.join(__dirname, ".." ,"crons", file);
      const { schedule, task } = require(jobPath);
      this.scheduleJob(file, schedule, task);
    });
  }

  scheduleJob(name, schedule, task) {
    if (!cron.validate(schedule)) {
      console.error(`Invalid schedule format for job: ${name}`);
      return;
    }

    const job = cron.schedule(schedule, task, { scheduled: true });
    this.jobs.set(name, job);
    console.log(`Scheduled job: ${name} with schedule: ${schedule}`);
  }

  reloadJobs() {
    console.log("Reloading jobs...");
    this.stopAllJobs();
    this.loadJobs();
  }

  stopJob(name) {
    if (this.jobs.has(name)) {
      this.jobs.get(name).stop();
      this.jobs.delete(name);
      console.log(`Stopped job: ${name}`);
    } else {
      console.error(`Job ${name} not found.`);
    }
  }

  stopAllJobs() {
    this.jobs.forEach((job, name) => {
      job.stop();
      console.log(`Stopped job: ${name}`);
    });
    this.jobs.clear();
  }
}

module.exports = new CronJobHandler();
