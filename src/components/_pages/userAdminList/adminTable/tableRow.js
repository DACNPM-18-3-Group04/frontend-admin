import {
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/slices/user';
import { USER_ACCOUNT_STATUS } from '../../../../helpers/constants';
import { getLocalDatetimeString } from '../../../../helpers/datetime';

import UserMoreMenu from '../../../_common/userTable/userMoreMenu';

export default function UserTableRow({
  row = {}, 
  selected = false, 
  handleClick = () => {},
  handleDelete = () => {}
}) {
  const { 
    id, 
    full_name: name, 
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

  // Disable if
  const loginInUser = useSelector(selectUser);
  const isRowLoginInUser = loginInUser.id === id;

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
          disabled={isRowLoginInUser}
          checked={selected}
          onChange={(event) => handleClick(event, name)}
        />
      </TableCell>
      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant='subtitle2' noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align='left'>{username}</TableCell>
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
          disable={isRowLoginInUser}
          isDisabled={statusInfo.isClassDisabled}
          onDeleteClick={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
}