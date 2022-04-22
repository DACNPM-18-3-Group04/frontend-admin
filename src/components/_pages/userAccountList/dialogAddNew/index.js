import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useState } from 'react';

import NewAdminAccountDialog from './dialog';

export default function NewAdminUserModal({onSuccess = () => {}}) {
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
      <NewAdminAccountDialog
        open={isOpen}
        onClose={toggleClose}
        onSuccess={onSuccess}
      />
    </>
  )
}
