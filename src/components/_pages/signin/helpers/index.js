export const formatSignInResponse = (res) => {
  const data = res.data.data;
  return {
    id: data.user.id,
    fullname: data.user.fullname,
    email: data.user.email,
    avatar: data.user.avatar || '',
    contact_email: data.user.contact_email || '',
    contact_number: data.user.contact_number || '',
    token: data.access_token,
  };
};
