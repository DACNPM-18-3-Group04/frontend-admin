import * as React from 'react';
import { Box, Divider, SwipeableDrawer } from '@mui/material';

import { default as DrawerHeader } from './header';
import OpenDrawerButton from './openDrawerButton';
import SettingsList from './settings';

export default function SettingDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const DRAWER_WIDTH = 250;

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <>
      <OpenDrawerButton onClick={toggleDrawer(true)} />
      <SwipeableDrawer
        anchor='right'
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{ width: DRAWER_WIDTH }}>
          <DrawerHeader toggleClose={toggleDrawer(false)} />
          <Divider />
          <SettingsList />
        </Box>
      </SwipeableDrawer>
    </>
  );
}
