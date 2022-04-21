import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import LoginIcon from '@mui/icons-material/Login';

const AlignEnd = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

export default function SignedOutUserControlList({toggleClose}) {
  return (
    <AlignEnd>
      <Button 
        component={Link} to='/signin'
        variant='outlined'
        startIcon={<LoginIcon/>}
      >
        Đăng nhập
      </Button>
    </AlignEnd>
  );
}
