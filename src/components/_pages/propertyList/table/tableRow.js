import {
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Chip,
} from '@mui/material';
import {
  USER_ACCOUNT_STATUS,
  ACCOUNT_TYPE,
} from '../../../../helpers/constants';
import getLocalDatetimeISOString from '../../../../helpers/utils/getLocalDatetimeISOString';

import MoreMenu from './moreMenu';

export default function ListTableRow({
  row = {},
  selected = false,
  handleClick = () => {},
  handleDelete = () => {},
}) {
  const {
    id,
    title,
    status,
    account_type: accountType,
    createdAt: created_at,
    user,
  } = row;
  const { fullname: name, avatar: avatarUrl } = user;
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
          onChange={(event) => handleClick(event, id)}
        />
      </TableCell>
      <TableCell align='left'>
        <Typography variant='subtitle2' width={'14rem'} noWrap>
          <b>{title}</b>
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Chip label={statusInfo.text} color={statusInfo.color} />
      </TableCell>
      <TableCell align='left'>{ACCOUNT_TYPE[accountType]}</TableCell>
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
      <TableCell align='left'>
        {getLocalDatetimeISOString(created_at)}
      </TableCell>

      <TableCell align='right'>
        <MoreMenu
          dataId={id}
          isDisabled={statusInfo.isClassDisabled}
          onDeleteClick={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
}
