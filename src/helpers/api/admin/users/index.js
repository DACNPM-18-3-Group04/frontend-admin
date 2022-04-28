import api from '../../';
import { getAuthConfig } from '../../';

const baseURL = '/admin/user';

export const fetchAll = async () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}`, config);
};

export const fetchUserById = async (userId) => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/${userId}`, config);
};

export const editUser = async (userId, newUserInfo) => {
  const config = getAuthConfig();
  return api.put(`${baseURL}/${userId}`, newUserInfo, config);
};

export const resetPassword = async (userId, newPasswordInfo) => {
  const config = getAuthConfig();
  const data = {
    newPassword: newPasswordInfo.password,
  };

  return api.put(`${baseURL}/${userId}`, data, config);
};

export const addUser = async (newUserInfo) => {
  const config = getAuthConfig();
  const endpoint = '/';
  return api.post(`${baseURL}${endpoint}`, newUserInfo, config);
};

const AdminUsersAPI = {
  fetchAll,
  fetchUserById,
  editUser,
  resetPassword,
  addUser,
};

export default AdminUsersAPI;
