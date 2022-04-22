import api from '../../';
import { getAuthConfig } from '../../';

const baseURL = '/admin/user';

export const fetchAll = async () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}`, config);
}

export const fetchUserById = async (userId) => {
  const config = getAuthConfig();
  const endpoint = '/manage';
  return api.get(`${baseURL}${endpoint}/${userId}`, config);
}

export const editUser = async (id, newUserInfo) => {
  const config = getAuthConfig();
  const endpoint = '/update';
  return api.post(`${baseURL}${endpoint}/${id}`, newUserInfo, config);
}

export const resetPassword = async (id, newPasswordInfo) => {
  const config = getAuthConfig();
  const endpoint = '/update';
  const data = {
    user_id: id,
    ...newPasswordInfo,
  }

  return api.post(`${baseURL}${endpoint}`, data, config);
}

export const addUser = async (newUserInfo) => {
  const config = getAuthConfig();
  const endpoint = '/';
  return api.post(`${baseURL}${endpoint}`, newUserInfo, config);
}

const AdminUsersAPI = {
  fetchAll,
  fetchUserById,
  editUser,
  resetPassword,
  addUser,
}

export default AdminUsersAPI;
