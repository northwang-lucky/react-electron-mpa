const execa = require('execa');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

(async function main() {
  const prodConfigPath = path.resolve(__dirname, '../config/rspack.prod.js');
  const options = ['--config', prodConfigPath];
  if (process.env.NEED_REPORT === '1') {
    options.push('--analyze');
  }
  const originOutputPath = path.resolve(__dirname, '../dist');
  const outputPath = path.resolve(__dirname, '../../../dist/view');
  try {
    await execa('rspack', options, { stdio: 'inherit', cleanup: true });
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    fs.renameSync(originOutputPath, outputPath);
  } catch (err) {
    rimraf(originOutputPath, () => console.error(err));
  }
})();
