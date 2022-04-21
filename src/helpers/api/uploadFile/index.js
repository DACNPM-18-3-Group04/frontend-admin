import api, { getAuthConfig } from '..';
const baseURL = '/upload';

// export const uploadFile = async (file) => {
//   const config = getAuthConfig();
//   return api.post(`${baseURL}/file`, file, config);
// };

export const uploadAvatar = async (formData) => {
  const config = getAuthConfig();
  const data = formData;

  return api.post(`${baseURL}/avatar`, data, config);
};

const UploadFileAPI = {
  // uploadFile,
  uploadAvatar,
};

export default UploadFileAPI;
