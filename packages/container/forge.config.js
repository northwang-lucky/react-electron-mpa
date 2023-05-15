const path = require('path');

module.exports = {
  packagerConfig: {
    out: path.resolve(__dirname, './dist'),
    overwrite: true,
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
};
