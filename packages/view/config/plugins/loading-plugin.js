const loading = require('../utils/loading');

class LoadingPlugin {
  /** @param {import('webpack').Compiler} compiler */
  apply(compiler) {
    compiler.hooks.compilation.tap('LoadingPlugin', compilation => {
      compilation.hooks.buildModule.tap('LoadingPlugin', () => {
        loading.start('Compiling...\n');
      });
    });
    compiler.hooks.failed.tap('LoadingPlugin', () => {
      loading.stop();
    });
    compiler.hooks.done.tapAsync('LoadingPlugin', (_, entry) => {
      loading.stop();
      entry();
    });
    compiler.hooks.shutdown.tapAsync('LoadingPlugin', entry => {
      loading.stop();
      entry();
    });
  }
}

module.exports = LoadingPlugin;
