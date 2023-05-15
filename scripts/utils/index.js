const rimraf = require('rimraf');

/** @typedef {import('execa').ExecaChildProcess<string>} ExecaChildProcess */

/** @param {ExecaChildProcess[]} cps */
function quit(...cps) {
  for (let i = 0; i < cps.length; i++) {
    const cp = cps[i];
    if (process.platform === 'win32') {
      execa('taskkill', ['/f', '/t', '/pid', cp.pid], { stdin: 'ignore' });
    } else {
      cp.kill('SIGTERM');
    }
  }
}

/** @param {(input: string) => Promise<void> | void} cb */
function onQuit(cb) {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', data => cb(data.toString().trim()));
}

/** @param {string} pathname */
function del(pathname) {
  return new Promise((resolve, reject) => {
    rimraf(pathname, err => (err ? reject(err) : resolve()));
  });
}

module.exports = { quit, onQuit, del };
