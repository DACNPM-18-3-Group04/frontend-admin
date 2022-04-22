import { IconButton, Avatar } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../redux/slices/user';

export default function OpenDrawerButton({ onClick }) {
  const user = useSelector(selectUser);

  if (user.isLogin) {
    const fullname = user.fullname;
    return (
      <IconButton onClick={onClick}>
        <Avatar alt={fullname} src={user.avatar}>
          {/* Fallback to first letter of user's fullname */}
          {fullname ? fullname.charAt(0) : null}
        </Avatar>
      </IconButton>
    );
  }

  return (
    <IconButton onClick={onClick}>
      <Avatar />
    </IconButton>
  );
}
