import { IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

export default function OpenDrawerButton({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
}
