const getLocation = locationName => {
  const LOCATION_COORDS_BY_NAME = {
    "Greater Los Angeles Area": {
      latitude: 34.0522,
      longitude: 118.2437
    }
  };

  return LOCATION_COORDS_BY_NAME[locationName] || null;
};

module.exports = {
  getLocation
};
