const { devices } = require('puppeteer');

const getDevice = device => {
  const DEVICE_DESCRIPTORS_BY_DEVICE = {
    desktop: null,
    tablet: devices.iPad,
    mobile: devices['iPhone X']
  };

  return (
    DEVICE_DESCRIPTORS_BY_DEVICE[device] || DEVICE_DESCRIPTORS_BY_DEVICE.desktop
  );
};

module.exports = {
  getDevice
};
