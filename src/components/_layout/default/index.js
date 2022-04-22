import NavBar from './navBar';
import Footer from '../_common/footer';

import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

import { useState, useEffect } from 'react';
import NavigationDrawer from './navDrawer';

const DRAWER_WIDTH = 250;

function DefaultLayout({ children }) {
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(isMdUp);
  }, [isMdUp]);

  const toggleOpen = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div>
      <NavigationDrawer open={navOpen} toggleDrawer={toggleOpen} />
      <Main open={navOpen} isMdUp={isMdUp}>
        <NavBar open={navOpen} toggleDrawer={toggleOpen} />
        <div style={{ minHeight: '80vh' }}>{children}</div>
        <Footer />
      </Main>
    </div>
  );
}

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMdUp',
})(({ theme, open, isMdUp }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  // transition: theme.transitions.create('margin', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  marginLeft: 0,
  ...(open &&
    isMdUp && {
      marginLeft: `${DRAWER_WIDTH}px`,
      // transition: theme.transitions.create('margin', {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
    }),
}));

export default DefaultLayout;
