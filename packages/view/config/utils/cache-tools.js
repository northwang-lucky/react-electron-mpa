const fs = require('fs');
const path = require('path');

/** @typedef {import('@rspack/core/dist/config/builtins').BuiltinsHtmlPluginConfig} HtmlPluginConfig */

const { DEV_PAGES } = process.env;
const devPages = DEV_PAGES ? DEV_PAGES.split(',') : [];

function getAllPages() {
  const pagesPath = path.resolve(__dirname, '../../src/pages');
  return fs.readdirSync(pagesPath).filter(name => !name.startsWith('.'));
}

/** @param {string[]} devPages */
function build(devPages) {
  /** @type {Record<string, string>} */
  const entry = {};
  /** @type {HtmlPluginConfig[]} */
  const templates = [];
  for (const page of devPages) {
    entry[page] = path.resolve(__dirname, `../../src/pages/${page}/index.tsx`);
    templates.push({
      filename: `pages/${page}/index.html`,
      chunks: [page],
      template: path.resolve(__dirname, `../../src/pages/${page}/index.html`),
    });
  }
  return { entry, templates };
}

/** @param {'dev' | 'prod'} mode */
const getEntryAndTemplates = mode => {
  const allPages = getAllPages();
  return mode === 'prod' ? build(allPages) : build(devPages);
};

module.exports = { getAllPages, getEntryAndTemplates };
