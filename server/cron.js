const list = require('../database/db-queries/list.js')
const task = require('../database/db-queries/task.js')
var CronJob = require('cron').CronJob;

var job = new CronJob('0 * * * *', function() {
  list.reorderListOrder()
  task.reorderTaskOrder()
  console.log('~******** Cron worker ********~')
  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);