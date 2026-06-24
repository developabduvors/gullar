// Entrypoint — serverni ishga tushiradi va cron job'larni yoqadi.
const app = require('./app');
const env = require('./config/env');
const reminderJob = require('./jobs/reminder.job');

app.listen(env.port, () => {
  console.log(`🌹 Server ishlayapti: http://localhost:${env.port}`);
  console.log(`   Health check:     http://localhost:${env.port}/api/health`);
  reminderJob.start(); // tadbir eslatmalari cron'i
});
