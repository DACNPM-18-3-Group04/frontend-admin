export const ACCEPT_IMAGE_MIMETYPES = Object.freeze([
  'image/jpeg',
  'image/png',
]);

export const USER_ACCOUNT_STATUS = Object.freeze({
  'A': {
    color: 'success',
    text: 'Đã kích hoạt',
    isClassDisabled: false,
  },
  'I': {
    color: 'warning',
    text: 'Chưa kích hoạt',
    isClassDisabled: false,
  },
  'D': {
    color: 'error',
    text: 'Bị Lock',
    isClassDisabled: true,
  },
});

export const ACCOUNT_TYPE = Object.freeze({
  ADMIN: 'A',
  USER: 'C',
  'A': 'Admin',
  'C': 'User',
});
