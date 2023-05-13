const execa = require('execa');
const { watch, series } = require('gulp');
const path = require('path');
const rimraf = require('rimraf');

function clean(cb) {
  const jsPath = path.resolve(__dirname, './lib');
  rimraf(jsPath, err => !err && cb());
}

function compile() {
  return execa('pnpm', ['compile'], { stdio: 'inherit' });
}

function start() {
  return execa('pnpm', ['start:container'], { stdio: 'inherit' });
}

module.exports.default = function () {
  const srcPath = path.resolve(__dirname, './src');
  watch(srcPath, { ignoreInitial: false }, series(clean, compile, start));
};
