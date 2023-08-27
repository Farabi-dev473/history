const cron = require('node-cron');

// Date you want to schedule the task
const scheduledDate = new Date(new Date().getTime() + 10000);

// Calculate the time difference between the current date and the scheduled date
const timeDiff = scheduledDate.getTime() - Date.now();

// Schedule the task to run once at the scheduled date
cron.schedule(new Date(Date.now() + timeDiff), () => {
  // This function will be executed at the scheduled date
  console.log('Task executed on:', new Date());
});
