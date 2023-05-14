const sass = require('sass');
const { DtsCreator } = require('typed-css-modules/lib/dts-creator');

const creator = new DtsCreator({
  camelCase: true,
  EOL: '\n',
});

module.exports = function (originContent) {
  const { css } = sass.compileString(originContent);
  creator.create(this.resourcePath, css).then(content => {
    content.writeFile(formatted => formatted.replace(/\s$/, '').replace(/\r\n/g, '\n'));
  });
  return css;
};
