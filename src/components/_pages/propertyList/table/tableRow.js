import {
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Chip,
} from '@mui/material';
import { PROPERTY_TYPE } from '../../../../helpers/constants/propertyTypes';
import { PROPERTY_STATUS } from '../../../../helpers/constants/propertyStatus';
import getLocalDatetimeISOString from '../../../../helpers/utils/getLocalDatetimeISOString';

import MoreMenu from './moreMenu';
import { getAddressDistrict } from './helpers';

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
    type: infoType,
    createdAt: created_at,
    address,
    district,
    user,
  } = row;
  const { id: uid, fullname: name, avatar: avatarUrl } = user;
  let statusInfo = PROPERTY_STATUS[status];
  if (!statusInfo) {
    statusInfo = PROPERTY_STATUS['A'];
  }
  let typeInfo = PROPERTY_TYPE[infoType];
  if (!typeInfo) {
    statusInfo = PROPERTY_TYPE['S'];
  }
  let addressDistrict = getAddressDistrict(district);

  console.log(row);
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
        <Typography component={'div'} variant='caption' width={'15rem'} noWrap>
          {address}, {addressDistrict}
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Chip label={statusInfo.text} color={statusInfo.color} />
      </TableCell>
      <TableCell align='left'>
        <Chip label={typeInfo.text} color={typeInfo.color} />
      </TableCell>
      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={name} src={avatarUrl}>
            {name ? name.charAt(0) : null}
          </Avatar>
          <Stack direction='column'>
            <Typography variant='caption' noWrap>
              UID: {uid}
            </Typography>
            <Typography variant='subtitle2' noWrap>
              {name}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align='left'>
        {getLocalDatetimeISOString(created_at)}
      </TableCell>

      <TableCell align='right'>
        <MoreMenu
          dataId={id}
          isDisabled={statusInfo.isDisabled}
          onDeleteClick={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
}
