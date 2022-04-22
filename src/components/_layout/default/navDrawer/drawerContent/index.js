import {
  styled,
  IconButton,
  Divider,
  List,
  Typography,
  useMediaQuery,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import HomeIcon from '@mui/icons-material/Home';
import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';

// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { Link } from 'react-router-dom';

import ListItemLink from './listItemLink';

const navLinks = [
  // {
  //   text: 'Trang chủ',
  //   icon: <HomeIcon/>,
  //   path: '/dashboard',
  //   childPaths: []
  // },
  {
    text: 'Quản lý BĐS',
    icon: <HouseIcon />,
    path: '/p',
    childPaths: [],
  },
  {
    text: 'Quản lý tài khoản',
    icon: <PersonIcon />,
    path: '/users',
    childPaths: [],
    // childPaths: [
    //   {
    //     text: 'Người dùng',
    //     icon: <ManageAccountsIcon/>,
    //     path: '/users',
    //   },
    //   {
    //     text: 'Admin',
    //     icon: <AdminPanelSettingsIcon/>,
    //     path: '/users/admin',
    //   }
    // ]
  },
];

export default function DrawerContent({ toggleDrawer = () => {} }) {
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const onLinkClickHandle = () => {
    // Close the drawer on small screen click
    if (!isMdUp) {
      toggleDrawer();
    }
  };

  return (
    <div>
      <DrawerHeader>
        <NavTitle component={Link} to='/dashboard'>
          Propbook Admin
        </NavTitle>
        {!isMdUp && (
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {navLinks.map((navLink, index) => {
          const renderChildLinks = () => {
            if (navLink.childPaths.length > 0) {
              return (
                <List disablePadding>
                  {navLink.childPaths.map((childLink, index) => (
                    <ListItemLink
                      sx={{ pl: 4 }}
                      key={index}
                      to={childLink.path}
                      text={childLink.text}
                      icon={childLink.icon}
                      onClick={onLinkClickHandle}
                    />
                  ))}
                </List>
              );
            }
          };
          return (
            <li key={index}>
              <ListItemLink
                to={navLink.path}
                text={navLink.text}
                icon={navLink.icon}
                onClick={onLinkClickHandle}
              />
              {renderChildLinks()}
            </li>
          );
        })}
      </List>
    </div>
  );
}

const NavTitle = styled(Typography)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));
