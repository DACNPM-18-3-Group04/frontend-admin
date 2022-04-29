import api from '../../';
import { getAuthConfig } from '../../';

const baseURLProvince = '/admin/property/province';
const baseURLDistrict = '/admin/property/district';

export const fetchAll = async () => {
  const config = getAuthConfig();
  const endpoint = '/property/locations/provinces';
  return api.get(`${endpoint}`, config);
};

export const addDistrict = async (addInfo = {}) => {
  const config = getAuthConfig();
  return api.post(`${baseURLDistrict}`, addInfo, config);
};

export const updateDistrict = async (districtId = '', updateInfo = {}) => {
  const config = getAuthConfig();
  return api.put(`${baseURLDistrict}/${districtId}`, updateInfo, config);
};

export const removeDistrict = async (districtId = '') => {
  const config = getAuthConfig();
  return api.delete(`${baseURLDistrict}/${districtId}`, config);
};

export const addProvince = async (addInfo = {}) => {
  const config = getAuthConfig();
  return api.post(`${baseURLProvince}`, addInfo, config);
};

export const updateProvince = async (provinceId = '', updateInfo = {}) => {
  const config = getAuthConfig();
  return api.put(`${baseURLProvince}/${provinceId}`, updateInfo, config);
};

export const removeProvince = async (provinceId = '') => {
  const config = getAuthConfig();
  return api.delete(`${baseURLProvince}/${provinceId}`, config);
};

const AdminLocationAPI = {
  fetchAll,
  addDistrict,
  updateDistrict,
  removeDistrict,
  addProvince,
  updateProvince,
  removeProvince,
};

export default AdminLocationAPI;
