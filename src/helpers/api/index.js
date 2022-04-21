import axios from 'axios';
// import { TOKEN } from '../constants';
import reduxStore from '../../redux/store';

const baseURL = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : //dev
    'http://localhost:3001';

const version = 'v1';

export const apiURL = baseURL + `/api/${version}`;

const api = axios.create({
  baseURL: apiURL,
  // withCredentials: true, // Required for http-only cookie
});

const getAuthToken = () => {
  const reduxState = reduxStore.getState() || {};
  const user = reduxState?.user || {};
  const token = user?.token || 'empty_token';
  return token;
};

export const getAuthConfig = () => {
  const authToken = getAuthToken();
  const config = {
    headers: {
      Authorization: `bearer ${authToken}`,
    },
  };

  return config;
};

export default api;
