const { BeforeAll, AfterAll, After, setDefaultTimeout } = require('cucumber');
const puppeteer = require('puppeteer');

const scope = require('./support/scope');
const { DEFAULT_TIMEOUT, DEFAULT_VIEWPORT } = require('./support/constants');

const { HEADLESS = true, NODE_ENV } = process.env;

BeforeAll(async () => {
  setDefaultTimeout(DEFAULT_TIMEOUT);

  if (NODE_ENV === 'production') {
    scope.browser = await puppeteer.launch({
      defaultViewport: DEFAULT_VIEWPORT,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        // Required for Docker version of Puppeteer
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage',
      ],
    });
  } else {
    scope.browser = await puppeteer.launch({
      defaultViewport: DEFAULT_VIEWPORT,
      headless: HEADLESS,
    });
  }

  scope.context = await scope.browser.createIncognitoBrowserContext();
});

After(async () => {
  if (scope.browser && scope.currentPage) {
    await scope.currentPage.close();

    scope.currentPage = null;
    scope.origin = null;
    scope.savedHref = null;
  }
});

AfterAll(async () => {
  if (scope.context) await scope.context.close();
  if (scope.browser) await scope.browser.close();
});
