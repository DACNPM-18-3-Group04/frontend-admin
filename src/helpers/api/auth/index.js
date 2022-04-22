import api, { getAuthConfig } from '..';

const baseURL = '/auth';

export const selfMakeSignIn = async (userInfo) => {
  const data = {
    ...userInfo,
    account_type: 'A', // Sign in as admin
  };
  return api.post(`${baseURL}/sign-in`, data);
};

export const signOut = async () => {
  const config = getAuthConfig();
  return api.post(`${baseURL}/sign-out`, {}, config);
};

const AuthAPI = {
  selfMakeSignIn,
  signOut,
};

export default AuthAPI;
