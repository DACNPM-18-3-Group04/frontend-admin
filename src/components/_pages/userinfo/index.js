import { Card, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../../helpers/api/user';
import { handleFailure } from '../../../helpers/api/_helpers';
import { selectUser } from '../../../redux/slices/user';
import AccountInfo from './password';
// import Contacts from './contacts';
import Credentials from './credentials';
import Avatar from './avatar';

import { title } from './customStyle';

export default function UserInfoPage() {
  const { 
    fullname, avatar, 
    // contact_email, contact_number 
  } = useSelector(selectUser);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      getUserInfo()
        .then((res) => {
          setEmail(res.data.data.email);
        })
        .catch((err) => handleFailure(err));

    return () => (isMounted = false);
  });

  return (
    <Container maxWidth='lg'>
      <Card variant='outlined'>
        <Box sx={{ my: 2, mx: 4 }}>
          <Typography variant='h5' sx={title}>
            Chi tiết cá nhân
          </Typography>

          <Box sx={{ maxWidth: '80%', my: 2, mx: 'auto' }}>
            <Box sx={{ display: 'flex' }}>
              <Avatar fullname={fullname} avatar={avatar}></Avatar>
            </Box>

            <Box my={2}>
              <Credentials
                email={email}
                fullname={fullname}
                onEmailChange={(e) => setEmail(e)}
              />
            </Box>

            {/* <Box my={2}>
              <Contacts
                contact_email={contact_email}
                contact_number={contact_number}
                // account_type={}
              />
            </Box> */}

            <Box my={2}>
              <AccountInfo />
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
