import api, { getAuthConfig } from '..';

import PropertyListAPI from './list';
const baseURL = '/property';

export const getPropertyInfo = ({ propertyID, userID }) => {
  return api.get(`${baseURL}/details?id=${propertyID}&userID=${userID}`);
};

export const getImgLinks = (id) => {
  // change to cdn link eventually
  return api.get(`${baseURL}/media?property_id=${id}`);
};

export const handleChangeWishedPost = (isFavorite) => {
  return api.put(`${baseURL}/fav`, { isFavorite }, getAuthConfig());
};

export const getWishedStateOfViewer = (propertyID, userID) => {
  return api.get(
    `${baseURL}/wish?prop_id=${propertyID}&user_id=${userID}`,
    getAuthConfig(),
  );
};

export const getContactInfo = (propertyID) => {
  return api.get(`${baseURL}/contact?prop_id=${propertyID}`);
};

export const handleRatingProperty = ({ propertyID, value }) => {
  return api.post(`${baseURL}/rating`, { propertyID, value }, getAuthConfig());
};

export const handleSendReview = (feedback) => {
  return api.post(`${baseURL}/review`, { feedback }, getAuthConfig());
};

export const createProperty = async (propertyInfo) => {
  return api.post(`${baseURL}/`, propertyInfo, getAuthConfig());
};

export const updateProperty = async (propertyInfo) => {
  return api.post(`${baseURL}/update`, propertyInfo, getAuthConfig());
};

const PropertyAPI = {
  getPropertyInfo,
  getImgLinks,
  handleChangeWishedPost,
  getContactInfo,
  handleRatingProperty,
  handleSendReview,
  createProperty,
  updateProperty,
  ...PropertyListAPI,
};

export default PropertyAPI;
