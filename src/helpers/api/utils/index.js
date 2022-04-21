import api from '..';

export const getPropertyLocations = () => {
  const endpoint = '/property/locations/districts';

  return api.get(endpoint);
};

const UtilAPI = {
  getPropertyLocations,
};

export default UtilAPI;
