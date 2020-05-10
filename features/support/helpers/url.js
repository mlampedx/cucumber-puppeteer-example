const { NODE_ENV } = process.env;

const getUrl = (domain, path = '') => {
  const URLS_BY_DOMAIN_AND_ENV = {
    test: {
      development: 'https://pptr.dev',
      production: 'https://pptr.dev'
    }
  };

  const domainUrl =
    URLS_BY_DOMAIN_AND_ENV[domain][NODE_ENV] ||
    URLS_BY_DOMAIN_AND_ENV.test.development;

  return path ? `${domainUrl}${path}` : domainUrl;
};

module.exports = {
  getUrl
};
