import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { 
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

// ----------------------------------------------------------------------

export default function MoreMenu({
  userId = '',
  isDisabled = false,
  disable = false,
  onDeleteClick = () => {},
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const editLink = `/user/${userId}`;

  return (
    <>
      <Tooltip title={disable ? 'Tài khoản đăng nhập hiện tại, không chỉnh sửa được' : 'Thêm'}>
        <span>
          <IconButton ref={ref} disabled={disable} onClick={() => setIsOpen(true)}>
            <MoreVertIcon/>
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {isDisabled ? 
          <MenuItem sx={{ color: 'text.secondary' }} onClick={onDeleteClick}>
            <ListItemIcon>
              <RestoreFromTrashIcon/>
            </ListItemIcon>
            <ListItemText primary='Hủy vô hiệu' primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
          :
          <MenuItem sx={{ color: 'text.secondary' }} onClick={onDeleteClick}>
            <ListItemIcon>
              <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary='Vô hiệu' primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        }

        <MenuItem component={RouterLink} to={editLink} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <EditIcon/>
          </ListItemIcon>
          <ListItemText primary='Chỉnh sửa' primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
