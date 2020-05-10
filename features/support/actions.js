const assert = require('assert');
const { URL } = require('url');

const scope = require('./scope');
const { getSelector } = require('../selectors');
const { getElemHandle } = require('./helpers');
const { DEFAULT_TIMEOUT } = require('./constants');

const { equal } = assert;

const openPage = async (url) => {
  scope.currentPage = await scope.context.newPage();
  scope.currentPage.setDefaultTimeout(DEFAULT_TIMEOUT);

  await scope.currentPage.goto(url);
  scope.origin = url.slice(0, url.indexOf('?'));
};

const setDevice = async (deviceDescriptor) => {
  if (deviceDescriptor) return scope.currentPage.emulate(deviceDescriptor);
  return Promise.resolve();
};

const setLocation = async (coords) => {
  if (coords) {
    await scope.context.overridePermissions(scope.origin, ['geolocation']);
    return scope.currentPage.setGeolocation(coords);
  }
  return Promise.resolve();
};

const setHeaders = async (headers) => {
  await scope.currentPage.setExtraHTTPHeaders(headers);
};

const clickOn = async (name) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elementHandle = await scope.currentPage.$(selector);
  await elementHandle.click();
};

const typeIn = async (name, query) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elementHandle = await scope.currentPage.$(selector);
  await elementHandle.type(query);
};

const pressKey = async (key) => {
  await scope.currentPage.keyboard.press(key);
};

const textEquals = async (name, text) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, (el) => el.innerText), text);
};

const textIncludes = async (name, text) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(
    await scope.currentPage.$eval(
      selector,
      (el, txt) => el.innerText.includes(txt),
      text
    ),
    true
  );
};

const hrefEquals = async (name, href) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, (el) => el.href), href);
};

const hrefIncludes = async (name, href) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(
    await scope.currentPage.$eval(
      selector,
      (el, h) => el.href.includes(h),
      href
    ),
    true
  );
};

const saveHref = async (name) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  scope.savedHref = await scope.currentPage.$eval(selector, (el) => el.href);
};

const srcEquals = async (name, src) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, (el) => el.src), src);
};

const seeElement = async (name) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, (el) => Boolean(el)), true);
};

const seeVisibleElement = async (name) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector, { visible: true });

  strictEqual(
    await scope.currentPage.$eval(selector, (el) => Boolean(el)),
    true
  );
};

const noElement = async (name) => {
  try {
    const elemHandle = await getElemHandle(name, { timeout: 3000 });
    strictEqual(elemHandle, null);
  } catch (error) {
    assert(true);
  }
};

const countElements = async (name, count) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elemLen = await scope.currentPage.$eval(selector, (el) => el.length);
  equal(elemLen, count);
};

const compareElementCount = async (name, operator, count) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elemLen = await scope.currentPage.$eval(selector, (el) => el.length);
  equal(elemLen, count);

  if (operator === 'more') {
    equal(elemLen > count, true);
  } else {
    equal(elemLen < count, true);
  }
};

const styleEquals = async (attr, name, val) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(
    await scope.currentPage.$eval(selector, (el, key) => el.style[key], attr),
    val
  );
};

const urlEquals = async () => {
  await scope.currentPage.waitForNavigation();
  equal(scope.currentPage.url(), scope.savedHref);
};

const pathEquals = async (path) => {
  await scope.currentPage.waitForNavigation();
  const currentPathname = new URL(scope.currentPage.url()).pathname;
  strictEqual(currentPathname, path);
};

const waitFor = async (secs) => {
  await scope.currentPage.waitFor(secs * 1000);
};

module.exports = {
  openPage,
  setDevice,
  setLocation,
  setHeaders,
  clickOn,
  typeIn,
  pressKey,
  textEquals,
  textIncludes,
  hrefEquals,
  hrefIncludes,
  saveHref,
  srcEquals,
  seeElement,
  seeVisibleElement,
  noElement,
  countElements,
  compareElementCount,
  styleEquals,
  urlEquals,
  pathEquals,
  waitFor,
};
