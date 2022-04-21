import { Box, Button, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import SignOutButton from '../../../../../_common/signOutButton';

const AlignEnd = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export default function SignedInUserControlList({toggleClose}) {
  return (
    <Stack direction='column' spacing={1}>
      <AlignEnd>
        <Button
          component={Link} to='/profile'
          variant='contained'
          startIcon={<AccountCircleIcon/>}
        >
          Tài khoản
        </Button>
      </AlignEnd>
      <AlignEnd>
        <SignOutButton onAfterClicked={toggleClose}/>
      </AlignEnd>
    </Stack>
  )
}
