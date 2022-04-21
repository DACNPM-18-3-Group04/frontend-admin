import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import {
  Link,
  useLocation,
} from 'react-router-dom'

export default function ListItemLink(props) {
  const { text, icon, to, open, ...other } = props;
  const location = useLocation();

  let listItemProps = {}
  if (to) {
    listItemProps = {
      component: Link,
      to: to,
      selected: (location.pathname === to)
    }
  }

  return (
    <div>
      <ListItemButton {...listItemProps} {...other}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </ListItemButton>
    </div>
  );
}
