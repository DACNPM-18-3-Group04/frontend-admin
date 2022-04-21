import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useState } from 'react';

import InviteUserDialog from './dialog';

export default function InviteUserModal({classInfo, role}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const toggleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <IconButton onClick={toggleOpen}>
        <PersonAddIcon/>
      </IconButton>
      <InviteUserDialog 
        open={isOpen}
        toggleClose={toggleClose}
        classInfo={classInfo}
        role={role}
      />
    </>
  )
}
