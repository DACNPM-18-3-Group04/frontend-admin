import api, { getAuthConfig } from '..';
const baseURL = '/contact';

export const handleLeaveContactForThePropertyPoster = ({
  notes,
  propertyID,
}) => {
  return api.post(
    `${baseURL}/send`,
    {
      notes,
      propertyID,
    },
    getAuthConfig(),
  );
};

const ContactAPI = {
  handleLeaveContactForThePropertyPoster,
};

export default ContactAPI;
