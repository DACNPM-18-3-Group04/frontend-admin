import { useRef, useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------

export default function MoreMenu({
  isDisabled = false,
  onExecuteReport = () => {},
  onSkipReport = () => {},
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip title={isDisabled ? 'Không chỉnh sửa được' : 'Thêm'}>
        <span>
          <IconButton
            ref={ref}
            disabled={isDisabled}
            onClick={() => setIsOpen(true)}
          >
            <MoreVertIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={ref.current}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={onExecuteReport}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText
            primary='Vô hiệu'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={onSkipReport}>
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText
            primary='Bỏ qua'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
