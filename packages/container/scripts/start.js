const execa = require('execa');
const { onQuit, quit } = require('../../../scripts/utils');

let restart = false;

/** @param {import('execa').ExecaChildProcess<string>[]} cps */
function listenQuit(...cps) {
  onQuit(input => {
    if (input === 'q') {
      quit(...cps);
      return;
    }
    if (input === 'rs') {
      quit(...cps);
      restart = true;
    }
  });

  let count = 0;
  const lastOne = () => {
    if (count !== cps.length) {
      return false;
    }
    count = 0;
    return true;
  };

  for (let i = 0; i < cps.length; i++) {
    const cp = cps[i];
    cp.catch(() => {}).finally(() => {
      count++;
      const isLastOne = lastOne();
      if (restart) {
        if (isLastOne) {
          restart = false;
          console.clear();
          start();
        }
        return;
      }
      if (isLastOne) {
        console.log('See you :)');
        process.exit();
      }
    });
  }
}

function start() {
  const gulp_cp = execa('gulp', {
    stdio: 'inherit',
    cleanup: true,
  });
  const electron_cp = execa('electron-forge', [process.cwd()], {
    stdio: 'inherit',
    cleanup: true,
    env: { NODE_ENV: 'development' },
  });
  listenQuit(gulp_cp, electron_cp);
}

(function main() {
  start();
})();
