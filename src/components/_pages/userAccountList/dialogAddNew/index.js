import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useState } from 'react';

import AddDialog from './dialog';

export default function AddModal({onSuccess = () => {}}) {
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
      <AddDialog
        open={isOpen}
        onClose={toggleClose}
        onSuccess={onSuccess}
      />
    </>
  )
}
