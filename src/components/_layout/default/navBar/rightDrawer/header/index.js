import { Box, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../redux/slices/user';

import SignedOutUserControlList from './signedOutControlList';
import SignedInUserControlList from './signedInControlList';

const SpaceBetween = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'space-between',
}));

const AlignCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

export default function Header({ toggleClose }) {
  const user = useSelector(selectUser);
  let avatar = null;
  let fullname = null;

  if (user.isLogin) {
    fullname = user.fullname;
    avatar = user.avatar;
  }

  return (
    <>
      <SpaceBetween>
        <IconButton onClick={toggleClose}>
          <ChevronRightIcon />
        </IconButton>
        <AlignCenter>
          {/* 1 line , clip overflow text */}
          <Box
            mr={1}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '120px',
              textAlign: 'right',
            }}
          >
            {fullname}
          </Box>
          <Avatar alt={fullname} src={avatar}>
            {/* Fallback to first letter of user's username */}
            {fullname ? fullname.charAt(0) : null}
          </Avatar>
        </AlignCenter>
      </SpaceBetween>
      <Box sx={{ padding: 1 }}>
        {user.isLogin ? (
          <SignedInUserControlList toggleClose={toggleClose} />
        ) : (
          <SignedOutUserControlList toggleClose={toggleClose} />
        )}
      </Box>
    </>
  );
}
