import api from '../../';
import { getAuthConfig } from '../../';

const baseURL = '/admin/users';

export const fetchAll = async (fetchAdmin = false) => {
  const config = getAuthConfig();
  let userType = fetchAdmin ? 'A' : 'C';

  return api.get(`${baseURL}/${userType}`, config);
}

export const fetchAllAdmin = async () => {
  return fetchAll(true);
}

export const fetchUserById = async (userId) => {
  const config = getAuthConfig();
  const endpoint = '/manage';
  return api.get(`${baseURL}${endpoint}/${userId}`, config);
}

export const editUser = async (id, newUserInfo) => {
  const config = getAuthConfig();
  const endpoint = '/update';
  return api.put(`${baseURL}${endpoint}/${id}`, newUserInfo, config);
}

export const resetPassword = async (id, newPasswordInfo) => {
  const config = getAuthConfig();
  const endpoint = '/manage/reset';
  const data = {
    user_id: id,
    ...newPasswordInfo,
  }

  return api.put(`${baseURL}${endpoint}`, data, config);
}

export const addUser = async (newUserInfo) => {
  const config = getAuthConfig();
  const endpoint = '/';
  return api.post(`${baseURL}${endpoint}`, newUserInfo, config);
}

const AdminUsersAPI = {
  fetchAll,
  fetchAllAdmin,
  fetchUserById,
  editUser,
  resetPassword,
  addUser,
}

export default AdminUsersAPI;
