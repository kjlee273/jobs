var CronJob = require('cron').CronJob;

var jobs = loadJobs();
var cronJobs = {};

for (var i in jobs) {
    var job = jobs[i];

    var cronJob = new CronJob({
        cronTime: job.cronTime,
        onTick: (function(command) {
            return function() {
                console.log(command);
            };
        })(job.command),
        start: true
    });

    cronJobs[job.id] = cronJob;
}

function Job(id, cronTime, command) {
    this.id = id;
    this.cronTime = cronTime;
    this.command = command;

    return this;
}

function loadJobs() {
    return [new Job('job0', '* * * * * *', 'ls'), new Job('job1', '*/5 * * * * *', 'free')];
}
