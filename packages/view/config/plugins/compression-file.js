const compressing = require('compressing');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class CompressionFilePlugin {
  name = 'CompressionFilePlugin';
  /** @type {RegExp} */
  tester;

  /** @param {{ test: RegExp }} options */
  constructor({ test }) {
    this.tester = test;
  }

  /** @param {string} rootPath */
  compressRecursively(rootPath) {
    const files = fs.readdirSync(rootPath);
    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const filePath = path.resolve(rootPath, filename);
      const stats = fs.lstatSync(filePath);
      if (stats.isDirectory()) {
        this.compressRecursively(filePath);
        continue;
      }
      if (!this.tester.test(filename)) {
        continue;
      }
      // gzip
      const targetPath = `${filePath}.gz`;
      compressing.gzip
        .compressFile(filePath, targetPath)
        .then(() => console.log(`${chalk.green('[gzip]')} ${chalk.yellow(filePath)} => ${chalk.yellow(targetPath)}`))
        .catch(console.error);
    }
  }

  /** @param {import('@rspack/core/dist/compiler').Compiler} compiler */
  apply(compiler) {
    compiler.hooks.afterDone.tap(this.name, stats => {
      if (!this.tester) {
        return;
      }
      const { path: outputPath } = stats.compilation.outputOptions;
      console.log();
      this.compressRecursively(outputPath);
    });
  }
}

module.exports = CompressionFilePlugin;
