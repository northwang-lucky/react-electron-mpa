const loading = require('../utils/loading');

class LoadingPlugin {
  /** @param {import('webpack').Compiler} compiler */
  apply(compiler) {
    compiler.hooks.compilation.tap('LoadingPlugin', compilation => {
      compilation.hooks.buildModule.tap('LoadingPlugin', () => {
        loading.start('Compiling...\n');
      });
      compilation.hooks.finishModules.tap('LoadingPlugin', () => {
        loading.stop();
      });
      compilation.hooks.failedModule.tap('LoadingPlugin', () => {
        loading.stop();
      });
      compilation.hooks.rebuildModule.tap('LoadingPlugin', () => {
        loading.stop();
        loading.start('Compiling...\n');
      });
      return true;
    });
    compiler.hooks.shutdown.tapAsync('LoadingPlugin', entry => {
      loading.stop();
      entry();
    });
  }
}

module.exports = LoadingPlugin;
