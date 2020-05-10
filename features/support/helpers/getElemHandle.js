const scope = require('../scope');
const { getSelector } = require('../../selectors');

const getElemHandle = async (name, opts) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector, opts);
  const elem = await scope.currentPage.$(selector);

  return elem;
};

const getElemHandles = async (name) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elem = await scope.currentPage.$$(selector);

  return elem;
};

module.exports = {
  getElemHandle,
  getElemHandles,
};
