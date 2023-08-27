const cron = require('node-cron');

// Date you want to schedule the task
const scheduledDate = new Date(new Date().getTime() + 10000);

// Extract the minute, hour, day, month, and year from the scheduled date
// Extract the minute, hour, day, month, and year from the scheduled date
const minute = scheduledDate.getMinutes();
const hour = scheduledDate.getHours();
const day = scheduledDate.getDate();
const month = scheduledDate.getMonth() + 1; // Months are zero-based
const year = scheduledDate.getFullYear();

// Create the cron pattern using the extracted values
const cronPattern = `${minute} ${hour} ${day} ${month} *`;

// Schedule the task to run once at the scheduled date
cron.schedule(cronPattern, () => {
  // This function will be executed at the scheduled date
  console.log('Task executed on:', new Date());
});
