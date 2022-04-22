import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signOut as signOutReducer } from '../../../redux/slices/user';
import { signOut as signOutAPI } from '../../../helpers/api/auth';

export default function SignOutButton({ onAfterClicked = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    signOutAPI().finally(() => {
      dispatch(signOutReducer());
      history.push('/signin');
      onAfterClicked();
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant='outlined'
      startIcon={<LogoutIcon />}
    >
      Đăng xuất
    </Button>
  );
}
