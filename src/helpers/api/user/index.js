import api, { getAuthConfig } from '..';
// import { getAuthConfig } from '..';
const baseURL = '/user';

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/register`, userInfo);
};

export const handleActivation = async (activation_code = '') => {
  const endpoint = '/activation';
  const data = {
    activation: activation_code,
  };
  return api.post(`${baseURL}${endpoint}`, data);
};

export const handleUpdateUserAccount = ({
  email,
  fullname,
  contact_email,
  contact_number,
  password,
  newPassword,
}) => {
  const config = getAuthConfig();
  return api.post(
    `${baseURL}/update`,
    { email, fullname, contact_email, contact_number, password, newPassword },
    config,
  );
};

export const getUserInfo = () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/info`, config);
};

const UserAPI = {
  handleSignUp,
  handleActivation,
};

export default UserAPI;
