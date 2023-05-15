const chalk = require('chalk');
const execa = require('execa');
const fs = require('fs');
const inquirer = require('inquirer');
const InquirerSearchCheckbox = require('inquirer-search-checkbox');
const path = require('path');
const { onQuit, quit } = require('../../../scripts/utils');
const { getAllPages } = require('../config/utils/cache-tools');

inquirer.registerPrompt('search-checkbox', InquirerSearchCheckbox);

let restart = false;

/** @param {string[]} allPages */
async function selectDevPages(allPages) {
  /** @type {string[]} */
  const cacheDirPath = path.resolve(__dirname, '../.cache');
  const cacheDirExisted = fs.existsSync(cacheDirPath);
  const cachePagesFilePath = path.resolve(__dirname, '../.cache/cache-pages.json');
  const cachePagesFileExisted = fs.existsSync(cachePagesFilePath);

  const cachePages = [];
  if (cachePagesFileExisted) {
    const content = fs.readFileSync(cachePagesFilePath, { encoding: 'utf-8' });
    /** @type {string[]} */
    const pages = JSON.parse(content);
    cachePages.push(...pages);
    console.log(chalk.green('The dev pages you selected last time:'));
    const pageList = cachePages.reduce((rst, page, index) => {
      const order = index + 1;
      const previous = rst ? `${rst}\n` : rst;
      return chalk.yellow(`${previous}${order}. ${page}`);
    }, '');
    console.log(pageList, '\n');
  }

  const questions = [
    {
      name: 'pagesMode',
      when: cachePagesFileExisted,
      type: 'list',
      message: 'Select pages mode (no selections means all pages):',
      choices: [
        {
          name: 'Reselect pages',
          value: 1,
        },
        {
          name: 'Use pages selected last time',
          value: 2,
        },
        {
          name: 'Select pages based on the last selection',
          value: 3,
        },
      ],
    },
    {
      name: 'devPages',
      when: ({ pagesMode }) => pagesMode !== 2,
      type: 'search-checkbox',
      message: 'Select pages you want to develop:',
      choices: ({ pagesMode }) => {
        return allPages.map(page => {
          const checked = pagesMode === 3 && cachePages.includes(page);
          return { value: page, checked };
        });
      },
    },
  ];

  /** @type {{ pagesMode: 1 | 2 | 3; devPages: string[] }} */
  const { pagesMode, devPages } = await inquirer.prompt(questions);
  if (pagesMode == 2) {
    return cachePages;
  }
  if (devPages.length === 0) {
    return allPages;
  }
  if (!cacheDirExisted) {
    fs.mkdirSync(cacheDirPath);
  }
  fs.writeFileSync(cachePagesFilePath, JSON.stringify(devPages), { encoding: 'utf-8' });
  return devPages;
}

/**
 * @param {string[]} devPages
 * @param {import('execa').ExecaChildProcess<string>} cp
 */
function listenQuit(devPages, cp) {
  onQuit(input => {
    if (input === 'q') {
      quit(cp);
      return;
    }
    if (input === 'rs') {
      quit(cp);
      restart = true;
    }
  });
  cp.catch(() => {}).finally(() => {
    if (restart) {
      restart = false;
      console.clear();
      start(devPages);
      return;
    }
    console.log('See you :)');
    process.exit();
  });
}

/** @param {string[]} devPages */
function start(devPages) {
  const devConfigPath = path.resolve(__dirname, '../config/rspack.dev.js');
  const cp = execa('rspack', ['serve', '--config', devConfigPath], {
    stdio: 'inherit',
    cleanup: true,
    env: { DEV_PAGES: devPages.join(',') },
  });
  listenQuit(devPages, cp);
}

(async function main() {
  const allPages = getAllPages();
  const devPages = await selectDevPages(allPages);
  start(devPages);
})();
