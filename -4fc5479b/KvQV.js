const {scheduleJob} = require('node-schedule')

const date = new Date(new Date().getTime() + 5000)
scheduleJob(date, () => {
  console.log('Task executed')
})