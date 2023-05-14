const execa = require('execa');
const fs = require('fs');
const inquirer = require('inquirer');
const InquirerSearchCheckbox = require('inquirer-search-checkbox');
const path = require('path');
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
    console.log('The dev pages you selected last time:');
    const pageList = cachePages.reduce((rst, page, index) => `${rst ? `${rst}\n` : rst}${index + 1}) ${page}`, '');
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

/** @param {import('execa').ExecaChildProcess<string>} cp */
function quit(cp) {
  if (process.platform === 'win32') {
    execa('taskkill', ['/f', '/t', '/pid', cp.pid], { stdin: 'ignore' });
    return;
  }
  cp.kill('SIGTERM');
}

/** @param {import('execa').ExecaChildProcess<string>} cp */
function listenQuit(cp) {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', data => {
    const input = data.toString().trim();
    if (input === 'q') {
      quit(cp);
      return;
    }
    if (input === 'rs') {
      quit(cp);
      restart = true;
    }
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
  cp.catch(() => {}).finally(() => {
    if (restart) {
      restart = false;
      start(devPages);
      return;
    }
    console.log('See you :)');
    process.exit();
  });
  listenQuit(cp);
}

(async function main() {
  const allPages = getAllPages();
  const devPages = await selectDevPages(allPages);
  start(devPages);
})();
