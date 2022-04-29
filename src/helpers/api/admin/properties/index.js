import api from '../../';
import { getAuthConfig } from '../../';

const baseURL = '/admin/property';

export const fetchAll = async () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}`, config);
};

export const fetchById = async (propertyId) => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/${propertyId}`, config);
};

export const edit = async (propertyId, newPropertyInfo) => {
  const config = getAuthConfig();
  return api.put(`${baseURL}/${propertyId}`, newPropertyInfo, config);
};

const AdminPropertiesAPI = {
  fetchAll,
  fetchById,
  edit,
};

export default AdminPropertiesAPI;
