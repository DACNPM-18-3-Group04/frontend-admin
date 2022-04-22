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
import { USER_ACCOUNT_STATUS, ACCOUNT_TYPE } from '../../../../helpers/constants';
import getLocalDatetimeISOString from '../../../../helpers/utils/getLocalDatetimeISOString';

import UserMoreMenu from '../../../_common/userTable/userMoreMenu';

export default function UserTableRow({
  row = {}, 
  selected = false, 
  handleClick = () => {},
  handleDelete = () => {}
}) {
  const { 
    id, 
    fullname: name, 
    status, 
    email: username, 
    avatar: avatarUrl, 
    account_type: accountType,
    createdAt: created_at,
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
          onChange={(event) => handleClick(event, id)}
        />
      </TableCell>
      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={name} src={avatarUrl}>
            {name ? name.charAt(0) : null}
          </Avatar>
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
      <TableCell align='left'>
        {ACCOUNT_TYPE[accountType]}
      </TableCell>
      <TableCell align='left'>{getLocalDatetimeISOString(created_at)}</TableCell>

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