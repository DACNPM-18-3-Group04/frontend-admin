import {
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Chip,
} from '@mui/material';
import { USER_ACCOUNT_STATUS } from '../../../../helpers/constants';
import * as getLocalDatetimeString from '../../../../helpers/utils/getLocalDatetimeISOString';

import UserMoreMenu from '../../../_common/userTable/userMoreMenu';

export default function UserTableRow({
  row = {}, 
  selected = false, 
  handleClick = () => {},
  handleDelete = () => {}
}) {
  const { 
    id, 
    full_name, 
    user_code, 
    status, 
    username, 
    avatar: avatarUrl, 
    last_login_at: lastActive,
    created_at,
  } = row;
  
  let statusInfo = USER_ACCOUNT_STATUS[status];
  if (!statusInfo) {
    statusInfo = USER_ACCOUNT_STATUS['A'];
  } 

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role='checkbox'
      selected={selected}
      aria-checked={selected}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          checked={selected}
          onChange={(event) => handleClick(event, full_name)}
        />
      </TableCell>
      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={full_name} src={avatarUrl} />
          <Typography variant='subtitle2' noWrap>
            {full_name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align='left'>{username}</TableCell>
      <TableCell align='left'>{user_code}</TableCell>
      <TableCell align='left'>
        <Chip
          label={statusInfo.text}
          color={statusInfo.color}
        />
      </TableCell>
      <TableCell align='left'>{getLocalDatetimeString(lastActive)}</TableCell>
      <TableCell align='left'>{getLocalDatetimeString(created_at)}</TableCell>

      <TableCell align='right'>
        <UserMoreMenu 
          userId={id}
          isDisabled={statusInfo.isClassDisabled}
          onDeleteClick={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
}