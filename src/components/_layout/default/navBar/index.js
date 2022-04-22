import { AppBar, Toolbar, Typography, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HideOnScroll from '../../../_common/hideOnScroll';

import RightDrawer from './rightDrawer';
import NavigationDrawerButton from './navDrawerButton';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavTitle = styled(Typography)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const DRAWER_WIDTH = 250;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMdUp',
})(({ theme, open, isMdUp }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    isMdUp && {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: `-${DRAWER_WIDTH}px`,
      // transition: theme.transitions.create(['margin', 'width'], {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
    }),
}));

function NavBar({ open, toggleDrawer = () => {} }) {
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <>
      <HideOnScroll>
        <StyledAppBar
          open={open}
          isMdUp={isMdUp}
          position='fixed'
          color='background'
        >
          <Toolbar>
            {!open && (
              <>
                <NavigationDrawerButton toggleDrawer={toggleDrawer} />
                <NavTitle component={Link} to='/dashboard'>
                  Gradebook Admin
                </NavTitle>
              </>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <RightDrawer />
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll>
      <Offset />
    </>
  );
}

export default NavBar;
