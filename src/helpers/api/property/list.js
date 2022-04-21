import api from '..';

export const searchProperty = (limit = 5, page = 0, query = {}) => {
  const queryObj = {
    ...query,
    page,
    limit,
  };
  const keyValArr = [];

  for (const [key, value] of Object.entries(queryObj)) {
    if (value && value !== '') {
      keyValArr.push(`${key}=${value}`);
    }
  }

  const queryStr = keyValArr.join('&');
  const endpoint = `/property/search?${queryStr}`;
  return api.get(endpoint);
};

export const getRecommendProperties = () => {
  // Naive solution
  return searchProperty(5, 0, {});
};

export const getMyAd = (authorId, limit = 5, page = 0) => {
  const query = { authorId: authorId || null };

  // No pagination, for now
  return searchProperty(null, page, query);
};

const PropertyListAPI = {
  searchProperty,
  getRecommendProperties,
  getMyAd,
};

export default PropertyListAPI;
