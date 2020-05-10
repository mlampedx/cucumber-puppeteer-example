const HOME_SELECTORS = require('./home');

const SELECTORS = {
  ...HOME_SELECTORS,
};

const getSelector = (name) => SELECTORS[name];

module.exports = {
  getSelector,
};
