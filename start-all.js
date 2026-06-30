const concurrently = require('concurrently');
const path = require('path');

const { result } = concurrently(
  [
    { command: 'npm run dev', name: 'frontend', cwd: path.join(__dirname, 'frontend'), prefixColor: 'cyan' },
    { command: 'npm run dev', name: 'backend', cwd: path.join(__dirname, 'backend'), prefixColor: 'green' }
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3,
  }
);

result.then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
